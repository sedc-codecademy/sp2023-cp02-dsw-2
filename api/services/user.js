
//* Rererences to HTML element *//
const loginPassword = document.getElementById('login-password');
const passwordInfo = document.getElementById('passwordInfo');
const smallText = document.querySelector('small');


const loginBtn = document.getElementById('login');
//* Toggle Password
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

//* Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
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

//! ----- Function Login -----

//* Event Listener to password input field with callback function
// passwordInput.addEventListener("focus", showPasswordInfo);

// function showPasswordInfo() {
//   passwordInfo.style.display = "block";
// }

// document.addEventListener('click', function(event) {
//     //* Check if the clicked element is outside the password input or password info
//     if (event.target !== passwordInput && event.target !== passwordInfo && event.target !== smallText) {
//       passwordInfo.style.display = 'none';
//     }
//   });




//! ----- Function Create Account -----


let createAccount = document.getElementById('createAccount');



// const fs = require('fs');
// const path = require('path');
// const filePath = path.join(process.cwd(), 'user.json');

function createUser(){
    debugger;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let signupEmail = document.getElementById('signup-email').value;
    let signupPassword = document.getElementById('signup-password').value;
    let user = new User(firstName, lastName, signupEmail, signupPassword, "", new Address("","","",""));
    // converting user to JSON
    let users = [];
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


//! ----- Function Forgot Password -----

//function editProfile

//function editAccount
