using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Reflection;
using System.Text;

namespace CoffeeHouse_App.DataAccess.Seed
{
    public class SeedCountries
    {
        public static void Seed(CoffeeHouseDbContext dbContext)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            Stream? stream = assembly?.GetManifestResourceStream("CoffeeHouse_App.DataAccess.Data.Countries.json");

            if(stream != null)
            {
                string jsonData = new StreamReader(stream, Encoding.UTF8).ReadToEnd();
                var countries = JsonConvert.DeserializeObject<List<Country>>(jsonData);

                if(countries != null)
                {
                    dbContext.Database.OpenConnection();
                    dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Countries ON");

                    UpdateData(countries, dbContext);
                    DeleteData(countries, dbContext);
                    AddData(countries, dbContext);

                    dbContext.SaveChanges();

                    dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Countries OFF");
                    dbContext.Database.CloseConnection();
                }
               
            }
        }

        private static void UpdateData(List<Country> countries, CoffeeHouseDbContext dbContext)
        {
            var data = countries.Where(x => dbContext.Countries.Any(y => y.Id == x.Id && (y.CountryName != x.CountryName || y.CountryCode != x.CountryCode))).ToList();
            if (data.Any())
            {
                dbContext.Countries.UpdateRange(data);
            }
        }

        private static void DeleteData(List<Country> countries, CoffeeHouseDbContext dbContext)
        {
            var data = dbContext.Countries.ToList().Where(x => !countries.Any(y => y.Id == x.Id)).ToList();

            if (data.Any())
            {
                dbContext.Countries.RemoveRange(data);
            }
        }

        private static void AddData(List<Country> countries, CoffeeHouseDbContext dbContext)
        {
            var data = countries.Where(x => !dbContext.Countries.Contains(x));
            if (data.Any())
            {
                dbContext.Countries.AddRange(data);
            }
        }
    }
}
