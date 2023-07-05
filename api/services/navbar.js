
const displayLoggedUsername = document.getElementById('display-logged-user');
const notLoggedUser = document.getElementById('not-logged-user');
const loggedUser = document.getElementById('logged-user');
const logoutBtn = document.getElementById('logout');

const navbarImage = document.getElementById('navbar-image');

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
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlZntj19KqLp6PixOo-THMk5SHclqG-eHg5Ubds1lk2kbfKth5o4QYZixHdOjeT9fnJ4&usqp=CAU";

    let loggedUsername = `${loggedUser[0].firstName} ${loggedUser[0].lastName}`;

    displayLoggedUsername.innerHTML = loggedUsername;
    if(loggedUser[0].profilePicture == "") navbarImage.src = defaultImage;
    else navbarImage.src = loggedUser[0].profilePicture;

}
displayLoggedUser();