using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public OrderDetails OrderDetails { get; set; }
        public int OrderDetailsId { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
