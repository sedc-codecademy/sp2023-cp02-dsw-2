using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.Repositories.Abstractions
{
    public interface IOrderRepository:IBaseRepository<OrderDetails>
    {
    }
}
