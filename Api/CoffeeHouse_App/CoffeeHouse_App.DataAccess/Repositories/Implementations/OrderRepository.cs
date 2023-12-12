using CoffeeHouse_App.DataAccess.DbContext;
using CoffeeHouse_App.DataAccess.Repositories.Abstractions;
using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Implementations
{
    public class OrderRepository : BaseRepository<OrderDetails>, IOrderRepository
    {
        private readonly CoffeeHouseDbContext _coffeeHouseDbContext;

        public OrderRepository(CoffeeHouseDbContext coffeeHouseDbContext) : base(coffeeHouseDbContext)
        {
            _coffeeHouseDbContext = coffeeHouseDbContext;
        }





    }
}
