﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs
{
    public class UserProfileUpdateModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime? Birthdate { get; set; }
        public string PhoneNumber { get; set; }

        public AddressModel Address { get; set; }
    }
}
