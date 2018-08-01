using JwtAngularScaffold.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace JwtAngularScaffold.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
    }
}