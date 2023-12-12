using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoffeeHouse_App.DataAccess.Seed
{
    class SeedDiscount
    {
        public static void Seed(CoffeeHouseDbContext dbContext)
        {
            var discountList = new List<Discount>()
            {
                new Discount{Id = 1, Name = "Kafe vo zrno", Description = "Black Friday Discount", DiscountPercent =  15},
                new Discount{Id = 2, Name = "Meleno kafe", Description = "Easter Holiday Discount", DiscountPercent = 20},
            };

            dbContext.Database.OpenConnection();
            dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Discounts ON");

            UpdateData(discountList, dbContext);
            DeleteData(discountList, dbContext);
            AddData(discountList, dbContext);
            dbContext.SaveChanges();

            dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Discounts OFF");
            dbContext.Database.CloseConnection();
        }

        private static void UpdateData(List<Discount> discounts, CoffeeHouseDbContext dbContext)
        {
            var data = discounts.Where(x => dbContext.Discounts.Any(y => y.Id == x.Id && (y.Name != x.Name))).ToList();
            if (data.Any())
            {
                dbContext.Discounts.UpdateRange(data);
            }
        }

        private static void DeleteData(List<Discount> discounts, CoffeeHouseDbContext dbContext)
        {
            var data = dbContext.Discounts.ToList().Where(x => !discounts.Any(y => y.Id == x.Id)).ToList();

            if(data.Any())
            {
                dbContext.Discounts.RemoveRange(data);
            }
        }

        private static void AddData(List<Discount> discounts, CoffeeHouseDbContext dbContext)
        {
            var data = discounts.Where(x => !dbContext.Discounts.Contains(x));
            if(data.Any())
            {
                dbContext.Discounts.AddRange(data);
            }
        }
    }
}
