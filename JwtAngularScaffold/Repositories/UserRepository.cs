using System;
using System.Collections.Generic;
using System.Linq;
using JwtAngularScaffold.Contracts;
using JwtAngularScaffold.Helpers;
using JwtAngularScaffold.Models;
using JwtAngularScaffold.Models.Entities;
using LoginModel = JwtAngularScaffold.Identity.LoginModel;

namespace JwtAngularScaffold.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User Authenticate(LoginModel model)
        {
            if (string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password)) return null;

            var userEntity = _context.Users.SingleOrDefault(c =>
                (c.UserName == model.UserName || c.Email == model.Email) && c.Password == model.Password);

            // check if username exists
            if (userEntity == null) return null;

            // check if password is correct
            return !VerifyPasswordHash(model.Password, userEntity.PasswordHash, userEntity.PasswordSalt) ? null : userEntity;

            // authentication successful
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.UserName == user.UserName))
                throw new AppException("Username \"" + user.UserName + "\" is already taken");

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChangesAsync();

            return user;
        }

        public void Update(User user, string password = null)
        {
            var userEntity = _context.Users.Find(user.Id);

            if (userEntity == null)
                throw new AppException("User not found");

            if (user.UserName != userEntity.UserName)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(u => u.UserName == user.UserName)) throw new AppException("Username " + user.UserName + " is already taken");
            }

            // update User properties here
            userEntity.FirstName = user.FirstName;
            userEntity.LastName = user.LastName;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                userEntity.PasswordHash = passwordHash;
                userEntity.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(userEntity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return;
            _context.Users.Remove(user);
            _context.SaveChangesAsync();
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", nameof(storedSalt));

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                if (computedHash.Where((t, i) => t != storedHash[i]).Any()) return false;
            }

            return true;
        }
    }
}