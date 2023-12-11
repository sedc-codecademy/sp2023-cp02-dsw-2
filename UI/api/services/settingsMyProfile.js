
const countryNames = document.getElementById('country');

// countryNames.value = "Country";

const url = 'https://cuik-projects.github.io/country-list/countries.json';

const validationAllert = document.getElementById('validation-alert');
const validationAlertText = document.getElementById('validation-alert-text');

const changeUserAllert = document.getElementById('change-user-successfully-created-alert');
const changeUserAlertText = document.getElementById('change-user-successfully-created-alert-text');

const deleteUserAlert = document.getElementById('delete-user-successfully-alert');
const deleteUserAlertText = document.getElementById('delete-user-successfully-alert-text');

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
    const token = localStorage.getItem('token');
    debugger;
    try{
        const imageUser = {
            Base64Image: base64
        }
        const response = await fetch(`http://localhost:5116/api/User/UploadImage`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(imageUser)
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
            const userImage = await response.json();
            let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlZntj19KqLp6PixOo-THMk5SHclqG-eHg5Ubds1lk2kbfKth5o4QYZixHdOjeT9fnJ4&usqp=CAU";
          
            if(userImage.base64 == "" || userImage.base64 == undefined) profileImage.src = defaultImage;
            else profileImage.src = userImage.base64;
            
			return userImage;
		}
    }
    catch(error) {
        validationAllert.style.display = "block";
        validationAlertText.innerText =  'Network Error';
    }
    //profileImage.src = base64;
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
    data = JSON.parse(data);
    return data;
}

// //* ----- Placeholders 
async function setInputsValue() {
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
          
            firstName.value = loggedUser.user.firstName;
            lastName.value = loggedUser.user.lastName;
            birthDate.value = loggedUser.user.birthdate;
            phoneNumber.value = loggedUser.user.phoneNumber;
            address.value = loggedUser.user.address.street;
            city.value = loggedUser.user.address.city;
            postalCode.value = loggedUser.user.address.zip;
            if(loggedUser.user.profileImage == "" || loggedUser.user.profileImage == undefined) profileImage.src = defaultImage;
            else profileImage.src = loggedUser.user.profileImage;
            console.log(loggedUser.user.profileImage);
            var countrySelect = document.body.querySelector('select');
            countrySelect.value = loggedUser.user.address.country;
			return loggedUser.user;
		}
    }
    catch(error) {
        validationAllert.style.display = "block";
        validationAlertText.innerText =  'Network Error';
    }
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
async function saveProfileChanges(event) {
    debugger;
    const token = localStorage.getItem('token');

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const birthDate = document.getElementById('datepicker').value;
    const phoneNumber = document.getElementById('phone-number').value;

    const street = document.getElementById('street-address').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value == "" ? null : document.getElementById('country').value == "";
    const postalCode = document.getElementById('postal-code').value;

    var addressIsNull = street === "" && city === "" && country === 0 && postalCode === "";

    const address ={
        Street: street,
        City: city,
        CountryId: country,
        Zip: postalCode
    }

    const userProfileUpdate = {
        FirstName: firstName,
        LastName: lastName,
        BirtDate: birthDate,
        PhoneNumber: phoneNumber,
        Address: addressIsNull ? null : address
	};

    try{
		event.preventDefault();
		const response = await fetch("http://localhost:5116/api/User/UpdateProfile", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
			body: JSON.stringify(userProfileUpdate)
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
			event.preventDefault();
            validationAllert.style.display = "none";
            const msg = await response.json();
            changeUserAllert.style.display = "block";
            changeUserAlertText.innerText = msg;
			return false;
		}
    }catch(error) {
        changeUserAllert.style.display = "none";
        validationAllert.style.display = "block";
        validationAlertText.innerText = "Network Error!"

    }

    // if(validateFirstLastName(firstName, lastName, event)){
    //     event.preventDefault();
    //     const data = localStorage.getItem("loggedUser");
	//     const loggedUser = data ? JSON.parse(data) : [];

    //     loggedUser[0].firstName = firstName;
    //     loggedUser[0].lastName = lastName;
    //     loggedUser[0].dateOfBirth = birthDate;
    //     loggedUser[0].phoneNumber = phoneNumber;
    //     loggedUser[0].address.streetAddress = address;
    //     loggedUser[0].address.city = city;
    //     loggedUser[0].address.country = country;
    //     loggedUser[0].address.postalCode = postalCode;
    //     loggedUser[0].profilePicture = profileImage.src;
       
    //     changesSuccessfullySaved.style.display = 'block';

    //     //* update loggedUser
    //     localStorage.removeItem('loggedUser');
    //     localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    //     //* update usersData
    //     let usersData = localStorage.getItem("usersData");
    //     let parsedUsers = JSON.parse(usersData);
    //     parsedUsers.splice(parsedUsers.findIndex(v => v.email === loggedUser.email), 1);
    //     parsedUsers.push(loggedUser[0]);
    //     localStorage.setItem('usersData', JSON.stringify(parsedUsers));
    //     return;
    // }
}
saveChangesButton.addEventListener('click', saveProfileChanges, false)




//* ----- Deactivate Account
deactivateAccount.addEventListener('click', async function(event){
    event.preventDefault();
    const token = localStorage.getItem('token');
debugger;
    try{
		event.preventDefault();
		const response = await fetch("http://localhost:5116/api/User/DeleteUser", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

		if (!response.ok) {
			const errorData = await response.json();
            console.error('Error:', errorData);
			validationAllert.style.display = "block";
			validationAlertText.innerText = errorData.errorMessage;
			return;
        }else{
			event.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('loggedUser');
            window.location.href = "/pages/home-page/home-page.html";
            // validationAllert.style.display = "none";
            // const msg = await response.json();
            // deleteUserAlert.style.display = "block";
            // deleteUserAlertText.innerText = msg;
			return false;
		}
    }catch(error) {
        deleteUserAlert.style.display = "none";
        validationAllert.style.display = "block";
        validationAlertText.innerText = "Network Error!"

    }


    // const loggedUser = getLoggedUser();
    // const usersData = localStorage.getItem("usersData");
    // data = JSON.parse(usersData);
    // data.splice(data.findIndex(v => v.email === loggedUser.email), 1);
    // localStorage.setItem('usersData', JSON.stringify(data));
    // localStorage.removeItem('loggedUser');
    // window.location.href = "/pages/home-page/home-page.html";
    // console.log(data)
    
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