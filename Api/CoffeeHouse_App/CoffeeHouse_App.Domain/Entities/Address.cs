using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class Address : BaseEntity
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Zip { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<UserAddress> UserAddresses { get; set; }
    }
}
