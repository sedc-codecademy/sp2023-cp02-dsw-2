fetch('../../api/data/products.json')
  .then(response => response.json())
  .then(data => carouselProducts(data))
  .catch(error => console.error('Error:', error));

let carouselProducts = data => {
  const carouselInfo = document.querySelector('#carouselInfo');
  const filePath = '../../images/products-images/';

  for (let i = 0; i < 3; i++) {
    let product = data[i];

    let carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active'); // need to make initial product active for carousel to work
    }

    let productContainer = document.createElement('div');
    productContainer.classList.add('row');

    let productImageContainer = document.createElement('div');
    productImageContainer.classList.add('col-md-7');

    let productInfoContainer = document.createElement('div');
    productInfoContainer.classList.add('col-md-5', 'd-flex', 'flex-column', 'justify-content-center');

    productContainer.appendChild(productImageContainer);
    productContainer.appendChild(productInfoContainer);
    carouselItem.appendChild(productContainer);

    let image = document.createElement('img');
    image.src = `${filePath}${product.Image}`;
    image.classList.add('d-block', 'w-100');
    productImageContainer.appendChild(image);

    let name = document.createElement('span');
    name.innerHTML = `<strong>${product.Name}</strong>`;
    name.classList.add('fs-4');
    productInfoContainer.appendChild(name);

    let description = document.createElement('span');
    description.innerHTML = `<br><br><em>${product.Description}</em>`;
    description.classList.add('fs-5');
    productInfoContainer.appendChild(description);
    
    let price = document.createElement('span');
    price.innerHTML = `<br><br>Price: ${product.Price}`;
    price.classList.add('fs-4');
    productInfoContainer.appendChild(price);

    carouselInfo.appendChild(carouselItem);
  }
}

const logoutBtn = document.getElementById('logout')
function logout(event) {
  localStorage.removeItem('token');
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


const displayLoggedUsername = document.getElementById('display-logged-user-name');
const navbarImage = document.getElementById('navbar-image');

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