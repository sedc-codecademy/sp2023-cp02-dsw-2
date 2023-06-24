
import {createProductCard} from './createProductCard.mjs'
let wishIcon


const elements = {
    cardContainer: document.getElementById("card-contaier"),
    filterButton: document.getElementById("filterButton"),
    filterDefault: document.getElementById("filter-Default"),
    filterAlphabetically: document.getElementById("filter-Alphabetically"),
    filterPriceLowToHigh: document.getElementById("filter-PriceLowToHigh"),
    filterPriceHighToLow: document.getElementById("filter-PriceHighToLow")
}










console.log("Hello there")

let products = null;
fetch('../../api/data/products.json')
.then(res => res.json())
.then(data => {
    data.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    });
    products =data;
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


elements.filterDefault.addEventListener('click', ()=>{
    let defaultSortedProducts = products.sort(dynamicSort("Id"))
    elements.cardContainer.innerHTML ='';
    
    defaultSortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})


elements.filterAlphabetically.addEventListener('click', ()=>{
    let alphabeticallySortedProducts = products.sort(dynamicSort("Name"))
    elements.cardContainer.innerHTML ='';
    
    alphabeticallySortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})

elements.filterPriceLowToHigh.addEventListener('click', ()=>{
    let priceLowToHighSortedProducts = products.sort(dynamicSort("Price"))
    elements.cardContainer.innerHTML ='';
    
    priceLowToHighSortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})

elements.filterPriceHighToLow.addEventListener('click', ()=>{
    let priceHighToLowSortedProducts = products.sort(dynamicSort("-Price"))
    elements.cardContainer.innerHTML ='';
    
    priceHighToLowSortedProducts.forEach(product => {
        elements.cardContainer.innerHTML += createProductCard(product)
    })
})



document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.wish-icon i')) {
        return;
    }   

    el.classList.toggle("fa-heart");
    el.classList.toggle("fa-heart-o");
})

document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches("#filterDropdown .dropdown-item")) {
    return;
}   

elements.filterButton.innerHTML = el.innerHTML
})


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