using Microsoft.EntityFrameworkCore;
using SimplyFly.API.Data;
using SimplyFly.API.DTOs;
using SimplyFly.API.Interfaces;

namespace SimplyFly.API.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;
        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Where(u => u.Role.RoleName == "Passenger")
                .Select(u => new
                {
                    u.UserId,
                    u.FullName,
                    u.Email,
                    u.ContactNumber,
                    u.Gender
                }).ToListAsync();
        }

        public async Task<string> DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return "User deleted.";
        }

        public async Task<IEnumerable<object>> GetAllFlightOwnersAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Where(u => u.Role.RoleName == "FlightOwner")
                .Select(u => new
                {
                    u.UserId,
                    u.FullName,
                    u.Email,
                    u.ContactNumber
                }).ToListAsync();
        }

        public async Task<string> DeleteFlightOwnerAsync(int ownerId)
        {
            var owner = await _context.Users.FindAsync(ownerId);
            if (owner == null) throw new Exception("Flight owner not found.");

            _context.Users.Remove(owner);
            await _context.SaveChangesAsync();
            return "Flight owner deleted.";
        }

        public async Task<IEnumerable<object>> GetAllBookingsAsync()
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Schedule).ThenInclude(s => s.Flight)
                .Include(b => b.Payment)
                .Select(b => new
                {
                    b.BookingId,
                    b.Status,
                    b.BookingDate,
                    b.TotalAmount,
                    Passenger = b.User.FullName,
                    b.Payment.PaymentStatus,
                    Flight = b.Schedule.Flight.FlightName
                }).ToListAsync();
        }

        public async Task<IEnumerable<object>> GetAllFlightsAsync()
        {
            return await _context.Flights.Select(f => new
            {
                f.FlightId,
                f.FlightName,
                f.FlightNumber,
                f.Origin,
                f.Destination,
                f.Fare,
                f.TotalSeats
            }).ToListAsync();
        }

        public async Task<string> DeleteFlightAsync(int flightId)
        {
            var flight = await _context.Flights.FindAsync(flightId);
            if (flight == null) throw new Exception("Flight not found.");

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();
            return "Flight deleted.";
        }
        public async Task<object> AddFlightAsync(FlightDto dto)
        {
            var flight = new Models.Flight
            {
                FlightName = dto.FlightName,
                FlightNumber = dto.FlightNumber,
                BaggageCheckInKg = dto.BaggageCheckInKg,
                BaggageCabinKg = dto.BaggageCabinKg,
                TotalSeats = dto.TotalSeats,
                Origin = dto.Origin,
                Destination = dto.Destination,
                Fare = dto.Fare
            };

            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return new
            {
                flight.FlightId,
                Message = "Flight created successfully by admin."
            };
        }

    }
}
