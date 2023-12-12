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
    public class AddressRepository : BaseRepository<Address>, IAddressRepository
    {
        private readonly CoffeeHouseDbContext _coffeeHouseDbContext;

        public AddressRepository(CoffeeHouseDbContext coffeeHouseDbContext) : base(coffeeHouseDbContext)
        {
            _coffeeHouseDbContext = coffeeHouseDbContext;
        }
    }
}
