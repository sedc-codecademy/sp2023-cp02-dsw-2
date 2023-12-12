using Microsoft.AspNetCore.Identity;

namespace CoffeeHouse_App.Domain.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<OrderDetails> Orders { get; set; } = new List<OrderDetails>();
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
        public List<WishItem> WishItems { get; set; } = new List<WishItem>();
        public bool FirstLogin { get; set; }
        public DateTime? Birthdate { get; set; }
        public int? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<UserAddress> UserAddresses { get; set; }
    }
}
