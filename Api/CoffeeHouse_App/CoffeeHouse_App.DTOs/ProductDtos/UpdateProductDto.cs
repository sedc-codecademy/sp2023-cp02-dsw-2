using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs.ProductDtos
{
    public class UpdateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public int Weight { get; set; }
        public int Stock { get; set; }
        public int? DiscountId { get; set; }
        public int PhotoId { get; set; }
    }
}
