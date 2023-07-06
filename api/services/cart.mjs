import {removeFromCart} from './removeFromCart.mjs'

let cartContainer = document.getElementById("cart-container")
let totalPriceContainer = document.getElementById("totalPriceContainer")
let subTotalContainer = document.getElementById("Subtotal-container")



const usersData = localStorage.getItem("usersData");
const users = usersData ? JSON.parse(usersData) : [];

const loggedUserData = localStorage.getItem("loggedUser");
const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];



if(loggedUser[0].cart === undefined){
    loggedUser[0].cart = [];
}


cartContainer.innerHTML = '';
if(loggedUser[0].cart.length !=0){
    let totalPrice = 0;
    loggedUser[0].cart.forEach(cartProduct => {
        totalPrice += cartProduct.Price

        cartContainer.innerHTML += populateCart(cartProduct);
    });
    totalPriceContainer.innerHTML = populateTotalPrice(totalPrice)
    subTotalContainer.innerHTML = populateSubTotal(totalPrice)
}
else{
    totalPriceContainer.innerHTML = populateTotalPrice(0)
    subTotalContainer.innerHTML = populateSubTotal(0)
    cartContainer.innerHTML = 'No items Added to Cart'
}


document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.trash')) {
        return;
    }   

    removeFromCart(el.id)

    const loggedUserData = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];

    cartContainer.innerHTML = ''; 

    if(loggedUser[0].cart.length !=0){
        let totalPrice = 0;
        loggedUser[0].cart.forEach(cartProduct => {
        totalPrice += cartProduct.Price
        cartContainer.innerHTML += populateCart(cartProduct);
    });
        totalPriceContainer.innerHTML = populateTotalPrice(totalPrice)  
        subTotalContainer.innerHTML = populateSubTotal(totalPrice)
    }
    else{
        totalPriceContainer.innerHTML = populateTotalPrice(0)
        subTotalContainer.innerHTML = populateSubTotal(0)
        cartContainer.innerHTML = 'No items Added to Cart'
    }
    

});


function populateCart(cartProduct){
    return `<div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
    <div class="media d-block d-sm-flex text-center">
        <a class="cart-item-thumb mx-auto mr-sm-4" href="#"><img src="../../images/products-images/${cartProduct.Image}" alt="Product"></a>
        
        <div class="media-body ms-3">
            <h3 class="product-card-title font-weight-semibold border-0 pb-0"><a href="">${cartProduct.Name}</a></h3>
            <div class="font-size-sm"><span class="text-muted mr-2">Description: </span>${cartProduct.Description} </div>
            <div class="pt-2">Price: ${cartProduct.Price} <span lang = "mk">МКД</span></div>
        </div>
    </div>
    
    <div class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left" style="max-width: 5rem;">
        <div class="form-group mb-2">
            <label for="quantity1">Quantity</label>
            <input class="form-control form-control-sm" type="number" id="quantity1" value="1">
        </div>
        <i class="uil uil-trash-alt trash" id = "${cartProduct.Id}"></i>
    </div>
    </div>`
}

function populateTotalPrice(totalPrice){
    return`<div class="col-sm pt-5 total">
    Total
</div>
<div class="col-sm text-end class total pt-5">
    ${totalPrice} <span lang = "mk">МКД</span>
</div>`
}

function populateSubTotal (subTotalPrice){
    return`<div class="col-sm">
    Subtotal
</div>
<div class="col-sm text-end class">
${subTotalPrice} <span lang = "mk">МКД</span>
</div>`
}