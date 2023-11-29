using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class Country : BaseEntity
    {
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
    }
}
