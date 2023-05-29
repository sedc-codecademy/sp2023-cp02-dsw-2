//* Rererences to HTML element *//
const incorectDangerAllert = document.getElementById('incorectDangerAlert');
const incorectDangerAlertText = document.getElementById('incorectDangerAlertText');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const passwordInfoAlert = document.getElementById('passwordInfoAlert');
const passwordInfoAlertText = document.getElementById('passwordInfoText');
const loginBtn = document.getElementById('login');



const signupPassword = document.getElementById('signup-password');

//? Example starter JavaScript for disabling form submissions if there are invalid fields
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

//! ----- Function Create Account -----
function createUser(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let signupEmail = document.getElementById('signup-email').value;
    let signupPassword = document.getElementById('signup-password').value;
    let user = new User(firstName, lastName, signupEmail, signupPassword, "", new Address("","","",""));
    
    // converting user to JSON
    let users = [];
    // let users = JSON.parse(localStorage.getItem('userData')) || [];
    const data = localStorage.getItem("userData");
    
    if(data != null) users = JSON.parse(data);
    users.push(user);
    const userJSON = JSON.stringify(users);
    localStorage.setItem('userData', userJSON);
  
}

createAccount.addEventListener('click', createUser,false);

function login(){
    const data = localStorage.getItem("userData");

}


//! ----- Login Function -----






//* Event Listener to password input field with callback function
signupPassword.addEventListener("focus", showPasswordInfoField);

function showPasswordInfoField() {
  passwordInfoAlert.style.display = "block";
}

document.addEventListener('click', function(event) {
    if (event.target !== signupPassword && event.target !== passwordInfoAlert && event.target !== passwordInfoAlertText) {
      passwordInfoAlert.style.display = 'none';
    }
  });


//! ----- Function Forgot Password -----

//function editProfile

//function editAccount
