//! ======= My Account =======

myProfile = document.getElementById('my-profile-button');
myAccount = document.getElementById('my-account-button');
myAccount.style.backgroundColor = "#DD592D";
myAccount.style.color = "white";

myProfile.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = "/pages/settings/settings-my-profile.html";
    myProfile.style.backgroundColor = "#DD592D"
})
myAccount.addEventListener('click', function(){
    window.location.href = "/pages/settings/settings-my-account.html";
    myAccount.style.backgroundColor = "#DD592D"
});
//! ----- Email Form -----
const currentEmail = document.getElementById('current-email');
const changeEmail = document.getElementById('change-email');

const emailChangeForm = document.getElementById('email-change-form');

const incorectEmailAlert = document.getElementById('incorect-email-alert');
const emailSuccessfullyChanged = document.getElementById('email-successfully-changes');

const newEmail = document.getElementById('new-email');
const cancelEmailChangeBtn = document.getElementById('cancel-email-change-btn');
const saveEmailChangeBtn = document.getElementById('save-email-change-btn');

//* Display logged user email address
function handleLoggedUser(){
    const data = localStorage.getItem("loggedUser");
	const loggedUser = data ? JSON.parse(data) : [];
    let loggedEmail = loggedUser[0].email;
    
    currentEmail.innerHTML = loggedEmail;
};
handleLoggedUser();

//* Show email-change-form
function showEmailChangeForm() {
    changeEmail.style.display = 'none';
    emailChangeForm.style.display = 'block';
}
changeEmail.addEventListener('click', showEmailChangeForm);

//* Hide email-change-form
function hideEmailChangeForm() {
    changeEmail.style.display = 'block';
    emailChangeForm.style.display = 'none';
}
cancelEmailChangeBtn.addEventListener('click', hideEmailChangeForm);

//* ----- Email Validation -----
function validateEmail(newEmail, event) {
	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
	if (!emailRegex.test(newEmail, event)) {
		event.preventDefault();
        incorectEmailAlert.style.display = 'block';
		return false;
	}
    else{
        return true;
    }
}
function getLoggedUser() {
    let data = localStorage.getItem("loggedUser");
    data = JSON.parse(data)[0];
    return data;
}

//* New email validate and change
function newEmailChange(event) {
    const loggedUser = getLoggedUser();
    ///----
    const newEmail = document.getElementById('new-email').value;
    const data = localStorage.getItem("loggedUser");
	const user = data ? JSON.parse(data) : [];

    if(validateEmail(newEmail, event)) {
        event.preventDefault();
        user[0].email = newEmail;
        emailSuccessfullyChanged.style.display = 'block';
        //* update loggedUser
        localStorage.removeItem('loggedUser');
        localStorage.setItem('loggedUser', JSON.stringify(user));
        currentEmail.innerHTML = newEmail;
        //* update usersData
        const usersData = localStorage.getItem("usersData");
        const parsedUsers = JSON.parse(usersData);
        parsedUsers.splice(parsedUsers.findIndex(v => v.email === loggedUser.email), 1);
        parsedUsers.push(user[0]);
        localStorage.setItem('usersData', JSON.stringify(parsedUsers));
      
        return;
    }
}
saveEmailChangeBtn.addEventListener('click', newEmailChange, false);



//! ----- Password Form -----
const changePassword = document.getElementById('change-password');
const passwordChangeForm = document.getElementById('password-change-form');

const passwordSuccessfullyChanged = document.getElementById('password-successfully-changes');

const newPassword = document.getElementById('new-password');

const passwordInfoAlert = document.getElementById('password-info-alert');
const passwordInfoAlertText = document.getElementById('password-info-alert-text');
const passwordValidationAlert = document.getElementById('password-validation-alert');

const confirmNewPassword = document.getElementById('new-password-confirm');

const cancelPasswordChangesBtn = document.getElementById('cancel-password-changes-btn');
const savePasswordChangesBtn = document.getElementById('save-password-changes-btn');


//* Clear the old password after the page loads
setTimeout(
    function() { $(':password').val(''); },
    1000
);

//* Show password-change-form
function showPasswordChangeForm() {
    passwordChangeForm.style.display = 'block';
    changePassword.style.display = 'none';
}
changePassword.addEventListener('click', showPasswordChangeForm)
//* Hide password-change-form
function hideEmailChangeForm() {
    passwordChangeForm.style.display = 'none';
    changePassword.style.display = 'blocl';
}


//* Password Input Field Alert
function showPasswordInfoField() {
	if (passwordValidationAlert.style.display = 'none'){
		passwordInfoAlert.style.display = "block";
	}
}
newPassword.addEventListener("focus", showPasswordInfoField);

document.addEventListener('click', function(event) {
    if (event.target !== newPassword && event.target !== passwordInfoAlert && event.target !== passwordInfoAlertText) {
		passwordInfoAlert.style.display = 'none';
    }
});

//* ----- Password Validation -----
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


//* New password validate and change

function newPasswordChange(event) {
    const loggedUser = getLoggedUser();
    
    const newPassword = document.getElementById('new-password').value;
    const newPasswordConfirm = document.getElementById('new-password-confirm').value;
    
    const data = localStorage.getItem("loggedUser");
	const user = data ? JSON.parse(data) : [];

    if(validatePassword(newPassword, event) && newPassword === newPasswordConfirm) {
        event.preventDefault();
        user[0].password = newPassword;
        passwordSuccessfullyChanged.style.display = 'block';

        //* update loggedUser
        localStorage.removeItem('loggedUser');
        localStorage.setItem('loggedUser', JSON.stringify(user));

        //* update usersData
        let usersData = localStorage.getItem("usersData");
        let parsedUsers = JSON.parse(usersData);
        parsedUsers.splice(parsedUsers.findIndex(v => v.email === loggedUser.email), 1);
        parsedUsers.push(user[0]);
        localStorage.setItem('usersData', JSON.stringify(parsedUsers));

        return;
    }
}
savePasswordChangesBtn.addEventListener('click', newPasswordChange, false);

// //? Toggle Password - LOGIN
// (function() {
//     'use strict'

//     const eyeToggle = document.querySelector('.js-password-show-toggle');

//     eyeToggle.addEventListener('click', (e) => {
//         e.preventDefault();

//         if ( eyeToggle.classList.contains('active') ) {
//             loginPassword.setAttribute('type', 'password');
//             eyeToggle.classList.remove('active');
//         } else {
//             loginPassword.setAttribute('type', 'text');
//             eyeToggle.classList.add('active');
//         }
//     })
// })()