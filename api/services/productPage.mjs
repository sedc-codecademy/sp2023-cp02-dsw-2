
import {createProductCard} from './createProductCard.mjs'
import { showNotification } from './showNotification.mjs';
import {addToCart} from './addToCart.mjs';
import { addToWishlist } from './addToWishlist.mjs';
import { removeFromWishlist } from './removeFromWishlist.mjs';



const elements = {
    cardContainer: document.getElementById("card-contaier"),
    sortButton: document.getElementById("sort-Button"),
    sortDefault: document.getElementById("sort-Default"),
    sortAlphabetically: document.getElementById("sort-Alphabetically"),
    sortPriceLowToHigh: document.getElementById("sort-PriceLowToHigh"),
    sortPriceHighToLow: document.getElementById("sort-PriceHighToLow"),
    filterButton : document.getElementById("filter-button"),
    filterCoffeeCategory : document.getElementById("coffee-category"),
    filterAccessoriesCategory : document.getElementById("Accessories-category"),
    filterCoffeeMachinesCategory : document.getElementById("coffeeMachines-category"),
    closeButton: document.getElementById("closebtn")

    
}










console.log("Hello there")

let products = null;
let displayedProducts = null;

fetch('../../api/data/products.json')
.then(res => res.json())
.then(data => {
    data.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    });
    products =data;
    displayedProducts = data;
    if (data!=0){
        
        console.log("Data fetced!")
    }
    else{
            console.log("Could not fetch from Json")
        }
    })
    .catch(function(err) {
        console.log(err);
    });


elements.sortDefault.addEventListener('click', ()=>{
    let defaultSortedProducts = displayedProducts.sort(dynamicSort("Id"))
    elements.cardContainer.innerHTML ='';
    
    defaultSortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})


elements.sortAlphabetically.addEventListener('click', ()=>{
    let alphabeticallySortedProducts = displayedProducts.sort(dynamicSort("Name"))
    elements.cardContainer.innerHTML ='';
    
    alphabeticallySortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})

elements.sortPriceLowToHigh.addEventListener('click', ()=>{
    let priceLowToHighSortedProducts = displayedProducts.sort(dynamicSort("Price"))
    elements.cardContainer.innerHTML ='';
    
    priceLowToHighSortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})

elements.sortPriceHighToLow.addEventListener('click', ()=>{
    let priceHighToLowSortedProducts = displayedProducts.sort(dynamicSort("-Price"))
    elements.cardContainer.innerHTML ='';
    
    priceHighToLowSortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})


elements.filterCoffeeCategory.addEventListener('click', ()=>{
    elements.sortButton.innerHTML = '<img src="../../images/icons/sort-icon.png" class="sort-icon" alt="">'+' Sort'
    let coffeeProducts = products.filter(x=>x.Category ==='Kafe vo zrno' || x.Category ==='Meleno kafe' || x.Category === 'Kafe kapsuli');
    elements.cardContainer.innerHTML ='';
    coffeeProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
    displayedProducts = coffeeProducts;
})

elements.filterAccessoriesCategory.addEventListener('click', ()=>{
    elements.sortButton.innerHTML = '<img src="../../images/icons/sort-icon.png" class="sort-icon" alt="">'+' Sort'
    let accessoriesProducts = products.filter(x=>x.Category ==='casi i fildzani');
    elements.cardContainer.innerHTML ='';
    accessoriesProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
    displayedProducts = accessoriesProducts;
})

elements.filterCoffeeMachinesCategory.addEventListener('click', ()=>{
    elements.sortButton.innerHTML = '<img src="../../images/icons/sort-icon.png" class="sort-icon" alt="">'+' Sort'
    let coffeeMachineProducts = products.filter(x=>x.Category ==='Kafemat');
    elements.cardContainer.innerHTML ='';
    coffeeMachineProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
    displayedProducts = coffeeMachineProducts;
})

elements.closeButton.addEventListener('click', ()=>{
    elements.sortButton.innerHTML = '<img src="../../images/icons/sort-icon.png" class="sort-icon" alt="">'+' Sort'
    elements.cardContainer.innerHTML ='';
    products.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    });
    displayedProducts = products;

})

elements.filterButton.addEventListener('click', ()=>{
    elements.sortButton.innerHTML = '<img src="../../images/icons/sort-icon.png" class="sort-icon" alt="">'+' Sort'
    elements.cardContainer.innerHTML ='';
    products.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    });
    displayedProducts = products;

})


// let addedToWishlist = false;

document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.wish-icon i')) {
        return;
    } 
    let productId = el.id.slice(8);
    

    if (el.classList.contains('fa-heart-o')){
        console.log("im here")
        addToWishlist(productId,displayedProducts)
    }
    else{
        console.log("you are here")
        removeFromWishlist(productId);
    }
    
    el.classList.toggle("fa-heart");
    el.classList.toggle("fa-heart-o");
    
    

});

document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches("#sortDropdown .dropdown-item")) {
    return;
}   

    elements.sortButton.innerHTML = '<img src="../../images/icons/sort-icon.png" class="sort-icon" alt="">'+' '+ el.innerHTML
});




document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.redirect-to-productCard')) {
        return;
    }   

    document.location.href = `../product-card/productCard.html?id=${el.id}`
});




document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.addToCardBtn')) {
        return;
    }   

    let productId = el.id.slice(9);

    addToCart(productId,displayedProducts);

});


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



