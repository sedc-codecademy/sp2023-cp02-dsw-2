using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class Discount : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int DiscountPercent { get; set; }
        public List<Product> DiscountProducts { get; set; } = new List<Product>();
    }
}
