﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeHouse_App.Domain.Entities
{
    public class Photo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public byte[] Bytes { get; set; } = new byte[0];
        public string? Description { get; set; } 
        public string FileExtension { get; set; } = string.Empty;
        public double Size { get; set; }
    }
}
