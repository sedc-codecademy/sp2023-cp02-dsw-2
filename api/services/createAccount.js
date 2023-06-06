//! ----- Function Create Account -----
const emailExist = document.getElementById('email-exists');

const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

const createAccountBtn = document.getElementById('create-account');
const passworInfoAlert = document.getElementById('password-info-alert');

const accountCreated = document.getElementById('account-successfully-created')

//* ----- clear input fields -----
function clearInputFields() {
	firstName.value = '';
	lastName.value = '';
	signupEmail.value = '';
	signupPassword.value = '';
}

//* ----- set user admin -----
if (!localStorage.getItem('adminAccountCreated')) {
	console.log("adminAccountCreated");
	const admin = {
		firstName: "Admin",
		lastName: "Admin",
		email: "admin@admin.com",
		password: "admin12345",
		dateOfBirth: "",
		address: {
			streetAddress: "",
			city: "",
			country: "",
			postalCode: "",
		}
	};

	const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];
	users.push(admin);
	localStorage.setItem('usersData', JSON.stringify(users));
	localStorage.setItem('adminAccountCreated', true);
}


//* ----- create user -----
function createUser(event) {
	console.log("createUser");
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const signupEmail = document.getElementById('signup-email').value;
	const signupPassword = document.getElementById('signup-password').value;
	
  
	const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];
  
	const existingUser = users.find(x => x.email === signupEmail);
	if (existingUser) {
		event.preventDefault();
	    emailExist.style.display = 'block';
		accountCreated.style.display = 'none';
	    return;
	}
	event.preventDefault();
	const user = new User(firstName, lastName, signupEmail, signupPassword, "", new Address("", "", "", ""));
	users.push(user);
	localStorage.setItem('usersData', JSON.stringify(users));

	clearInputFields()

	accountCreated.style.display = 'block';
	return false;	
}
createAccountBtn.addEventListener('click', createUser, false);


//? Toggle Password - SIGNUP
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


//? Event Listener to password input field with callback function
signupPassword.addEventListener("focus", showPasswordInfoField);

function showPasswordInfoField() {
	passworInfoAlert.style.display = "block";
}

document.addEventListener('click', function(event) {
    if (event.target !== signupPassword && event.target !== passworInfoAlert && event.target !== passwordInfoAlertText) {
		passworInfoAlert.style.display = 'none';
    }
  });





  