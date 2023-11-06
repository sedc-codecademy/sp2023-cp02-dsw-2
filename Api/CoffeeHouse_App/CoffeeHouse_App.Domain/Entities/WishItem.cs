using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class WishItem : BaseEntity
    {
        public User User { get; set; }
        public string UserId { get; set; } = string.Empty;
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}
