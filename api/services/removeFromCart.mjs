import { showNotification } from './showNotification.mjs';

const removeFromCart = (productId)=>{
    const usersData = localStorage.getItem("usersData");
    const users = usersData ? JSON.parse(usersData) : [];

    const loggedUserData = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];


    if(loggedUser.length === 0){
        showNotification("Sign in to add items to wishlist!");
        return;
    }

    if(loggedUser[0].cart === undefined){
        loggedUser[0].cart = [];
    }


    let isAddedToCart;

    if(loggedUser[0].cart.find(x=>x.Id == productId) != undefined){
        isAddedToCart = true;
        
    }
    else{
        isAddedToCart = false;
        showNotification("Item already removed from Cart!");
    }


    if(isAddedToCart){
        loggedUser[0].cart.splice(loggedUser[0].cart.findIndex(x=>x.Id == productId),1)
        
    
        localStorage.removeItem('loggedUser');
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        
        
    
    
        users.splice(users.findIndex(x => x.email === loggedUser.email), 1);
        users.push(loggedUser[0]);
        localStorage.setItem('usersData', JSON.stringify(users));
    
        showNotification("Item removed from Cart!");
    }
}



export {removeFromCart}