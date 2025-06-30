using Microsoft.EntityFrameworkCore;
using SimplyFly.API.Data;
using SimplyFly.API.DTOs;
using SimplyFly.API.Interfaces;

namespace SimplyFly.API.Services
{
    public class FlightOwnerService : IFlightOwnerService
    {
        private readonly ApplicationDbContext _context;

        public FlightOwnerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetAllFlightsAsync()
        {
            var flights = await _context.Flights.ToListAsync();
            return flights.Select(f => new
            {
                f.FlightId,
                f.FlightName,
                f.FlightNumber,
                f.Origin,
                f.Destination,
                f.Fare,
                f.TotalSeats
            });
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
                Fare = dto.Fare,

            };

            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return new { flight.FlightId, Message = "Flight added successfully." };
        }

        public async Task<object> AddScheduleAsync(ScheduleDto dto)
        {
            var flight = await _context.Flights.FindAsync(dto.FlightId);
            if (flight == null)
                throw new Exception("Flight not found.");

            var schedule = new Models.Schedule
            {
                FlightId = dto.FlightId,
                DepartureTime = dto.DepartureTime,
                ArrivalTime = dto.ArrivalTime,
                AvailableSeats = flight.TotalSeats
            };

            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();

            return new { schedule.ScheduleId, Message = "Schedule added successfully." };
        }

        public async Task<IEnumerable<object>> GetSchedulesAsync(int flightId)
        {
            var schedules = await _context.Schedules
                .Where(s => s.FlightId == flightId)
                .ToListAsync();

            return schedules.Select(s => new
            {
                s.ScheduleId,
                s.DepartureTime,
                s.ArrivalTime,
                s.AvailableSeats
            });
        }
        public async Task<IEnumerable<object>> GetBookingsByFlightAsync(int flightId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Schedule)
                .ThenInclude(s => s.Flight)
                .Include(b => b.BookingDetails)
                .Include(b => b.Payment)
                .Where(b => b.Schedule.FlightId == flightId)
                .ToListAsync();

            return bookings.Select(b => new
            {
                b.BookingId,
                b.BookingDate,
                b.TotalAmount,
                b.Status,
                Passenger = b.User.FullName,
                Email = b.User.Email,
                Schedule = new
                {
                    b.Schedule.DepartureTime,
                    b.Schedule.ArrivalTime
                },
                Seats = b.BookingDetails.Select(d => d.SeatNumber),
                Payment = new
                {
                    b.Payment.PaymentStatus,
                    b.Payment.AmountPaid,
                    b.Payment.PaymentDate
                }
            });
        }
        public async Task<IEnumerable<object>> GetCancelledBookingsAsync(int flightId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Schedule).ThenInclude(s => s.Flight)
                .Include(b => b.Payment)
                .Include(b => b.BookingDetails)
                .Where(b => b.Status == "Cancelled" && b.Schedule.FlightId == flightId)
                .ToListAsync();

            return bookings.Select(b => new
            {
                b.BookingId,
                b.BookingDate,
                Passenger = b.User.FullName,
                b.TotalAmount,
                PaymentStatus = b.Payment.PaymentStatus,
                Departure = b.Schedule.DepartureTime,
                b.Schedule.Flight.FlightName,
                Seats = b.BookingDetails.Select(d => d.SeatNumber)
            });
        }

        public async Task<string> ApproveRefundAsync(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.Payment)
                .FirstOrDefaultAsync(b => b.BookingId == bookingId);

            if (booking == null)
                throw new Exception("Booking not found.");

            if (booking.Status != "Cancelled")
                throw new Exception("Only cancelled bookings can be refunded.");

            if (booking.Payment.PaymentStatus == "Refunded")
                throw new Exception("Already refunded.");

            booking.Payment.PaymentStatus = "Refunded";
            await _context.SaveChangesAsync();

            return "Refund approved successfully.";
        }

        public async Task<string> DeleteFlightAsync(int flightId)
        {
            var flight = await _context.Flights.FindAsync(flightId);
            if (flight == null)
                throw new Exception("Flight not found.");

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return "Flight deleted successfully.";
        }

        public async Task<string> UpdateFlightAsync(int flightId, FlightDto updatedDto)
        {
            var flight = await _context.Flights.FindAsync(flightId);
            if (flight == null)
                throw new Exception("Flight not found.");

            flight.FlightName = updatedDto.FlightName;
            flight.FlightNumber = updatedDto.FlightNumber;
            flight.Origin = updatedDto.Origin;
            flight.Destination = updatedDto.Destination;
            flight.Fare = updatedDto.Fare;
            flight.TotalSeats = updatedDto.TotalSeats;
            flight.BaggageCabinKg = updatedDto.BaggageCabinKg;
            flight.BaggageCheckInKg = updatedDto.BaggageCheckInKg;

            await _context.SaveChangesAsync();
            return "Flight updated successfully.";
        }


    }
}
