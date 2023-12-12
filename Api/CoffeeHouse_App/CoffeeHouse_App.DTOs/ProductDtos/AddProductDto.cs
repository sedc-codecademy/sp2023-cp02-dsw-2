﻿using CoffeeHouse_App.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs.ProductDtos
{
    public class AddProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public int Weight { get; set; }
        public int Stock { get; set; }
        public int? DiscountId { get; set; }
        public string? ImageDescription { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
