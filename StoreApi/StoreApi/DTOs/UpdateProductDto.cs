﻿using System.ComponentModel.DataAnnotations;

namespace StoreApi.DTOs
{
    public class UpdateProductDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(100, double.PositiveInfinity)]
        public long Price { get; set; }
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        [Range(0, double.PositiveInfinity)]
        public int StockInQuantity { get; set; }
    }
}
