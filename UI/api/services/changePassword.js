//! ----- Function Forgot Password -----
const incorectEmailAddress = document.getElementById('incorect-email-address');
const hideEmailInput = document.getElementById('hide-email-input');
const newPasswordDiv = document.getElementById('new-password-div');

const passwordInfoAlert = document.getElementById('password-info-alert');

const newPassword = document.getElementById('new-password');
const newPasswordConfirm = document.getElementById('new-password-confirm');

const resetButtonBtn = document.getElementById('reset-password');
const confirmNewPasswordBtn = document.getElementById('confirm-new-password');

const passwordValidationAlert = document.getElementById('password-validation-alert');
const passwordChangeAlert = document.getElementById('password-changed-alert');
const passwordDoesntMatch = document.getElementById('password-doesnt-match');

const forgotPassAllert = document.getElementById('forgot-pass-successfully-created-alert');
const forgotPassAlertText = document.getElementById('forgot-pass-successfully-created-alert-text');

const validationAllert = document.getElementById('validation-alert');
const validationAlertText = document.getElementById('validation-alert-text');


// //? Example starter JavaScript for disabling form submissions if there are invalid fields
// //* function isFormEmpty

function clearInputField() {
    newPassword.value = '';
    newPasswordConfirm.value = '';
}

async function passwordResetUserExists(event){
    const email = document.getElementById('email').value;
    try{
		event.preventDefault();
        const response = await fetch(`http://localhost:5116/api/User/ForgotPassword?email=${encodeURIComponent(email)}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

		if (!response.ok) {
            
			const errorData = await response.json();
            console.error('Error:', errorData);
			validationAllert.style.display = "block";
			if(errorData.errors){
				validationAlertText.innerText =  errorData.errors.join('\n');
				return;
			}
			validationAlertText.innerText = errorData.errorMessage;
			return;
        }else{
            const msg = await response.json();
            forgotPassAllert.style.display = "block";
            forgotPassAlertText.innerText = msg;
			return false;
		}
    }catch(error) {
        forgotPassAllert.style.display = "none";
        validationAllert.style.display = "block";
        validationAlertText.innerText = "Network Error!"
    }

    // const data = localStorage.getItem("usersData");
	// const users = data ? JSON.parse(data) : [];

    // const userExists = users.find(u => u.email === email)
    
    // if(userExists){
    //     event.preventDefault();
    //     hideEmailInput.style.display = 'none';
    //     newPasswordDiv.style.display = 'block';
    //     incorectEmailAddress.style.display = 'none';
    //     return false;
    // } else {
    //     event.preventDefault();
    //     incorectEmailAddress.style.display = 'block';
    //     return false;
    // }

}
if(resetButtonBtn !== null){
    resetButtonBtn.addEventListener('click', passwordResetUserExists, false);
}



function validatePassword (password, event) {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if(!password.match(passwordRegex)) {
        event.preventDefault();
		passwordValidationAlert.style.display = 'block';
	  	return false;
	} else {
		return true;
	}
}

// function changeNewPassword(email, event) {
//     const newPassword = document.getElementById('new-password').value;
//     const newPasswordConfirm = document.getElementById('new-password-confirm').value;

//     const data = localStorage.getItem("usersData");
//     const users = data ? JSON.parse(data) : [];
//     const selectedUser = users.find(u => u.email === email);
    
//     const passwordChangeAlert = document.getElementById('password-changed-alert');
//     const samePassword = document.getElementById('password-same');
//     const passwordDoesntMatchAlert = document.getElementById('password-doesnt-match');

//     if (validatePassword(newPassword, event) && newPassword !== selectedUser.password && newPasswordConfirm !== selectedUser.password && newPassword === newPasswordConfirm && selectedUser) {
        
//         selectedUser.password = newPassword;
        
//         localStorage.setItem("usersData", JSON.stringify(users));
//         clearInputField();
//         //event.preventDefault();
//         passwordChangeAlert.style.display = 'block';
//         samePassword.style.display = 'none';
//         passwordDoesntMatchAlert.style.display = 'none';
        
//         return true;
//     } 
//     else if(newPassword != newPasswordConfirm){
//         // event.preventDefault();
//         passwordDoesntMatchAlert.style.display = 'block';
//         passwordChangeAlert.style.display = 'none';
//         samePassword.style.display = 'none';
//         return false;
//     } 
//     else if (newPassword === selectedUser.password) {
//         samePassword.style.display = 'block';
//         passwordChangeAlert.style.display = 'none';
//         passwordDoesntMatchAlert.style.display = 'none';
//         return false;
//     }
    
// }

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
}

async function handlePasswordChange(event) {
    event.preventDefault();

    const token = getParameterByName('token');
    const email = getParameterByName('email');
    const newPassword = document.getElementById('new-password').value;
    const newPasswordConfirm = document.getElementById('new-password-confirm').value;

    const forgotPassword = {
		email: email,
		password: newPassword,
		confirmPassword: newPasswordConfirm,
		token: token,
	  };

      try{
		event.preventDefault();
		const response = await fetch("http://localhost:5116/api/User/ResetPassword", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(forgotPassword)
        });

		if (!response.ok) {
            
			const errorData = await response.json();
            console.error('Error:', errorData);
			validationAllert.style.display = "block";
			if(errorData.errors){
                if(errorData.errors.ConfirmPassword){
                    validationAlertText.innerText =  errorData.errors.ConfirmPassword.join('\n');
                }
                else{
                    validationAlertText.innerText =  errorData.errors.join('\n');
                }
				
				return;
			}
			validationAlertText.innerText = errorData.errorMessage;
			return;
        }else{
			event.preventDefault();
			clearInputField();
            validationAllert.style.display = "none";
            const msg = await response.json();
            forgotPassAllert.style.display = "block";
            forgotPassAlertText.innerText = msg;
			return false;
		}
    }catch(error) {
        changeUserAllert.style.display = "none";
        validationAllert.style.display = "block";
        validationAlertText.innerText = "Network Error!"
    }

  
    //const email = document.getElementById('email').value;
    //changeNewPassword(email, event);
}
if(confirmNewPasswordBtn !== null){
    confirmNewPasswordBtn.addEventListener('click', handlePasswordChange, false);

    //? Toggle Password - Change Password
(function() {
    'use strict'
    const eyeToggleNewPassword = document.querySelector('.js-password-show-toggle');
    const eyeToggleConfirmNewPassword = document.querySelector('.js-password-show-toggle-1');
  
    eyeToggleNewPassword.addEventListener('click', (e) => {
        e.preventDefault();
  
        if ( eyeToggleNewPassword.classList.contains('active') ) {
            newPassword.setAttribute('type', 'password');
            eyeToggleNewPassword.classList.remove('active');
        } else {
            newPassword.setAttribute('type', 'text');
            eyeToggleNewPassword.classList.add('active');
        }
    })
    eyeToggleConfirmNewPassword.addEventListener('click', (e) => {
        e.preventDefault();
  
        if ( eyeToggleConfirmNewPassword.classList.contains('active') ) {
            newPasswordConfirm.setAttribute('type', 'password');
            eyeToggleConfirmNewPassword.classList.remove('active');
        } else {
            newPasswordConfirm.setAttribute('type', 'text');
            eyeToggleConfirmNewPassword.classList.add('active');
        }
    })
})();
}

//? Event Listener to password input field with callback function
function showPasswordInfoField() {
    if(passwordValidationAlert.style.display = 'none'){
        passwordInfoAlert.style.display = "block";
    } 
}
document.addEventListener('click', function(event) {
    if (event.target !== newPassword && event.target !== passwordInfoAlert && event.target !== passwordInfoAlertText) {
        passwordInfoAlert.style.display = 'none';
    }
});
if(newPassword !== null){
    newPassword.addEventListener("focus", showPasswordInfoField);
}
