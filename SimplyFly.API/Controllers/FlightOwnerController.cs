using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFly.API.DTOs;
using SimplyFly.API.Interfaces;
using SimplyFly.API.Services;

namespace SimplyFly.API.Controllers
{
    [Authorize(Roles = "FlightOwner")]
    [ApiController]
    [Route("api/[controller]")]
    public class FlightOwnerController : ControllerBase
    {
        private readonly IFlightOwnerService _service;

        public FlightOwnerController(IFlightOwnerService service)
        {
            _service = service;
        }

        [HttpGet("flights")]
        public async Task<IActionResult> GetFlights()
        {
            return Ok(await _service.GetAllFlightsAsync());
        }

        [HttpPost("flights")]
        public async Task<IActionResult> AddFlight([FromBody] FlightDto dto)
        {
            try
            {
                var result = await _service.AddFlightAsync(dto);
                return Ok(result);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPost("schedules")]
        public async Task<IActionResult> AddSchedule([FromBody] ScheduleDto dto)
        {
            try
            {
                var result = await _service.AddScheduleAsync(dto);
                return Ok(result);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpGet("schedules/{flightId}")]
        public async Task<IActionResult> GetSchedules(int flightId)
        {
            return Ok(await _service.GetSchedulesAsync(flightId));
        }

        [HttpGet("bookings/{flightId}")]
        public async Task<IActionResult> GetBookings(int flightId)
        {
            try
            {
                var bookings = await _service.GetBookingsByFlightAsync(flightId);
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("bookings/cancelled/{flightId}")]
        public async Task<IActionResult> GetCancelledBookings(int flightId)
        {
            try
            {
                var result = await _service.GetCancelledBookingsAsync(flightId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost("bookings/refund/{bookingId}")]
        //public async Task<IActionResult> ApproveRefund(int bookingId)
        //{
        //    try
        //    {
        //        var message = await _service.ApproveRefundAsync(bookingId);
        //        return Ok(message);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [Authorize(Roles = "FlightOwner")]
        [HttpDelete("flights/{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            try
            {
                var result = await _service.DeleteFlightAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "FlightOwner")]
        [HttpPut("flights/{id}")]
        public async Task<IActionResult> UpdateFlight(int id, [FromBody] FlightDto dto)
        {
            try
            {
                var result = await _service.UpdateFlightAsync(id, dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
