using CmsAPI.Data;
using CmsAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace CmsAPI.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(ApplicationDbContext context, IPasswordHasher<User> passwordHasher, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<User> RegisterUser(User user)
        {
            if (string.IsNullOrWhiteSpace(user.password))
                throw new ArgumentException("Password cannot be empty");

            if (await _context.users.AnyAsync(u => u.email == user.email))
                throw new ArgumentException("Email is already taken");

            user.password_hash = _passwordHasher.HashPassword(user, user.password);
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> AuthenticateUser(string email, string password)
        {
            var user = await _context.users.SingleOrDefaultAsync(u => u.email == email);
            if (user == null)
            {
                return null;
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.password_hash, password);
            return result == PasswordVerificationResult.Success ? user : null;
        }

        public void Logout()
        {
            var context = _httpContextAccessor.HttpContext;
            context.Response.Cookies.Delete("AuthToken");
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _context.Database.BeginTransactionAsync();
        }
    }
}
