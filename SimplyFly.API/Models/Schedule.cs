using System.ComponentModel.DataAnnotations;
namespace SimplyFly.API.Models
{
    public class Schedule
    {
        public int ScheduleId { get; set; }
        [Required]
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
        [Required]
        public DateTime DepartureTime { get; set; }
        [Required]
        public DateTime ArrivalTime { get; set; }

        [Range(0, int.MaxValue)]
        public int AvailableSeats { get; set; }

        public ICollection<Booking> Bookings { get; set; }
    }
}
