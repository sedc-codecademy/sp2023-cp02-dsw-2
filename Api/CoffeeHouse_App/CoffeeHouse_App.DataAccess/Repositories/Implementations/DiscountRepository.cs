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
    public class DiscountRepository : BaseRepository<Discount>, IDiscountRepository
    {
        private readonly CoffeeHouseDbContext _context;
        public DiscountRepository(CoffeeHouseDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
