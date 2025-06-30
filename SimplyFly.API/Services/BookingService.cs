using Microsoft.EntityFrameworkCore;
using SimplyFly.API.Data;
using SimplyFly.API.DTOs;
using SimplyFly.API.Models;
using System.Security.Claims;

namespace SimplyFly.API.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<object> BookWithFlightInfoAsync(BookingDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Email == dto.Username || u.FullName == dto.Username);

            if (user == null) throw new Exception("User not found.");

            var schedule = await _context.Schedules
                .Include(s => s.Flight)
                .FirstOrDefaultAsync(s =>
                    s.FlightId == dto.FlightId &&
                    s.DepartureTime.Date == dto.TravelDate.Date);

            if (schedule == null)
                throw new Exception("No matching schedule found.");

            if (dto.NumberOfSeats > schedule.AvailableSeats)
                throw new Exception("Not enough seats.");

            var fare = schedule.Flight.Fare;
            var totalAmount = fare * dto.NumberOfSeats;

            var booking = new Booking
            {
                UserId = user.UserId,
                ScheduleId = schedule.ScheduleId,
                BookingDate = DateTime.Now,
                TotalAmount = totalAmount,
                Status = "Booked"
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            var assignedSeats = dto.PreferredSeats ?? Enumerable.Range(1, dto.NumberOfSeats)
                .Select(i => $"S{i}").ToList();

            foreach (var seat in assignedSeats)
            {
                _context.BookingDetails.Add(new BookingDetail
                {
                    BookingId = booking.BookingId,
                    SeatNumber = seat,
                    Fare = fare
                });
            }

            schedule.AvailableSeats -= dto.NumberOfSeats;

            _context.Payments.Add(new Payment
            {
                BookingId = booking.BookingId,
                PaymentDate = DateTime.Now,
                AmountPaid = totalAmount,
                PaymentStatus = dto.PaymentStatus
            });

            await _context.SaveChangesAsync();

            return new
            {
                booking.BookingId,
                schedule.Flight.FlightName,
                schedule.Flight.Origin,
                schedule.Flight.Destination,
                TravelDate = schedule.DepartureTime,
                Seats = assignedSeats,
                Payment = dto.PaymentStatus,
                Amount = totalAmount,
                Message = "Booking successful"
            };
        }

        public async Task<IEnumerable<object>> GetMyBookingsAsync(ClaimsPrincipal user)
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));

            var bookings = await _context.Bookings
                .Include(b => b.Schedule).ThenInclude(s => s.Flight)
                .Include(b => b.BookingDetails)
                .Include(b => b.Payment)
                .Where(b => b.UserId == userId)
                .ToListAsync();

            return bookings.Select(b => new
            {
                b.BookingId,
                b.BookingDate,
                b.Status,
                b.TotalAmount,
                b.Payment.PaymentStatus,
                Flight = b.Schedule.Flight.FlightName,
                b.Schedule.Flight.Origin,
                b.Schedule.Flight.Destination,
                b.Schedule.DepartureTime,
                Seats = b.BookingDetails.Select(d => d.SeatNumber)
            });
        }

        public async Task<string> CancelBookingAsync(int bookingId, ClaimsPrincipal user)
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));

            var booking = await _context.Bookings
                .Include(b => b.Schedule)
                .Include(b => b.BookingDetails)
                .Include(b => b.Payment)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId && b.UserId == userId);

            if (booking == null)
                throw new Exception("Booking not found.");

            if (booking.Status == "Cancelled")
                throw new Exception("Already cancelled.");

            booking.Status = "Cancelled";
            booking.Payment.PaymentStatus = "Refunded";
            booking.Schedule.AvailableSeats += booking.BookingDetails.Count;

            await _context.SaveChangesAsync();
            return "Booking cancelled and amount refunded.";
        }
        public async Task<IEnumerable<object>> SearchFlightsAsync(FlightSearchDto dto)
        {
            var schedules = await _context.Schedules
                .Include(s => s.Flight)
                .Where(s =>
                    s.Flight.Origin.ToLower() == dto.Origin.ToLower() &&
                    s.Flight.Destination.ToLower() == dto.Destination.ToLower() &&
                    s.DepartureTime.Date == dto.TravelDate.Date)
                .ToListAsync();

            if (!schedules.Any())
                throw new Exception("No matching flights found.");

            return schedules.Select(s => new
            {
                s.ScheduleId,
                s.DepartureTime,
                s.ArrivalTime,
                s.AvailableSeats,
                Flight = new
                {
                    s.Flight.FlightName,
                    s.Flight.FlightNumber,
                    s.Flight.Origin,
                    s.Flight.Destination,
                    s.Flight.Fare
                }
            });
        }

    }
}
