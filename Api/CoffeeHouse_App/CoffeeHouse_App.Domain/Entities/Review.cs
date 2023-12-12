using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Domain.Entities
{
    public class Review : BaseEntity
    {
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
