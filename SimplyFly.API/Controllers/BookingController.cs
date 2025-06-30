using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFly.API.DTOs;
using SimplyFly.API.Services;
using SimplyFly.API.Interfaces;

namespace SimplyFly.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost("flight-booking")]
        public async Task<IActionResult> BookFlight([FromBody] BookingDto dto)
        {
            try
            {
                var result = await _bookingService.BookWithFlightInfoAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Passenger")]
        [HttpGet("my")]
        public async Task<IActionResult> MyBookings()
        {
            var bookings = await _bookingService.GetMyBookingsAsync(User);
            return Ok(bookings);
        }

        [Authorize(Roles = "Passenger")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            try
            {
                var result = await _bookingService.CancelBookingAsync(id, User);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpPost("search")]
        public async Task<IActionResult> SearchFlights([FromBody] FlightSearchDto dto)
        {
            try
            {
                var results = await _bookingService.SearchFlightsAsync(dto);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
