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

async function loginAccount(event) {
    
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;

    if (isFormEmpty()) {
        event.preventDefault();
        triggerFormValidation(event);
        return;
    }

    try {
        event.preventDefault();
        const response = await fetch("http://localhost:5116/api/User/Login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            incorectDangerAllert.style.display = "block";
            incorectDangerAlertText.innerText = errorData.errorMessage;
            return false;
        }
        else{
            incorectDangerAllert.style.display = "none";
        }

        const data = await response.json();
        console.log(data);

        const token = data.token;
        const loggedUser = data.loggedUser;
        localStorage.setItem('token', token);
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        window.location.href = "/pages/home-page/home-page.html";
    } catch (error) {
        incorectDangerAllert.style.display = "block";
        incorectDangerAlertText.innerText = "Network Error";
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
