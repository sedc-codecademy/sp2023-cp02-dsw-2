import {removeFromWishlist} from './removeFromWishlist.mjs'

let wishListContainer = document.getElementById("wishlist-container")


document.addEventListener('DOMContentLoaded', ()=>{
    fetchWishListProductData();
})


async function fetchWishListProductData() {
    try{
        //GET THE TOKEN FROM LOCAL STORAGE
        const userToken = localStorage.getItem("token");
        wishListContainer.innerHTML = '';
        const response = await fetch('http://localhost:5116/api/Product/Wishlist',{ headers: {Authorization: `Bearer ${userToken}`}});
        console.log(response)
        if(response.ok){
            if(response.status == 200){
                const wishListData = await response.json();
                if(wishListData.length !=0){
                    
                    wishListData.forEach(wishlistProduct => {
                        wishListContainer.innerHTML += populateWishList(wishlistProduct);
                    });
                }

            }
        }
        if(response.status === 404){
            
            wishListContainer.innerHTML = 'No items Added to Wishlist'
        }
        else if (response.status === 500 || response.status === 400){
            wishListContainer.innerHTML = 'Could not retrieve Wishlist products'
        }
        
        
        
    }
    catch(error){
        console.error('Error fetching product details:', error);
    }
}



async function fetchRemoveWishlistItem(productId) {
    try{
        //GET THE TOKEN FROM LOCAL STORAGE
        // const userToken = localStorage.getItem("Token");
        const response = await fetch(`http://localhost:5116/api/Product/RemoveFromWishlist${productId}`,{method: 'DELETE', headers: {Authorization: `Bearer ${userToken}`}});
        const message = await response;
        if(response.ok){
            fetchWishListProductData()
        }
        
    }
    catch(error){
        console.error('Error fetching product details:', error);
        
    }
}




document.addEventListener('click', function(e) {
    
    var el = e.target; 
    
    if (!el.matches('.trash')) {
        return;
    }   

    fetchRemoveWishlistItem(el.id)
    

});



function populateWishList(wishListProduct){
    return `<div class="card rounded-3 mb-4">
    <div class="card-body p-4">
        
        <div class="row d-flex justify-content-between align-items-center">

            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="data:image/png;base64, ${wishListProduct.photo.imageBase64}"
                class="img-fluid rounded-3" alt="product-image">
            </div>
            
            <div class="col-md-3 col-lg-3 col-xl-3">
            <p class="lead fw-normal mb-2">${wishListProduct.name}</p>
            <p>
                <span class="text-muted">Category: </span>
                ${wishListProduct.category.name}
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
                <h5 class="mb-0">  ${wishListProduct.price}</h5>
            </div>

            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button type="button" class="btn btn-save btn-m" id = "addToCart${wishListProduct.id}">Add to cart</button>
            </div>

            <div class="col-md-1 col-lg-1 col-xl-1 ">
                <a href="#!" class="text-danger"><i class="uil uil-trash-alt trash" id = "${wishListProduct.id}"></i></a>
            </div>
        </div>
    </div>
</div>`
}
