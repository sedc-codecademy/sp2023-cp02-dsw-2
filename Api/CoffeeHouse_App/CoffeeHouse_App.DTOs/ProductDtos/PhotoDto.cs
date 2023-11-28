using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DTOs.ProductDtos
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string ImageBase64 { get; set; }
    }
}
