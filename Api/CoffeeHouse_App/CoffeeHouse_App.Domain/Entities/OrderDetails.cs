using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class OrderDetails : BaseEntity
    {
        public User User { get; set; }
        public string UserId { get; set; } = string.Empty;
        public double TotalPrice { get; set; }
        public PaymentDetails PaymentDetails { get; set; }
        public int PaymentDetailsId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public int OrderStatusId { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
