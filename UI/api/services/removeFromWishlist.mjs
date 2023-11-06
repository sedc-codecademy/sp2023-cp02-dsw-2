import { showNotification } from './showNotification.mjs';

const removeFromWishlist = (productId)=>{
    const usersData = localStorage.getItem("usersData");
    const users = usersData ? JSON.parse(usersData) : [];

    const loggedUserData = localStorage.getItem("loggedUser");
    const loggedUser = loggedUserData ? JSON.parse(loggedUserData) : [];


    if(loggedUser.length === 0){
        showNotification("Sign in to add items to wishlist!");
        return;
    }

    if(loggedUser[0].wishList === undefined){
        loggedUser[0].wishList = [];
    }


    let isAddedToWishlist;

    if(loggedUser[0].wishList.find(x=>x.Id == productId) != undefined){
        isAddedToWishlist = true;
        
    }
    else{
        isAddedToWishlist = false;
        showNotification("Item already removed from Wishlist!");
    }


    if(isAddedToWishlist){
        loggedUser[0].wishList.splice(loggedUser[0].wishList.findIndex(x=>x.Id == productId),1)
        
    
        localStorage.removeItem('loggedUser');
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        
        
    
    
        users.splice(users.findIndex(x => x.email === loggedUser.email), 1);
        users.push(loggedUser[0]);
        localStorage.setItem('usersData', JSON.stringify(users));
    
        showNotification("Item removed from Wishlist!");
    }
}



export {removeFromWishlist}