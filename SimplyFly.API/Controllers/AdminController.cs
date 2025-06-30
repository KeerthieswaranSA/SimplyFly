using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFly.API.DTOs;
using SimplyFly.API.Interfaces;

namespace SimplyFly.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _service;
        public AdminController(IAdminService service)
        {
            _service = service;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers() => Ok(await _service.GetAllUsersAsync());

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                return Ok(await _service.DeleteUserAsync(id));
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpGet("owners")]
        public async Task<IActionResult> GetFlightOwners() => Ok(await _service.GetAllFlightOwnersAsync());

        [HttpDelete("owners/{id}")]
        public async Task<IActionResult> DeleteOwner(int id)
        {
            try
            {
                return Ok(await _service.DeleteFlightOwnerAsync(id));
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> GetBookings() => Ok(await _service.GetAllBookingsAsync());

        [HttpGet("flights")]
        public async Task<IActionResult> GetFlights() => Ok(await _service.GetAllFlightsAsync());

        [HttpPost("flights")]
        public async Task<IActionResult> AddFlight([FromBody] FlightDto dto)
        {
            try
            {
                var result = await _service.AddFlightAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("flights/{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            try
            {
                return Ok(await _service.DeleteFlightAsync(id));
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
