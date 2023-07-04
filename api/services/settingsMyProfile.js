
const countryNames = document.getElementById('country');

// countryNames.value = "Country";

const url = 'https://cuik-projects.github.io/country-list/countries.json';

// fetch("../data/countries.json")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })

// fetch(url)
// .then(res => res.json())
// .then(data => {
//     let countryOutput = '<option selected disabled value="selectCountry">Select a country</option>';
//     data.forEach(country => {
//         countryOutput += `<option value="${country.name}">${country.name}</option>`;
//     });
//     countryNames.innerHTML = countryOutput;
// })
// .catch(error => {
//     console.log(error);
// })

//* --------------------------------------

//* ----- My Account --><-- My Profile -----
myProfile = document.getElementById('my-profile-button');
myAccount = document.getElementById('my-account-button');
myProfile.style.backgroundColor = "#DD592D"
myProfile.style.color = "white"

myProfile.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = "/pages/settings/settings-my-profile.html";
    myProfile.style.backgroundColor = "#DD592D"
})
myAccount.addEventListener('click', function(){
    window.location.href = "/pages/settings/settings-my-account.html";
    myAccount.style.backgroundColor = "#DD592D"
});


//! ======= My Profile =======

//* ----- Upload Image
const uploadImageBtn = document.getElementById('upload-image-btn');
const profileImage = document.getElementById('profile-image');
const testSlika = document.getElementById('test-slika');

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
const uploadImageFunc = async (event) => {

    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    profileImage.src = base64;
};
uploadImageBtn.addEventListener("change", (e) => {
    uploadImageFunc(e);
});

//* ------------------------------------------------------
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');

const birthDate = document.getElementById('datepicker');
const phoneNumber = document.getElementById('phone-number');

const address = document.getElementById('street-address');
const city = document.getElementById('city');
const country = document.getElementById('country');
const postalCode = document.getElementById('postal-code');

//* ----- Get Logged User
function getLoggedUser() {
    let data = localStorage.getItem("loggedUser");
    data = JSON.parse(data)[0];
    return data;
}

// //* ----- Placeholders 
function setInputsValue() {
    let loggedUser = getLoggedUser();
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlZntj19KqLp6PixOo-THMk5SHclqG-eHg5Ubds1lk2kbfKth5o4QYZixHdOjeT9fnJ4&usqp=CAU";
  
    firstName.value = loggedUser.firstName;
    lastName.value = loggedUser.lastName;
    birthDate.value = loggedUser.dateOfBirth;
    phoneNumber.value = loggedUser.phoneNumber;
    address.value = loggedUser.address.streetAddress;
    city.value = loggedUser.address.city;
    postalCode.value = loggedUser.address.postalCode;
    if(loggedUser.profilePicture == "") profileImage.src = defaultImage;
    else profileImage.src = loggedUser.profilePicture;
    
    var countrySelect = document.body.querySelector('select');
    countrySelect.value = loggedUser.address.country;
}
setInputsValue();

//! ------- Form -------
const incorectFirstOrLastNameAlert = document.getElementById('incorect-first-last-name-alert');
const changesSuccessfullySaved = document.getElementById('changes-successfully-saved');

const cancelChangesButton = document.getElementById('cancel-changes-btn');
const saveChangesButton = document.getElementById('save-changes-btn');

const deactivateAccount = document.getElementById('deactivate-btn');

//* ----- First-Name and Last-Name Validation -----
function validateFirstLastName(firstName, lastName, event) {
	const firstNameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/;

	if(!firstNameRegex.test(firstName) || !firstNameRegex.test(lastName)) {
		event.preventDefault();
        incorectFirstOrLastNameAlert.style.display = "block"
		return false;
	} else {
		return true;
	}
}

//* ----- Save new User changes
function saveProfileChanges(event) {
    

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const birthDate = document.getElementById('datepicker').value;
    const phoneNumber = document.getElementById('phone-number').value;

    const address = document.getElementById('street-address').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const postalCode = document.getElementById('postal-code').value;

    if(validateFirstLastName(firstName, lastName, event)){
        event.preventDefault();
        const data = localStorage.getItem("loggedUser");
	    const loggedUser = data ? JSON.parse(data) : [];

        loggedUser[0].firstName = firstName;
        loggedUser[0].lastName = lastName;
        loggedUser[0].dateOfBirth = birthDate;
        loggedUser[0].phoneNumber = phoneNumber;
        loggedUser[0].address.streetAddress = address;
        loggedUser[0].address.city = city;
        loggedUser[0].address.country = country;
        loggedUser[0].address.postalCode = postalCode;
        loggedUser[0].profilePicture = profileImage.src;
       
        changesSuccessfullySaved.style.display = 'block';

        //* update loggedUser
        localStorage.removeItem('loggedUser');
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

        //* update usersData
        let usersData = localStorage.getItem("usersData");
        let parsedUsers = JSON.parse(usersData);
        parsedUsers.splice(parsedUsers.findIndex(v => v.email === loggedUser.email), 1);
        parsedUsers.push(loggedUser[0]);
        localStorage.setItem('usersData', JSON.stringify(parsedUsers));
        return;
    }
}
saveChangesButton.addEventListener('click', saveProfileChanges, false)




//* ----- Deactivate Account
deactivateAccount.addEventListener('click', function(event){
    event.preventDefault();
    const loggedUser = getLoggedUser();
    const usersData = localStorage.getItem("usersData");
    data = JSON.parse(usersData);
    data.splice(data.findIndex(v => v.email === loggedUser.email), 1);
    localStorage.setItem('usersData', JSON.stringify(data));
    localStorage.removeItem('loggedUser');
    window.location.href = "/pages/home_page/home_page_index.html";
    console.log(data)
    
})
// //? Toggle Password - LOGIN
// (function() {
//     'use strict'

//     const eyeToggle = document.querySelector('.js-password-show-toggle');

//     eyeToggle.addEventListener('click', (e) => {
//         e.preventDefault();

//         if ( eyeToggle.classList.contains('active') ) {
//             loginPassword.setAttribute('type', 'password');
//             eyeToggle.classList.remove('active');
//         } else {
//             loginPassword.setAttribute('type', 'text');
//             eyeToggle.classList.add('active');
//         }
//     })
// })()