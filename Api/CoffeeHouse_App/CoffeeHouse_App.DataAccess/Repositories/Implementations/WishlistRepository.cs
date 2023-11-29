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
    public class WishlistRepository : IWishlistRepository
    {
        private readonly CoffeeHouseDbContext _dbContext;

        public WishlistRepository(CoffeeHouseDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task Add(WishItem wishItem)
        {
            try
            {
                _dbContext.WishItems.Add(wishItem);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<WishItem>> GetAllUserWishlistItems(string userId)
        {
            try
            {
                return await _dbContext.WishItems
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

        public async Task<WishItem> GetWishlistItemById(int id)
        {
            try
            {
                return await _dbContext.WishItems.FirstOrDefaultAsync(x => x.Id == id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Remove(WishItem wishItem)
        {
            try
            {
                _dbContext.WishItems.Remove(wishItem);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task Update(WishItem wishItem)
        {

            try
            {
                _dbContext.WishItems.Update(wishItem);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
