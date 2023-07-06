import {removeFromWishlist} from './removeFromWishlist.mjs'

let wishListContainer = document.getElementById("wishlist-container")



const usersData = localStorage.getItem("usersData");
const users = usersData ? JSON.parse(usersData) : [];

const loggedUserData = localStorage.getItem("loggedUser");
const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];



if(loggedUser[0].wishList === undefined){
    loggedUser[0].wishList = [];
}


wishListContainer.innerHTML = '';
if(loggedUser[0].wishList.length !=0){
loggedUser[0].wishList.forEach(wishListProduct => {
    wishListContainer.innerHTML += populateWishList(wishListProduct);
});
}
else{
    wishListContainer.innerHTML = 'No items Added to Wishlist'
}


document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.trash')) {
        return;
    }   
    

    removeFromWishlist(el.id)

    const loggedUserData = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];

    wishListContainer.innerHTML = ''; 

    if(loggedUser[0].wishList.length !=0){
    loggedUser[0].wishList.forEach(wishListProduct => {
        wishListContainer.innerHTML += populateWishList(wishListProduct);
    });
    }
    else{
        wishListContainer.innerHTML = 'No items Added to Wishlist'
    }
    

});


function populateWishList(wishListProduct){
    return `<div class="card rounded-3 mb-4">
    <div class="card-body p-4">
        
        <div class="row d-flex justify-content-between align-items-center">

            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="../../images/products-images/${wishListProduct.Image}"
                class="img-fluid rounded-3" alt="product-image">
            </div>
            
            <div class="col-md-3 col-lg-3 col-xl-3">
            <p class="lead fw-normal mb-2">${wishListProduct.Name}</p>
            <p>
                <span class="text-muted">Category: </span>
                ${wishListProduct.Category}
            </p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
            
                <!--* Quantity -->
                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="uil uil-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="1" type="number"
                    class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="uil uil-plus"></i>
                </button>
            </div>

            <div class="col-md-3 col-lg-2 col-xl-1">
                <h5 class="mb-0">499</h5>
            </div>

            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button type="button" class="btn btn-save btn-m" id = "addToCart${wishListProduct.Id}">Add to cart</button>
            </div>

            <div class="col-md-1 col-lg-1 col-xl-1 ">
                <a href="#!" class="text-danger"><i class="uil uil-trash-alt trash" id = "${wishListProduct.Id}"></i></a>
            </div>
        </div>
    </div>
</div>`
}
