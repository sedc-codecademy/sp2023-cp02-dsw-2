import {addToCart} from './addToCart.mjs';


// Get product ID from URL
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

let productsFromJson = null;
// Fetch product data from JSON file
function loadProductData(productId) {
  fetch(`http://localhost:5116/api/Product/${productId}`)
    .then(response => response.json())
    .then(data => {
      productsFromJson = data;
      const product = data
      if (product) {
        populateProduct(product);
      } else {
        console.error('Product not found');
      }
    })
    .catch(error => {
      console.error('Error loading product data:', error);
    });
}


function populateProduct(product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-category').textContent = product.category.name;
  document.getElementById('product-price').textContent = `${product.price.toFixed(2)} МКД`;
  document.getElementById('product-quantity').textContent = product.stock;
  document.getElementById('product-weight').textContent = product.weight;
  document.getElementById('product-image').src = 'data:image/png;base64,' + product.photo.imageBase64;

  if (product.discount.discountPercent > 0) {
    document.getElementById('product-discount').textContent = `-${product.discount.discountPercent/100 * product.price} МКД`;
  } else {
    document.getElementById('product-discount').textContent = '';
  }

  const reviewsContainer = document.getElementById('product-reviews');
  reviewsContainer.innerHTML = '';

  let totalRating = 0;
  let reviewCount = 0;

  product.reviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.innerHTML = `
      <h3 class="card-title">${review.name}</h3>
      <p>${review.text}</p>
      <p><em>${review.email}</em></p>
      <div class="rating">${getStarRating(review.rating)}</div>
    `;
    reviewsContainer.appendChild(reviewElement);

    totalRating += review.Rating;
    reviewCount++;
  });

  const averageRating = totalRating / reviewCount;
  const roundedAverage = averageRating.toFixed(1);

  const ratingElement = document.createElement('div');
  ratingElement.classList.add('product-rating');
  ratingElement.innerHTML = `
    ${getStarRating(averageRating)}
    <span>${roundedAverage}(${reviewCount})</span>
  `;

  const productRatingContainer = document.querySelector('.product-rating');
  productRatingContainer.replaceWith(ratingElement);
}

// Load product data on page load
let productIdforCart;
window.addEventListener('DOMContentLoaded', () => {
  const productId = getProductIdFromURL();
  if (productId) {
    loadProductData(productId);
    productIdforCart = productId;
  } else {
    console.error('Product ID not found in URL');
  }
});

// Show notification
// function showNotification(message) {
//   const notification = document.getElementById('notification');
//   notification.textContent = message;
//   notification.classList.add('show');
  
//   setTimeout(() => {
//     notification.classList.remove('show');
//   }, 2000);
// }


document.addEventListener('click', function(e) {
    
  var el = e.target; 
  
  if (!el.matches('#addToCartBtn')) {
      return;
  }   
 console.log(productIdforCart);
 console.log(productsFromJson);
  // let productId = el.id.slice(9);

  addToCart(productIdforCart,productsFromJson);

});

// Add to Cart button click event
// document.getElementById('addToCartBtn').addEventListener('click', function() {
//   showNotification('Item added to cart');
// });

// Open review form
document.getElementById("writeReviewBtn").addEventListener("click", function() {
  let reviewFormContainer = document.getElementById("reviewFormContainer");
  reviewFormContainer.style.display = "block";
});

// Submit review
document.getElementById("reviewForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let rating = document.getElementById("rating").value;
  let review = document.getElementById("review").value;

  displayReview(name, email, rating, review);
  resetForm();
});

// Display review
function displayReview(name, email, rating, review) {
  const reviewsContainer = document.getElementById('product-reviews');

  const reviewContainer = document.createElement('div');
  reviewContainer.classList.add('review');

  const reviewTitle = document.createElement('h3');
  reviewTitle.classList.add('card-title');
  reviewTitle.textContent = name;

  const reviewText = document.createElement('p');
  reviewText.innerHTML = `
    <p>${review}</p>
    <p><em>${email}</em></p>
    <div class="rating">${getStarRating(rating)}</div>
  `;

  reviewContainer.appendChild(reviewTitle);
  reviewContainer.appendChild(reviewText);
  reviewsContainer.appendChild(reviewContainer);
}

// Reset form
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("rating").value = "1";
  document.getElementById("review").value = "";

  let reviewFormContainer = document.getElementById("reviewFormContainer");
  reviewFormContainer.style.display = "none";
}

function getStarRating(rating) {
  const filledStar = '<i class="fas fa-star"></i>';
  const halfStar = '<i class="fas fa-star-half-alt"></i>';
  const emptyStar = '<i class="far fa-star"></i>';

  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars += filledStar;
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars += halfStar;
    } else {
      stars += emptyStar;
    }
  }

  return stars;
}


