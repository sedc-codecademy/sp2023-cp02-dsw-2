using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Implementations
{
    public class CartRepository : ICartRepository
    {
        private readonly CoffeeHouseDbContext _dbContext;

        public CartRepository(CoffeeHouseDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task Add(CartItem cartItem)
        {
            try
            {
                _dbContext.CartItems.Add(cartItem);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        public async Task<List<CartItem>> GetAllUserCartItems(string userId)
        {
            try
            {
                return await _dbContext.CartItems
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Product)
                .ThenInclude(x => x.Photo)
                .Include(x => x.Product)
                .ThenInclude(x => x.Discount)
                .Where(x => x.UserId == userId)
                .ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<CartItem> GetCartItemById(int cartId)
        {
            try
            {
                return await _dbContext.CartItems.FirstOrDefaultAsync(x => x.Id == cartId);
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<CartItem> GetCartItemByProductId(int productId, string userId)
        {
            try
            {
                return await _dbContext.CartItems.FirstOrDefaultAsync(x => x.ProductId == productId && x.UserId == userId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Remove(CartItem cartItem)
        {
            try
            {
                _dbContext.CartItems.Remove(cartItem);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Update(CartItem cartItem)
        {
            try
            {
                _dbContext.CartItems.Update(cartItem);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
