﻿using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.DataAccess.Repositories.Implementations;
using CoffeeHouse_App.Services.Abstraction;
using CoffeeHouse_App.Services.Implementation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
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
            services.AddTransient<IWishlistRepository, WishlistRepository>();
			services.AddTransient<IUserAddressRepository, UserAddressRepository>();
        }

        public static void InjectServices (IServiceCollection services)
        {
            services.AddTransient<IProductService, ProductService>();
 			services.AddTransient<IAddressService, AddressService>();
        }
    }
}
