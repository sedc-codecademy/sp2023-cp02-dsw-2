
const createProductCard = (Product) => {
    return`
        <div class = "col-md-6 col-lg-4 col-xl-3 mb-4">

            <div class = "card h-100 custom-card shadow-lg" style = "border-radius: 10px" >
                <span class="wish-icon d-flex justify-content-end"><i class="fa fa-heart-o" id = "wishIcon${Product.Id}"></i></span>
                <div class="img-box">
                    <img src="../../images/products-images/${Product.Image}" class="card-img-top" alt="Image of ${Product.Name} Product">									
                </div>
                <div class="card-body thumb-content d-flex flex-column">
                    <h5 class = "card-title redirect-to-productCard" id="${Product.Id}">${Product.Name}</h5>
                    <div class="mt-auto">

                        <div class="row ">

                            <div class="col-md-12">								
                    
                                <div class="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                    <input type="radio" id="star5-card${Product.Id}" name="rating-card${Product.Id}" value="5" /><label for="star5-card${Product.Id}" title="5 star"></label>
                                    <input type="radio" id="star3-card${Product.Id}" name="rating-card${Product.Id}" value="3" /><label for="star3-card${Product.Id}" title="3 star"></label>
                                    <input type="radio" id="star2-card${Product.Id}" name="rating-card${Product.Id}" value="2" /><label for="star2-card${Product.Id}" title="2 star"></label>
                                    <input type="radio" id="star1-card${Product.Id}" name="rating-card${Product.Id}" value="1" /><label for="star1-card${Product.Id}" title="1 star"></label>
                                    <input type="radio" id="star4-card${Product.Id}" name="rating-card${Product.Id}" value="4" /><label for="star4-card${Product.Id}" title="4 star"></label>
                                </div>
                            </div>
                        </div>
                        <p class="item-price  d-flex justify-content-center"><b>${Product.Price} <span lang = "mk">МКД</span></b></p>
                        <a href="javascript:void()" class="btn btn-primary  d-flex justify-content-center addToCardBtn shadow-lg" id = "addToCard${Product.Id}" style = "background-color:#DD592D !important;border-radius:10px; border-color:#DD592D; height:50px; padding-top:12px">Add to Cart <i class = "fa fa-shopping-cart pt-1" style="padding-left: 5px;"></i></a>
                        


                    </div>									
                </div>						

            </div>
        </div>

    
    
    `
}

export{createProductCard}