//! ----- Function Create Account -----
const emailExist = document.getElementById('email-exists-alert');

const passwordValidationAlert = document.getElementById('password-validation-alert');
const emailValidationAlert = document.getElementById('email-validation-alert');
const firstnameLastnameValidationAlert = document.getElementById('firstname-lastname-validation-alert');


const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

const createAccountBtn = document.getElementById('create-account');
const passworInfoAlert = document.getElementById('password-info-alert');

const accountCreated = document.getElementById('account-successfully-created');


//* Example starter JavaScript for disabling form submissions if there are invalid fields
function isFormEmpty() {
	const firstName = document.getElementById('firstName').value.trim();
	const lastName = document.getElementById('lastName').value.trim();
	const signupEmail = document.getElementById('signup-email').value.trim();
	const signupPassword = document.getElementById('signup-password').value.trim();

	return firstName === "" && lastName === "" && signupEmail === "" && signupPassword === "";
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

//* ----- clear input fields -----
function clearInputFields() {
	firstName.value = '';
	lastName.value = '';
	signupEmail.value = '';
	signupPassword.value = '';
}

//* ----- set user admin -----
if (!localStorage.getItem('adminAccountCreated')) {
	const admin = {
		firstName: "Admin",
		lastName: "Admin",
		email: "admin@admin.com",
		password: "admin12345",
		dateOfBirth: "",
		phoneNumber: "",
		profilePicture: "",
		address: {
			streetAddress: "",
			city: "",
			country: "",
			postalCode: "",
		}
	};

	const data = localStorage.getItem('usersData');
	const users = data ? JSON.parse(data) : [];
	users.push(admin);
	localStorage.setItem('usersData', JSON.stringify(users));
	localStorage.setItem('adminAccountCreated', true);
}

//* ----- Password Validation -----
function validatePassword(password, event) {
	let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	
	if (!password.match(passwordRegex)) {
		event.preventDefault();
		passwordValidationAlert.style.display = 'block';
		emailExist.style.display = 'none';
	  	return false;
	} else {
		return true;
	}
}
//* ----- Email Validation -----
function validateEmail(email, event) {
	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!emailRegex.test(email)) {
		event.preventDefault();
		emailValidationAlert.style.display = 'block';
		emailExist.style.display = 'none';
		return false;
	} else {
		return true;
	}
}
//* ----- First Name Validation -----
function validateFirstLastName(firstName, lastName, event) {
	const firstNameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/;

	if(!firstNameRegex.test(firstName) || !firstNameRegex.test(lastName)) {
		event.preventDefault();
		firstnameLastnameValidationAlert.style.display = 'block';
		emailExist.style.display = 'none';
		emailValidationAlert.style.display = 'none';
		passwordValidationAlert.style.display = 'none';
		return false;
	} else {
		return true;
	}
}

//* ----- Create User -----
function createUser(event) {
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const signupEmail = document.getElementById('signup-email').value;
	const signupPassword = document.getElementById('signup-password').value;
	
	// Inside the createUser function
	if (isFormEmpty()) {
		triggerFormValidation(event);
		return;
	}
	
	const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];
  
	const existingUser = users.find(x => x.email === signupEmail);
	if (existingUser) {
		event.preventDefault();
	    emailExist.style.display = 'block';
		accountCreated.style.display = 'none';
	    return;
	}
	
	const user = new User(firstName, lastName, signupEmail, signupPassword,"", "", "", new Address("", "", "", ""));

	if(validatePassword(signupPassword, event) && validateEmail(signupEmail, event) && validateFirstLastName(firstName, lastName, event)) {
		event.preventDefault();
		users.push(user);
		localStorage.setItem('usersData', JSON.stringify(users));

		clearInputFields()

		accountCreated.style.display = 'block';
		return false;
	} 
}
createAccountBtn.addEventListener('click', createUser, false);


//* ----- Toggle Password - SIGNUP -----
(function() {
	'use strict'
	const eyeToggle = document.querySelector('.js-password-show-toggle');

	eyeToggle.addEventListener('click', (e) => {
		e.preventDefault();

		if ( eyeToggle.classList.contains('active') ) {
			signupPassword.setAttribute('type', 'password');
			eyeToggle.classList.remove('active');
		} else {
			signupPassword.setAttribute('type', 'text');
			eyeToggle.classList.add('active');
		}
	})
})();

//* ----- Password Input Field Alert -----
function showPasswordInfoField() {
	if (passwordValidationAlert.style.display = 'none'){
		passworInfoAlert.style.display = "block";
	}
}
signupPassword.addEventListener("focus", showPasswordInfoField);

document.addEventListener('click', function(event) {
    if (event.target !== signupPassword && event.target !== passworInfoAlert && event.target !== passwordInfoAlertText) {
		passworInfoAlert.style.display = 'none';
    }
});





  