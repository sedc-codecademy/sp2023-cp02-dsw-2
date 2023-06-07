//* Rererences to HTML element *//
const incorectDangerAllert = document.getElementById('incorectDangerAlert');
const incorectDangerAlertText = document.getElementById('incorectDangerAlertText');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const passwordInfoAlert = document.getElementById('passwordInfoAlert');
const passwordInfoAlertText = document.getElementById('passwordInfoText');
const loginBtn = document.getElementById('login');

//! ----- Login Function -----
function loginAccount(event){
	const loginEmail = document.getElementById('login-email').value;
	const loginPassword = document.getElementById('login-password').value;

	const data = localStorage.getItem("usersData");
	const users = data ? JSON.parse(data) : [];

	const userExists = users.find(u => u.email === loginEmail && u.password === loginPassword);

  	if (userExists) {
        event.preventDefault();
        window.location.href = "../../pages/index.html";
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


//? Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
  
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
  })()

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
