using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Seed
{
     class SeedRoles
    {
        public static void Seed(CoffeeHouseDbContext dbContext)
        {
            var rolesList = new List<Role>()
            {
                new Role{Id = "1", Name = "Admin", NormalizedName="ADMIN"},
                new Role{Id = "2", Name="Customer", NormalizedName = "CUSTOMER"}
            };

            UpdateData(rolesList, dbContext);
            DeleteData(rolesList, dbContext);
            AddData(rolesList, dbContext);
            dbContext.SaveChanges();
        }

        private static void UpdateData(List<Role> roles, CoffeeHouseDbContext dbContext)
        {
            var data = roles.Where(x => dbContext.Roles.Any(y => y.Id == x.Id && (y.Name != x.Name || y.NormalizedName != x.NormalizedName))).ToList();
            if (data.Any())
            {
                dbContext.Roles.UpdateRange(data);
            }
        }

        private static void DeleteData(List<Role> roles, CoffeeHouseDbContext dbContext)
        {
            var data = dbContext.Roles.ToList().Where(x => !roles.Any(y => y.Id == x.Id)).ToList();

            if(data.Any())
            {
                dbContext.Roles.RemoveRange(data);
            }
        }

        private static void AddData(List<Role> roles, CoffeeHouseDbContext dbContext)
        {
            var data = roles.Where(x => !dbContext.Roles.Contains(x));
            if(data.Any())
            {
                dbContext.Roles.AddRange(data);
            }
        }
    }
}
