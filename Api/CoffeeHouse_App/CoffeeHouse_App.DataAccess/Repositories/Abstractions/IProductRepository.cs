﻿using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Abstractions
{
    public interface IProductRepository :IBaseRepository<Product>
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
    }
}
