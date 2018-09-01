using System.Collections.Generic;
using System.Threading.Tasks;
using JwtAngularScaffold.Identity;
using JwtAngularScaffold.Models.Entities;

namespace JwtAngularScaffold.Contracts
{
    public interface IUserRepository
    {
        User Authenticate(LoginModel model);
        IEnumerable<User> GetAll();
        User GetById(int id);
        Task<User> CreateAsync(User user, string password);
        Task<User> UpdateAsync(User user, string password = null);
        Task DeleteAsync(int id);
    }
}