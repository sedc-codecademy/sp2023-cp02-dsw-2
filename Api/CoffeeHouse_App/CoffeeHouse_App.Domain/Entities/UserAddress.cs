using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class UserAddress : BaseEntity
    {
        public string UserId { get; set; }
        public int AddressId { get; set; }
        public virtual User User { get; set; }
        public virtual Address Address { get; set; }
    }
}
