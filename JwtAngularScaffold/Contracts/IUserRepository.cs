using System.Collections.Generic;
using JwtAngularScaffold.Identity;
using JwtAngularScaffold.Models.Entities;

namespace JwtAngularScaffold.Contracts
{
    public interface IUserRepository
    {
        User Authenticate(LoginModel model);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}