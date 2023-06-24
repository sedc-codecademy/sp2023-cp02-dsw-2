
const createProductCard = (Product) => {
    return`
    <div class="col-sm-3" id="${Product.Id}">
                <div class="thumb-wrapper">
                    <span class="wish-icon d-flex justify-content-end"><i class="fa fa-heart-o" id = "wishIcon${Product.Id}"></i></span>
                    <div class="img-box">
                        <img src="../../images/products-images/${Product.Image}" class="img-fluid" alt="Image of ${Product.Name} Product">									
                    </div>
                    <div class="thumb-content">
                        <h4>${Product.Name}</h4>									
                        <div class="row">

                            <div class="col-md-12">								
                    
                                <div class="starrating risingstar d-flex justify-content-end flex-row-reverse">
                                    <input type="radio" id="star5-card${Product.Id}" name="rating-card${Product.Id}" value="5" /><label for="star5-card${Product.Id}" title="5 star"></label>
                                    <input type="radio" id="star3-card${Product.Id}" name="rating-card${Product.Id}" value="3" /><label for="star3-card${Product.Id}" title="3 star"></label>
                                    <input type="radio" id="star2-card${Product.Id}" name="rating-card${Product.Id}" value="2" /><label for="star2-card${Product.Id}" title="2 star"></label>
                                    <input type="radio" id="star1-card${Product.Id}" name="rating-card${Product.Id}" value="1" /><label for="star1-card${Product.Id}" title="1 star"></label>
                                    <input type="radio" id="star4-card${Product.Id}" name="rating-card${Product.Id}" value="4" /><label for="star4-card${Product.Id}" title="4 star"></label>
                                </div>
                            </div>
                        </div>
                        <p class="item-price"><b>$${Product.Price}</b></p>
                        <a href="#" class="btn btn-primary" id = "addToCard${Product.Id}">Add to Cart</a>
                    </div>						
                </div>
            </div>
    
    
    `
}

export{createProductCard}