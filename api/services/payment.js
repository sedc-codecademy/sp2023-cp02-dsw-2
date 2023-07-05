
const logoutBtn = document.getElementById('logout')
function logout(event) {
    if (localStorage.getItem('loggedUser')){
        event.preventDefault();
        localStorage.removeItem('loggedUser');
        window.location.href = "/pages/home_page/home_page_index.html";
    }
    notLoggedUser.style.display = 'flex';
    loggedUser.style.display = 'none';
}
logoutBtn.addEventListener('click', logout);