(function () {
	
	'use strict'
//* Fetch all the forms we want to apply custom Bootstrap validation styles to
	let forms = document.querySelectorAll('.needs-validation');
//* Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
	  form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			  event.preventDefault()
			  event.stopPropagation()
		  }
		  form.classList.add('was-validated')
		}, false)
  })
})();
//! ----- Function Create Account -----
const emailExist = document.getElementById('email-exists-alert');
const passwordValidationAlert = document.getElementById('password-validation-alert');
const passwordValidationAlertText = document.getElementById('password-validation-alert-text');


const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

const createAccountBtn = document.getElementById('create-account');
const passworInfoAlert = document.getElementById('password-info-alert');

const accountCreated = document.getElementById('account-successfully-created');




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

//* ----- password validation -----
function validatePassword(password, event) {
	let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

	if (password === "") {
		event.preventDefault();
		passwordValidationAlert.style.display = 'block';
		passwordValidationAlertText.innerHTML = "Password field must be filled out";
	  	return false;
	} else if (!password.match(passwordRegex)) {
		event.preventDefault();
		passwordValidationAlert.style.display = 'block';
		passwordValidationAlertText.innerHTML = "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number";
	  	return false;
	} else {
		return true;
	}
}
function validateEmail(email, event) {
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!emailRegex.test(email) ) {
		passwordValidationAlert.style.display = 'block';
		passwordValidationAlertText.innerHTML = "Invalid email address";
	} else {
		return true;
	}
}

//* ----- create user -----
function createUser(event) {
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const signupEmail = document.getElementById('signup-email').value;
	const signupPassword = document.getElementById('signup-password').value;
	
	// if(firstName == "" || lastName == "" || signupEmail == "" || signupPassword == "")
	// {
	// 	event.preventDefault();
	// 	passwordValidationAlert.style.display = 'block';
	// 	passwordValidationAlertText.innerHTML = "I";
	//   	return false;
	// }
	
	const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];
  
	const existingUser = users.find(x => x.email === signupEmail);
	if (existingUser) {
		event.preventDefault();
	    emailExist.style.display = 'block';
		accountCreated.style.display = 'none';
	    return;
	}
	
	const user = new User(firstName, lastName, signupEmail, signupPassword, "", new Address("", "", "", ""));

	if(validatePassword(signupPassword, event) && validateEmail(signupEmail, event)) {
		event.preventDefault();
		users.push(user);
		localStorage.setItem('usersData', JSON.stringify(users));

		clearInputFields()

		accountCreated.style.display = 'block';
		return false;
	} 
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
function showPasswordInfoField() {
	passworInfoAlert.style.display = "block";
}
signupPassword.addEventListener("focus", showPasswordInfoField);

document.addEventListener('click', function(event) {
    if (event.target !== signupPassword && event.target !== passworInfoAlert && event.target !== passwordInfoAlertText) {
		passworInfoAlert.style.display = 'none';
    }
  });





  