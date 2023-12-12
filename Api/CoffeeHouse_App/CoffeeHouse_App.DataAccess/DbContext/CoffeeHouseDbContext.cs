using CoffeeHouse_App.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CoffeeHouse_App.DataAccess.DbContext
{
    public class CoffeeHouseDbContext : IdentityDbContext<User, Role, string, IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public CoffeeHouseDbContext(DbContextOptions<CoffeeHouseDbContext> options) : base(options)
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
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }


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

            builder.Entity<User>(user =>
            {
                user.HasIndex(u => u.Email).IsUnique();
                user.HasMany(u => u.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
                user.Property(c => c.PhotoId).IsRequired(false);
            });

            builder.Entity<Role>(role =>
            {
                role.HasMany(ur => ur.UserRoles).WithOne(r => r.Role).HasForeignKey(x => x.RoleId).IsRequired();
            });

            builder.Entity<Address>(address =>
            {
                address.HasOne(a => a.Country)
                .WithMany()
                .HasForeignKey(a => a.CountryId).IsRequired(false);
                address.Property(a => a.IsDeleted).HasDefaultValue(false);
                address.HasQueryFilter(a => !a.IsDeleted);
            });

            builder.Entity<UserAddress>(userAddress =>
            {
                userAddress.HasOne(ua => ua.User).WithMany(u => u.UserAddresses).HasForeignKey(x => x.UserId);
                userAddress.HasOne(ua => ua.Address).WithMany(u => u.UserAddresses).HasForeignKey(x => x.AddressId);
                userAddress.Property(ua => ua.IsDeleted).HasDefaultValue(false);
                userAddress.HasQueryFilter(a => !a.IsDeleted);
            });

            builder.Entity<Country>(country =>
            {
                country.Property(c => c.CountryName).IsRequired();
                country.Property(c => c.IsDeleted).HasDefaultValue(false);
                country.HasQueryFilter(c => !c.IsDeleted);
            });
        }
    }
}
