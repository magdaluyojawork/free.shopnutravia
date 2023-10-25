using shopnutravia.Models;
using Microsoft.EntityFrameworkCore;

namespace shopnutravia.Models
{
    public class ShopnutraviaDBContext : DbContext
    {
        public ShopnutraviaDBContext(DbContextOptions<ShopnutraviaDBContext> options)
            : base(options)
        {
        }
        public DbSet<GiftCode> GiftCodes { get; set; }
        public DbSet<GiftCodeClaim> GiftCodeClaims { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GiftCode>().ToTable("GiftCodes");
            modelBuilder.Entity<GiftCodeClaim>().ToTable("GiftCodeClaims");
        }
    }
}
