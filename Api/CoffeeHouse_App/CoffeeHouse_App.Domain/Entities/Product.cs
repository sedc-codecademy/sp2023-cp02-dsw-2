using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public int Weight { get; set; }
        public  int Stock { get; set; }
        public Discount? Discount { get; set; }
        public int? DiscountId { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<WishItem> WishItems { get; set; } = new List<WishItem>();
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();

    }
}
