using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyFly.API.Data;
using SimplyFly.API.DTOs;
using SimplyFly.API.Helpers;
using SimplyFly.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace SimplyFly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthController(ApplicationDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto dto)
        {
            try
            {
                if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                    return BadRequest("Email already registered.");

                string passwordHash = dto.Password;

                var user = new User
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    PasswordHash = passwordHash,
                    ContactNumber = dto.ContactNumber,
                    Gender = dto.Gender,
                    Address = dto.Address,
                    RoleId = dto.RoleId
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok("User registered successfully.");
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { message = "Database error during registration.", error = dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            try
            {
                var passwordHash = dto.Password;

                var user = await _context.Users.Include(u => u.Role)
                            .FirstOrDefaultAsync(u => u.Email == dto.Email && u.PasswordHash == passwordHash);

                if (user == null)
                    return Unauthorized("Invalid credentials.");

                var token = _jwtHelper.GenerateToken(user);

                return Ok(new
                {
                    token,
                    fullName = user.FullName,
                    email = user.Email,
                    role = user.Role?.RoleName
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Login failed due to an error.", error = ex.Message });
            }
        }
    }
}
