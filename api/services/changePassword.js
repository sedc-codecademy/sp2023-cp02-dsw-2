//! ----- Function Forgot Password -----
const incorectEmailAddress = document.getElementById('incorect-email-address');
const hideEmailInput = document.getElementById('hide-email-input');
const newPasswordDiv = document.getElementById('new-password-div');

const passwordInfoAlert = document.getElementById('password-info-alert');

const newPassword = document.getElementById('new-password');
const newPasswordConfirm = document.getElementById('new-password-confirm');

const resetButtonBtn = document.getElementById('reset-password');
const confirmNewPasswordBtn = document.getElementById('confirm-new-password');

const passwordChangeAlert = document.getElementById('password-changed-alert');
const passwordDoesntMatch = document.getElementById('password-doesnt-match');


function clearInputField() {
    newPassword.value = '';
    newPasswordConfirm.value = '';
}


function passwordResetUserExists(event){
    const email = document.getElementById('email').value;

    const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];

    const userExists = users.find(u => u.email === email)
    console.log(userExists)
    if(userExists){
        event.preventDefault();
        hideEmailInput.style.display = 'none';
        newPasswordDiv.style.display = 'block';
        incorectEmailAddress.style.display = 'none';
        return false;
    } else {
        event.preventDefault();
        incorectEmailAddress.style.display = 'block';
        return false;
    }

}
resetButtonBtn.addEventListener('click', passwordResetUserExists, false);


function changeNewPassword(email) {
    const newPassword = document.getElementById('new-password').value;
    const newPasswordConfirm = document.getElementById('new-password-confirm').value;
    
    const data = localStorage.getItem("usersData");
    const users = data ? JSON.parse(data) : [];
    const selectedUser = users.find(u => u.email === email);
    

    const passwordChangeAlert = document.getElementById('password-changed-alert');
    const samePassword = document.getElementById('password-same');
    const passwordDoesntMatchAlert = document.getElementById('password-doesnt-match');

    if (newPassword !== selectedUser.password && newPasswordConfirm !== selectedUser.password && newPassword === newPasswordConfirm && selectedUser) {
        
        selectedUser.password = newPassword;
      
        localStorage.setItem("usersData", JSON.stringify(users));
        clearInputField();
        //event.preventDefault();
        passwordChangeAlert.style.display = 'block';
        samePassword.style.display = 'none';
        passwordDoesntMatchAlert.style.display = 'none';
        
        return true;
    } 
    else if(newPassword != newPasswordConfirm){
        // event.preventDefault();
        passwordDoesntMatchAlert.style.display = 'block';
        passwordChangeAlert.style.display = 'none';
        samePassword.style.display = 'none';
        return false;
    } 
    else if (newPassword === selectedUser.password) {
        samePassword.style.display = 'block';
        passwordChangeAlert.style.display = 'none';
        passwordDoesntMatchAlert.style.display = 'none';
        return false;
    }
    
}


function handlePasswordChange(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const success = changeNewPassword(email);
  
    // if (success) {
    //     // Password changed successfully
    //     passwordChangeAlert.style.display = 'block';
    // } 
}
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


//? Event Listener to password input field with callback function
function showPasswordInfoField() {
    passwordInfoAlert.style.display = "block";
}
document.addEventListener('click', function(event) {
    if (event.target !== newPassword && event.target !== passwordInfoAlert && event.target !== passwordInfoAlertText) {
        passwordInfoAlert.style.display = 'none';
    }
});
newPassword.addEventListener("focus", showPasswordInfoField);