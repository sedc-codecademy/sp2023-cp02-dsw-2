using CoffeeHouse_App.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoffeeHouse_App.DataAccess.DbContext
{
    public class CoffeeHouseDbContext :IdentityDbContext<User>
    {
        public CoffeeHouseDbContext(DbContextOptions options) : base(options) 
        {
            
        }

        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<OrderDetails> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<PaymentCard> PaymentCards { get; set; }
        public DbSet<PaymentDetails> Payments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<WishItem> WishItems { get; set; }
        public DbSet<Photo> Photos { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //CartItem
            builder.Entity<CartItem>()
                .HasOne(x => x.User)
                .WithMany(x => x.CartItems)
                .HasForeignKey(x => x.UserId);

            builder.Entity<CartItem>()
                .HasOne(x => x.Product)
                .WithMany(x => x.CartItems)
                .HasForeignKey(x => x.ProductId);

            //Product
            builder.Entity<Product>()
                .HasOne(x => x.Discount)
                .WithMany(x => x.DiscountProducts)
                .HasForeignKey(x => x.DiscountId);

            builder.Entity<Product>()
                .HasOne(x => x.Category)
                .WithMany(x => x.CategoryProducts)
                .HasForeignKey(x => x.CategoryId);

            builder.Entity<Product>()
                .HasMany(x => x.Reviews)
                .WithOne(x => x.Product)
                .HasForeignKey(x => x.ProductId);

            builder.Entity<Product>()
                .HasMany(x => x.OrderItems)
                .WithOne(x => x.Product)
                .HasForeignKey(x => x.ProductId);


            //OrderDetails
            builder.Entity<OrderDetails>()
                .HasMany(x => x.OrderItems)
                .WithOne(x => x.OrderDetails)
                .HasForeignKey(x => x.OrderDetailsId);

            builder.Entity<OrderDetails>()
                .HasOne(x => x.OrderStatus)
                .WithMany(x => x.OrderDetails)
                .HasForeignKey(x => x.OrderStatusId);

            builder.Entity<OrderDetails>()
                .HasOne(x => x.User)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.UserId);

            //PaymentCard
            builder.Entity<PaymentCard>()
                 .HasMany(x => x.Payments)
                 .WithOne(x => x.PaymentCard)
                 .HasForeignKey(x => x.PaymentCardId);

            //wishItem
            builder.Entity<WishItem>()
                .HasOne(x => x.User)
                .WithMany(x => x.WishItems)
                .HasForeignKey(x => x.UserId);

            builder.Entity<WishItem>()
                .HasOne(x => x.Product)
                .WithMany(x => x.WishItems)
                .HasForeignKey(x => x.ProductId);


            //Seeding data
            builder.Entity<Category>()
                .HasData(new Category
                    {
                        Id = 1,
                        Name = "Kafe vo zrno",
                        CreatedAt = DateTime.Now,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Meleno kafe",
                        CreatedAt = DateTime.Now,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 3,
                        Name = "Kafe kapsuli",
                        CreatedAt = DateTime.Now,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 4,
                        Name = "Kafemat",
                        CreatedAt = DateTime.Now,
                        IsDeleted = false
                    }
                );
            builder.Entity<Discount>()
                .HasData(new Discount
                {
                    Id = 1,
                    Name = "Black Friday",
                    DiscountPercent = 15,
                    Description = "Black Friday Discount",
                    CreatedAt = DateTime.Now

                },
                new Discount
                {
                    Id = 2,
                    Name = "Easter Discount",
                    DiscountPercent = 10,
                    Description = "Easter Holiday Discount",
                    CreatedAt = DateTime.Now
                }
                );


        }
    }
}
