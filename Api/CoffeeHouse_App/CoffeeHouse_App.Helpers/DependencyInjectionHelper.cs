using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoffeeHouse_App.DataAccess;
using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.DataAccess.Repositories.Implementations;
using CoffeeHouse_App.Services.Abstractions;
using CoffeeHouse_App.Services.Implmentations;

namespace CoffeeHouse_App.Helpers
{
    public static class DependencyInjectionHelper
    {
        public static void InjectDbContext (IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CoffeeHouseDbContext>(x=>x.UseSqlServer(connectionString));
        }

        public static void InjectRepositories (IServiceCollection services)
        {
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IPhotoRepository, PhotoRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IDiscountRepository, DiscountRepository>();
            services.AddTransient<ICartRepository,CartRepository>();
        }

        public static void InjectServices (IServiceCollection services)
        {
            services.AddTransient<IProductService, ProductService>();
        }
    }
}
