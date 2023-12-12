using System;
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
        [Required]
        public string Password { get; set; } = null!;
        [Compare("Password", ErrorMessage = "The password and confirmation password does not match.")]
        public string ConfirmPassword { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
