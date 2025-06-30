using SimplyFly.API.DTOs;

namespace SimplyFly.API.Interfaces
{
    public interface IFlightOwnerService
    {
        Task<IEnumerable<object>> GetAllFlightsAsync();
        Task<object> AddFlightAsync(FlightDto dto);
        Task<object> AddScheduleAsync(ScheduleDto dto);
        Task<IEnumerable<object>> GetSchedulesAsync(int flightId);
        Task<IEnumerable<object>> GetBookingsByFlightAsync(int flightId);
        Task<IEnumerable<object>> GetCancelledBookingsAsync(int flightId);
        Task<string> ApproveRefundAsync(int bookingId);
        Task<string> DeleteFlightAsync(int flightId);
        Task<string> UpdateFlightAsync(int flightId, FlightDto updatedDto);
    }
}
