using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Abstractions
{
    public interface IWishlistRepository
    {
        Task Add(WishItem wishItem);
        Task Update(WishItem wishItem);
        Task Remove(WishItem wishItem);
        Task<WishItem> GetWishlistItemById(int id);
        Task<List<WishItem>> GetUserWishlistItems(string userId);
        Task<WishItem> GetWishlistItemByProductId(int productId, string userId);
    }
}
