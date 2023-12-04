using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Abstractions
{
    public interface ICartRepository
    {
        Task Add(CartItem cartItem);
        Task Update(CartItem cartItem);
        Task Remove(CartItem cartItem);
        Task<CartItem> GetCartItemById(int id);
        Task<List<CartItem>> GetAllUserCartItems(string userId);
        Task<CartItem> GetCartItemByProductId(int productId, string userId);


    }
}
