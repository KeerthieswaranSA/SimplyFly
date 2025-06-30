using System.Security.Claims;
using SimplyFly.API.DTOs;

namespace SimplyFly.API.Services
{
    public interface IBookingService
    {
        Task<object> BookWithFlightInfoAsync(BookingDto dto);
        Task<IEnumerable<object>> GetMyBookingsAsync(ClaimsPrincipal user);
        Task<string> CancelBookingAsync(int bookingId, ClaimsPrincipal user);
        Task<IEnumerable<object>> SearchFlightsAsync(FlightSearchDto dto);
    }
}
