
const displayLoggedUsername = document.getElementById('display-logged-user');
const notLoggedUser = document.getElementById('not-logged-user');
const loggedUser = document.getElementById('logged-user');
const logoutBtn = document.getElementById('logout')

if (localStorage.getItem('loggedUser')){
    notLoggedUser.style.display = 'none';
    loggedUser.style.display = 'block';
}


function logout() {
    if (localStorage.getItem('loggedUser')){
        localStorage.removeItem('loggedUser');
    }
    notLoggedUser.style.display = 'flex';
    loggedUser.style.display = 'none';
}

logoutBtn.addEventListener('click', logout);

function displayLoggedUser() {
    const data = localStorage.getItem("loggedUser");
    const loggedUser = data ? JSON.parse(data) : [];

    let loggedUsername = `${loggedUser[0].firstName} ${loggedUser[0].lastName}`;

    displayLoggedUsername.innerHTML = loggedUsername;
}
displayLoggedUser();