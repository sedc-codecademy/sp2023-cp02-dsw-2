using CoffeeHouse_App.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs.ProductDtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public CategoryDto Category { get; set; }
        public double Price { get; set; }
        public int Weight { get; set; }
        public int Stock { get; set; }
        public DiscountDto? Discount { get; set; }
        public PhotoDto Photo { get; set; }
        public List<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();
    }
}
