
const logoutBtn = document.getElementById('logout')
function logout(event) {
    if (localStorage.getItem('loggedUser')){
        event.preventDefault();
        localStorage.removeItem('loggedUser');
        
        window.location.href = "/pages/home-page/home-page.html";
    }
    if (localStorage.getItem('token')){
        localStorage.removeItem('token');
    }
    
    notLoggedUser.style.display = 'flex';
    loggedUser.style.display = 'none';
}
logoutBtn.addEventListener('click', logout);