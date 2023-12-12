

let cartContainer = document.getElementById("cart-container")
let totalPriceContainer = document.getElementById("totalPriceContainer")
let subTotalContainer = document.getElementById("Subtotal-container")





document.addEventListener('DOMContentLoaded', ()=>{
    fetchCartProductData();
})


async function fetchCartProductData() {
    try{
        //GET THE TOKEN FROM LOCAL STORAGE
        const userToken = localStorage.getItem("token");
        let totalPrice = 0;
        cartContainer.innerHTML = '';
        const response = await fetch('http://localhost:5116/api/Product/CartProducts',{ headers: {Authorization: `Bearer ${userToken}`}});
        console.log(response)
        if(response.ok){
            if(response.status == 200){
                const cartData = await response.json();
                if(cartData.length !=0){
                    
                    cartData.forEach(cartProduct => {
                        totalPrice += cartProduct.price
                        
                        cartContainer.innerHTML += populateCart(cartProduct);
                    });
                    totalPriceContainer.innerHTML = populateTotalPrice(totalPrice)
                    subTotalContainer.innerHTML = populateSubTotal(totalPrice)
                }

            }
        }
        if(response.status === 404){
            
            totalPriceContainer.innerHTML = populateTotalPrice(0)
            subTotalContainer.innerHTML = populateSubTotal(0)
            cartContainer.innerHTML = 'No items Added to Cart'
        }
        else if (response.status === 500 || response.status === 400){
            totalPriceContainer.innerHTML = populateTotalPrice(0)
            subTotalContainer.innerHTML = populateSubTotal(0)
            cartContainer.innerHTML = 'Could not retrieve cart products'
        }
        
        
        
    }
    catch(error){
        console.error('Error fetching product details:', error);
    }
}



async function fetchRemoveCartItem(productId) {
    try{
        //GET THE TOKEN FROM LOCAL STORAGE
        const userToken = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5116/api/Product/RemoveFromCart${productId}`,{method: 'DELETE', headers: {Authorization: `Bearer ${userToken}`}});
        const message = await response;
        if(response.ok){
            fetchCartProductData()
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

    fetchRemoveCartItem(el.id)
    

});


function populateCart(cartProduct){
    return `<div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
    <div class="media d-block d-sm-flex text-center">
        <a class="cart-item-thumb mx-auto mr-sm-4" href="#"><img src="data:image/png;base64, ${cartProduct.photo.imageBase64} " alt="Product"></a>
        
        <div class="media-body ms-3">
            <h3 class="product-card-title font-weight-semibold border-0 pb-0"><a href="">${cartProduct.name}</a></h3>
            <div class="font-size-sm"><span class="text-muted mr-2">Description: </span>${cartProduct.description} </div>
            <div class="pt-2">Price: ${cartProduct.price} <span lang = "mk">МКД</span></div>
        </div>
    </div>
    
    <div class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left" style="max-width: 5rem;">
        <div class="form-group mb-2">
            <label for="quantity1">Quantity</label>
            <input class="form-control form-control-sm" type="number" id="quantity1" value="1">
        </div>
        <i class="uil uil-trash-alt trash" id = "${cartProduct.id}"></i>
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