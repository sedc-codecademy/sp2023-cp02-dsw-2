//! ----- Login Function -----
//* Rererences to HTML element *//
const incorectDangerAllert = document.getElementById('incorectDangerAlert');
const incorectDangerAlertText = document.getElementById('incorectDangerAlertText');

const loginPassword = document.getElementById('login-password');


const passwordInfoAlert = document.getElementById('passwordInfoAlert');
const passwordInfoAlertText = document.getElementById('passwordInfoText');

const loginBtn = document.getElementById('login');


//? Example starter JavaScript for disabling form submissions if there are invalid fields
function isFormEmpty() {
    const loginEmail =  document.getElementById('login-email').value.trim();
    const loginPassword = document.getElementById('login-password').value.trim();

    return loginEmail === "" && loginPassword === "";
}
function triggerFormValidation(event) {
	'use strict';
	let forms = document.querySelectorAll('.needs-validation');
	Array.prototype.slice.call(forms).forEach(function (form) {
		if (!form.checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.classList.add('was-validated');
	});
}


function loginAccount(event){
	const loginEmail = document.getElementById('login-email').value;
	const loginPassword = document.getElementById('login-password').value;

    if(isFormEmpty()){
        event.preventDefault();
        triggerFormValidation(event);
        return;
    }

	const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];

	const userExists = users.find(u => u.email === loginEmail && u.password === loginPassword);

  	if (userExists) {
        event.preventDefault();
        window.location.href = "/pages/home_page/home_page_index.html";
        const loggedUser = localStorage.getItem("loggedUser")
        const logUser = loggedUser ? JSON.parse(loggedUser) : [];
        logUser.push(userExists);
        localStorage.setItem('loggedUser', JSON.stringify(logUser));
        return false;
  	} else {
        event.preventDefault();
    	incorectDangerAllert.style.display = "block";
        return false;
 	}
}
loginBtn.addEventListener('click', loginAccount);


//? Toggle Password - LOGIN
(function() {
    'use strict'

    const eyeToggle = document.querySelector('.js-password-show-toggle');

    eyeToggle.addEventListener('click', (e) => {
        e.preventDefault();

        if ( eyeToggle.classList.contains('active') ) {
            loginPassword.setAttribute('type', 'password');
            eyeToggle.classList.remove('active');
        } else {
            loginPassword.setAttribute('type', 'text');
            eyeToggle.classList.add('active');
        }
    })
})();


//function editProfile

//function editAccount
