﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs
{
    public class ForgotPasswordModel
    {
        [EmailAddress]
        public string Email { get; set; }
    }
}
