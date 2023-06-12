
console.log('vmrooooooooooooooooooo')

const notLoggedUser = document.getElementById('not-logged-user');
const loggedUser = document.getElementById('logged-user');
const logoutBtn = document.getElementById('logout')

if (localStorage.getItem('loggedUser')){
    notLoggedUser.style.display = 'none';
    loggedUser.style.display = 'block';
}

// for(let i=0; i<localStorage.length; i++) {
//     let key = localStorage.key(i);
//     alert(`${key}: ${localStorage.getItem(key)}`);
// }


const savedValue = localStorage.getItem('loggedUser');

if (savedValue === null) {
  // No value is saved, you can save a new value
  const newValue = "New value";
  localStorage.setItem(loggedUser, newValue);
} else {
  // A value is already saved, do not save another one
  console.log("A value is already saved:", savedValue);
}

function logout() {
    if (localStorage.getItem('loggedUser')){
        localStorage.removeItem('loggedUser');
    }
    notLoggedUser.style.display = 'flex';
    loggedUser.style.display = 'none';
}

logoutBtn.addEventListener('click', logout);