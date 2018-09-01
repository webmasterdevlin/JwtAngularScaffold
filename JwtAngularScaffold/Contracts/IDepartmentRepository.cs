using System.Collections.Generic;
using System.Threading.Tasks;
using JwtAngularScaffold.Models.Entities;

namespace JwtAngularScaffold.Contracts
{
    public interface IDepartmentRepository
    {
        bool Exists(int id);
        IEnumerable<Department> GetAll();
        Department GetById(int id);
        Task<Department> CreateAsync(Department department);
        Task<Department> UpdateAsync(Department department);
        Task DeleteAsync(int id);
    }
}