using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs.ProductDtos;
using CoffeeHouse_App.Services.Abstractions;
using CoffeeHouse_App.Shared.CustomExceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoffeeHouse_App.Mappers.ProductMappers;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System.Security.Principal;

namespace CoffeeHouse_App.Services.Implmentations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IWishlistRepository _wishlistRepository;
        private readonly UserManager<User> _userManager;

        public ProductService(
            IProductRepository productRepository,
            IPhotoRepository photoRepository,
            ICategoryRepository categoryRepository,
            ICartRepository cartRepository,
            UserManager<User> userManager,
            IWishlistRepository wishlistRepository)
        {
            _productRepository = productRepository;
            _photoRepository = photoRepository;
            _categoryRepository = categoryRepository;
            _cartRepository = cartRepository;
            _userManager = userManager;
            _wishlistRepository = wishlistRepository;

        }



        public async Task<ProductDto> AddProduct(AddProductDto product, byte[] bytes)
        {
            if(product == null || product.ImageFile == null)
            {
                throw new ProductDataException("Invalid product data or missing image file!");
            }
           if (product.Name.IsNullOrEmpty()) 
            {
                throw new ProductDataException("There is no name for the product!");
            }
           if(product.CategoryId == null || product.Price == null || product.Weight == null || product.Stock == null)
            {
                throw new ProductDataException("There is no Category, Price, Weight or Stock for the product!");
            }

            var newPhoto = new Photo
            {
                Bytes = bytes,
                Description = product.ImageDescription,
                FileExtension = Path.GetExtension(product.ImageFile.FileName),
                Size = product.ImageFile.Length
            };

            int pictureId = await _photoRepository.Add(newPhoto);
            Photo pictureDb = await _photoRepository.GetPhotoById(pictureId);

            if(pictureDb == null)
            {
                throw new ProductDataException("Picture not found or error while attaching to dataabase!");
            }

            var category = await _categoryRepository.GetByIdInt(product.CategoryId);
            if(category == null)
            {
                throw new ProductDataException("There is no such Category");
            }

           Product newProduct = new Product()
           {
               Name = product.Name,
               Category = category,
               CategoryId = product.CategoryId,
               Price = product.Price,
               Weight = product.Weight,
               Stock = product.Stock,
               Description = product.Description,
               DiscountId = product.DiscountId,
               Photo = pictureDb,
               PhotoId = pictureId
           };

            await _productRepository.Add(newProduct);
            return newProduct.ToProductDto();
           
        }

        public async Task AddToCart(int productId, string userId)
        {
            var dbCartItem = await _cartRepository.GetCartItemByProductId(productId, userId);
            if(dbCartItem != null)
            {
                throw new ProductDataException("Product already added to cart!");
            }
            var product = await _productRepository.GetProductById(productId);
            if(product == null)
            {
                throw new ProductDataException("There is no such product!");
            }
            if(userId.IsNullOrEmpty())
            {
                throw new UserNotFoundException("There is no signed in user!");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                throw new UserNotFoundException("User not found!");
            }

            CartItem cartItem = new CartItem()
            {
                Product = product,
                User = user,
                UserId = userId,
                ProductId = productId,
            };

           await _cartRepository.Add(cartItem);
        }

        public async Task AddToWishlist(int productId, string userId)
        {
            if (userId.IsNullOrEmpty())
            {
                throw new UserNotFoundException("There is no signed in user!");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UserNotFoundException("User not found!");
            }

            var dbCartItem = await _wishlistRepository.GetWishlistItemByProductId(productId, userId);
            if (dbCartItem != null)
            {
                throw new ProductDataException("Product already added to Wishlist!");
            }

            var product = await _productRepository.GetProductById(productId);
            if (product == null)
            {
                throw new ProductDataException("There is no such product!");
            }

            WishItem wishItem = new WishItem()
            {
                Product = product,
                User = user,
                UserId = userId,
                ProductId = productId,
            };

            await _wishlistRepository.Add(wishItem);
        }

        public async Task DeleteProduct(int productId)
        {
            Product dbProduct = await _productRepository.GetProductById(productId);
            if(dbProduct == null)
            {
                throw new ProductDataException("Product not found!");
            }
            await _productRepository.Remove(dbProduct);
        }

        public async Task<List<ProductDto>> GetAllProducts()
        {
            List<Product> allProducts = await _productRepository.GetAllProducts();
            if(allProducts.IsNullOrEmpty())
            {
                throw new ProductDataException("No products were found!");
            }

            return allProducts.Select(x=>x.ToProductDto()).ToList(); 
        }



        public async Task<List<ProductDto>> GetCartProducts(string userId)
        {
            if (userId.IsNullOrEmpty())
            {
                throw new UserNotFoundException("There is no signed in user!");
            }
            List<CartItem> cartitems = await _cartRepository.GetAllUserCartItems(userId);
            if(cartitems.IsNullOrEmpty())
            {
                throw new ProductDataException("No products were found in cart!");
            }
            List<Product> products = cartitems.Select(x=>x.Product).ToList();
            return products.Select(x=>x.ToProductDto()).ToList();
        }

        public async Task<ProductDto> GetProductById(int id)
        {
            Product product = await _productRepository.GetProductById(id);
            if(product == null)
            {
                throw new ProductDataException("Product was not found!");
            }
            return product.ToProductDto();
        }

        public Task<List<ProductDto>> GetProductsByCategory(string category)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductDto>> GetWishlistProducts(string userId)
        {
            if (userId.IsNullOrEmpty())
            {
                throw new UserNotFoundException("There is no signed in user!");
            }
            List<WishItem> wishListItems = await _wishlistRepository.GetUserWishlistItems(userId);
            if (wishListItems.IsNullOrEmpty())
            {
                throw new ProductDataException("No products were found in Wishlist!");
            }
            List<Product> products = wishListItems.Select(x => x.Product).ToList();
            return products.Select(x => x.ToProductDto()).ToList();
        }

        public async Task RemoveFromCart(int productId, string userId)
        {
            if (userId.IsNullOrEmpty())
            {
                throw new UserNotFoundException("There is no signed in user!");
            }

           var cartItem = await _cartRepository.GetCartItemByProductId(productId, userId);
            if(cartItem == null)
            {
                throw new ProductDataException("Product not found in CartItems!");
            }
            await _cartRepository.Remove(cartItem);
            
        }

        public async Task RemoveFromWishlist(int productId, string userId)
        {
            if (userId.IsNullOrEmpty())
            {
                throw new UserNotFoundException("There is no signed in user!");
            }

            var WishlistItem = await _wishlistRepository.GetWishlistItemByProductId(productId,userId);
            if (WishlistItem == null)
            {
                throw new ProductDataException("Product not found in Wishlist!");
            }
            await _wishlistRepository.Remove(WishlistItem);
        }

        public Task<ProductDto> UpdateProduct(UpdateProductDto product, int productId, string userId)
        {
            throw new NotImplementedException();
        }

        


    }
}
