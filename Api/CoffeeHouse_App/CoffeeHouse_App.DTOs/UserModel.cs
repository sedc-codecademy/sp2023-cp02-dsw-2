using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs
{
    public class UserModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime? Birthdate { get; set; }
        public AddressModel Address { get; set; }

        public string ProfileImage { get; set; }
    }
}
