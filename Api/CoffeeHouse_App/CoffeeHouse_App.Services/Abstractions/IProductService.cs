using CoffeeHouse_App.DTOs.ProductDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Services.Abstractions
{
    public interface IProductService
    {
        Task<ProductDto> AddProduct(AddProductDto product, byte[] bytes);
        Task<ProductDto> UpdateProduct(UpdateProductDto product,int productId, string userId);

        Task<List<ProductDto>> GetAllProducts();
        Task<ProductDto> GetProductById(int id);
        Task<List<ProductDto>> GetProductsByCategory(string category);
        Task<List<ProductDto>> GetWishlistProducts(string userId);
        Task AddToWishlist(int productId, string userId);
        Task RemoveFromWishlist(int productId, string userId);
        Task<List<ProductDto>> GetCartProducts(string userId);
        Task AddToCart(int productId, string userId);
        Task RemoveFromCart(int productId,string userId);
        Task DeleteProduct (int productId);
    }
}
