using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Seed;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess
{
    public class DataInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var dbContext = new CoffeeHouseDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<CoffeeHouseDbContext>>()))
            {
                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    SeedRoles.Seed(dbContext);
                    SeedCountries.Seed(dbContext);
                    SeedCategory.Seed(dbContext);
                    SeedDiscount.Seed(dbContext);
                    SeedPhotos.Seed(dbContext);
                    SeedProducts.Seed(dbContext);

                    transaction.Commit();
                }
            }
        }
    }
}

