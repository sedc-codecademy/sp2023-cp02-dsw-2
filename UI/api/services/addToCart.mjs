import { showNotification } from './showNotification.mjs';

const addToCart = (productId,displayedProducts)=>{
    console.log("hello from function")
    const usersData = localStorage.getItem("usersData");
    const users = usersData ? JSON.parse(usersData) : [];

    const loggedUserData = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];


    if(loggedUser.length === 0){
        showNotification("Sign in to add items to cart!");
        return;
    }

    if(loggedUser[0].cart === undefined){
        loggedUser[0].cart = [];
    }


    let isAddedtoCart;

    if(loggedUser[0].cart.find(x=>x.Id == productId) != undefined){
        isAddedtoCart = true;
        showNotification("Item already added to Cart!");
        return;
    }
    else{
        isAddedtoCart = false;
    }



    if(!isAddedtoCart){

        loggedUser[0].cart.push(displayedProducts[productId-1]);
    
        localStorage.removeItem('loggedUser');
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        
        
    
    
        users.splice(users.findIndex(x => x.email === loggedUser.email), 1);
        users.push(loggedUser[0]);
        localStorage.setItem('usersData', JSON.stringify(users));
    
        showNotification("Item added to cart!");
    }
}



export {addToCart}