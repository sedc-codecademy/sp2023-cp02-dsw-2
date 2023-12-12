using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoffeeHouse_App.DataAccess.Seed
{
    class SeedCategory
    {
        public static void Seed(CoffeeHouseDbContext dbContext)
        {
            var categoryList = new List<Category>()
            {
                new Category{Id = 1, Name = "Kafe vo zrno"},
                new Category{Id = 2, Name = "Meleno kafe"},
                new Category{Id = 3, Name = "Kafe kapsuli"},
                new Category{Id = 4, Name = "Kafemat"},
            };

            dbContext.Database.OpenConnection();
            dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Categories ON");

            UpdateData(categoryList, dbContext);
            DeleteData(categoryList, dbContext);
            AddData(categoryList, dbContext);
            dbContext.SaveChanges();

            dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Categories OFF");
            dbContext.Database.CloseConnection();
        }

        private static void UpdateData(List<Category> categories, CoffeeHouseDbContext dbContext)
        {
            var data = categories.Where(x => dbContext.Categories.Any(y => y.Id == x.Id && (y.Name != x.Name))).ToList();
            if (data.Any())
            {
                dbContext.Categories.UpdateRange(data);
            }
        }

        private static void DeleteData(List<Category> categories, CoffeeHouseDbContext dbContext)
        {
            var data = dbContext.Categories.ToList().Where(x => !categories.Any(y => y.Id == x.Id)).ToList();

            if(data.Any())
            {
                dbContext.Categories.RemoveRange(data);
            }
        }

        private static void AddData(List<Category> categories, CoffeeHouseDbContext dbContext)
        {
            var data = categories.Where(x => !dbContext.Categories.Contains(x));
            if(data.Any())
            {
                dbContext.Categories.AddRange(data);
            }
        }
    }
}
