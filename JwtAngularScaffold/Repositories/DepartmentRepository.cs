using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JwtAngularScaffold.Contracts;
using JwtAngularScaffold.Models;
using JwtAngularScaffold.Models.Entities;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore.Storage.Internal;

namespace JwtAngularScaffold.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool Exists(int id)
        {
            return _context.Departments.Any(d => d.Id == id);
        }

        public IEnumerable<Department> GetAll()
        {
            return _context.Departments;
        }

        public Department GetById(int id)
        {
            return _context.Departments.Find(id);
        }

        public async Task<Department> CreateAsync(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task<Department> UpdateAsync(Department department)
        {
            _context.Update(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task DeleteAsync(int id)
        {
            _context.Remove(_context.Departments.Find(id));
            await _context.SaveChangesAsync();
        }
    }
}