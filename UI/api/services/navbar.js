
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
        window.location.href = "/pages/home-page/home-page.html";
    }
    if (localStorage.getItem('token')){
        localStorage.removeItem('token');
    }
    notLoggedUser.style.display = 'flex';
    loggedUser.style.display = 'none';
}
logoutBtn.addEventListener('click', logout);


async function displayLoggedUser() {
    const token = localStorage.getItem('token');
    try{
        const response = await fetch("http://localhost:5116/api/User/Get", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
			const errorData = await response.json();
            console.error('Error:', errorData);
			validationAllert.style.display = "block";
			if(errorData.errors){
                if(errorData.errors.ConfirmPassword){
                    validationAlertText.innerText =  errorData.errors.ConfirmPassword.join('\n');
                }
                else{
                    validationAlertText.innerText =  errorData.errors.join('\n');
                }
				
				return;
			}
			validationAlertText.innerText = errorData.errorMessage;
			return;
        }else{
            const loggedUser = await response.json();
            let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlZntj19KqLp6PixOo-THMk5SHclqG-eHg5Ubds1lk2kbfKth5o4QYZixHdOjeT9fnJ4&usqp=CAU";

            let loggedUsername = `${loggedUser.user.firstName} ${loggedUser.user.lastName}`;
        
            displayLoggedUsername.innerHTML = loggedUsername;
            
            if(loggedUser.user.profileImage == "" || loggedUser.user.profileImage == undefined) navbarImage.src = defaultImage;
            else navbarImage.src = loggedUser.user.profileImage;
		}
    }
    catch(error) {
        validationAllert.style.display = "block";
        validationAlertText.innerText =  'Network Error';
    }
}
displayLoggedUser();