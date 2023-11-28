using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Implementations
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        private readonly CoffeeHouseDbContext _coffeeHouseDbContext;

        public ProductRepository(CoffeeHouseDbContext coffeeHouseDbContext) : base(coffeeHouseDbContext)
        {
            _coffeeHouseDbContext = coffeeHouseDbContext;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            try
            {
                List<Product> allEntities = await _coffeeHouseDbContext.Products
                    .Include(x=>x.Category)
                    .Include(x=>x.Discount)
                    .Include (x=>x.Photo)
                    .Include(x=>x.Reviews)
                    .Where(e => e.IsDeleted == false)
                    .ToListAsync();
                return allEntities;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Product> GetProductById(int id)
        {
            try
            {
                return await _coffeeHouseDbContext.Products
                    .Include(x => x.Category)
                    .Include(x => x.Discount)
                    .Include(x => x.Photo)
                    .Include(x => x.Reviews)
                    .FirstOrDefaultAsync(e => e.IsDeleted == false && e.Id == id);
                    
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
