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

namespace CoffeeHouse_App.Services.Implmentations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICartRepository _cartRepository;

        public ProductService(IProductRepository productRepository, IPhotoRepository photoRepository, ICategoryRepository categoryRepository, ICartRepository cartRepository)
        {
            _productRepository = productRepository;
            _photoRepository = photoRepository;
            _categoryRepository = categoryRepository;
            _cartRepository = cartRepository;

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
            var product = await _productRepository.GetProductById(productId);
            if(product == null)
            {
                throw new ProductDataException("There is no such product!");
            }
            
            CartItem cartItem = new CartItem()
            {
                Product = product,
                UserId = userId,
                ProductId = productId,
            };

           await _cartRepository.Add(cartItem);
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

        public Task<List<ProductDto>> GetWishlistProducts(string userId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromCart(int productId, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<ProductDto> UpdateProduct(UpdateProductDto product, int productId, string userId)
        {
            throw new NotImplementedException();
        }

        
    }
}
