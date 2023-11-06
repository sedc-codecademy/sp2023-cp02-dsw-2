using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoffeeHouse_App.DataAccess;
using CoffeeHouse_App.DataAccess.DbContext;

namespace CoffeeHouse_App.Helpers
{
    public static class DependencyInjectionHelper
    {
        public static void InjectDbContext (IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CoffeeHouseDbContext>(x=>x.UseSqlServer(connectionString));
        }
    }
}
