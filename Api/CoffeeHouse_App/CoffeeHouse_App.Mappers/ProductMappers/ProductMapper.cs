using CoffeeHouse_App.Domain.Entities;
using CoffeeHouse_App.DTOs.ProductDtos;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.Mappers.ProductMappers
{
    public static class ProductMapper
    {
       public static ProductDto ToProductDto (this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Weight = product.Weight,
                Price = product.Price,
                Stock = product.Stock,
                Category = new CategoryDto
                {
                    Id = product.Category.Id,
                    Name = product.Category.Name,
                },
                
                Discount = product.Discount != null ? new DiscountDto
                {
                    Id = product.Discount.Id,
                    Name = product.Discount.Name,
                    DiscountPercent = product.Discount.DiscountPercent,
                    Description= product.Discount.Description !=null? product.Discount.Description : null,
                }: null,
                Photo = new PhotoDto
                {
                    Id = product.Photo.Id,
                    Description = product.Photo.Description != null? product.Photo.Description : null,
                    ImageBase64 = Convert.ToBase64String(product.Photo.Bytes)

                },
                Reviews = product.Reviews !=null? product.Reviews.Select(x=>x.ToReviewDto()).ToList() : new List<ReviewDto>() 
                
            };
        }


        public static ReviewDto ToReviewDto (this Review review)
        {
            return new ReviewDto
            {
                Id = review.Id,
                Name = review.Name,
                Email = review.Email,
                Rating = review.Rating,
                Text = review.Text
            };
        }
    }
}


