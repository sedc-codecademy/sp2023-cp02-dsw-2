using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class User : IdentityUser
    {
        public List<OrderDetails> Orders { get; set; } = new List<OrderDetails>();
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
        public List<WishItem> WishItems { get; set; } = new List<WishItem>();
        public bool FirstLogin { get; set; }
    }
}
