using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Seed
{
    public class SeedProducts
    {
        public static void Seed(CoffeeHouseDbContext dbContext)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            Stream? stream = assembly?.GetManifestResourceStream("CoffeeHouse_App.DataAccess.Data.Products.json");

            if (stream != null)
            {
                string jsonData = new StreamReader(stream, Encoding.UTF8).ReadToEnd();
                var products = JsonConvert.DeserializeObject<List<Product>>(jsonData);

                if (products != null)
                {
                    dbContext.Database.OpenConnection();
                    dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Products ON");

                    UpdateData(products, dbContext);
                    DeleteData(products, dbContext);
                    AddData(products, dbContext);

                    dbContext.SaveChanges();

                    dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Products OFF");
                    dbContext.Database.CloseConnection();
                }

            }
        }

        private static void UpdateData(List<Product> products, CoffeeHouseDbContext dbContext)
        {
            var data = products.Where(x => dbContext.Products.Any(y => y.Id == x.Id && (y.Name != x.Name || y.Description != x.Description))).ToList();
            if (data.Any())
            {
                dbContext.Products.UpdateRange(data);
            }
        }

        private static void DeleteData(List<Product> products, CoffeeHouseDbContext dbContext)
        {
            var data = dbContext.Products.Where(x => !products.Any(y => y.Id == x.Id)).ToList();

            if (data.Any())
            {
                dbContext.Products.RemoveRange(data);
            }
        }

        private static void AddData(List<Product> products, CoffeeHouseDbContext dbContext)
        {
            var data = products.Where(x => !dbContext.Products.Contains(x));
            if (data.Any())
            {
                dbContext.Products.AddRange(data);
            }
        }
    }
}

