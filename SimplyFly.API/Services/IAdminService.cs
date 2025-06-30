using SimplyFly.API.DTOs;

namespace SimplyFly.API.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<object>> GetAllUsersAsync();
        Task<string> DeleteUserAsync(int userId);
        Task<IEnumerable<object>> GetAllFlightOwnersAsync();
        Task<string> DeleteFlightOwnerAsync(int ownerId);
        Task<IEnumerable<object>> GetAllBookingsAsync();
        Task<IEnumerable<object>> GetAllFlightsAsync();
        Task<object> AddFlightAsync(FlightDto dto);
        Task<string> DeleteFlightAsync(int flightId);
    }
}
