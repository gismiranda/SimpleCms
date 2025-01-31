using CmsAPI.Data;
using CmsAPI.Models;
using CmsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace CmsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService _userService;
        private readonly ILogger<PostController> _logger;

        public UserController(UserService userService, ILogger<PostController> logger)
        {
            _userService = userService;
            _logger = logger;
        }
        
        [HttpPost]
        public async Task<IActionResult> Register(User user)
        {
            if (user == null)
            {
                return BadRequest(new { success = false, message = "User cannot be null" });
            }

            try
            {
                await using var transaction = await _userService.BeginTransactionAsync();
                var newUser = await _userService.RegisterUser(user);
                await transaction.CommitAsync();
                return Ok(new { success = true, message = "User registered successfully", userId = newUser.id });
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "Error occurred while registering the user");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            try
            {
                var user = await _userService.AuthenticateUser(email, password);
                if (user == null)
                {
                    return Unauthorized(new { success = false, message = "Invalid email or password" });
                }

                // Set a session or cookie here if needed
                return Ok(new { success = true, message = "Login successful", userId = user.id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while login");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _userService.Logout();
            return NoContent();
        }
    }
}
