using JwtAngularScaffold.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace JwtAngularScaffold.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(d => d.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(d => d.Description)
                    .IsRequired()
                    .HasMaxLength(140)
                    .IsUnicode(false);

                entity.Property(d => d.Head)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
                
                entity.Property(d => d.Code)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });
            
            base.OnModelCreating(modelBuilder);
        }
    }
}