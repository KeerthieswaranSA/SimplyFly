using System.ComponentModel.DataAnnotations;
namespace SimplyFly.API.Models
{
    public class Flight
    {
        [Required]
        public int FlightId { get; set; }
        [Required]
        public string FlightName { get; set; }
        [Required]
        public string FlightNumber { get; set; }
        [Range(0, 50)]
        public int BaggageCabinKg { get; set; }

        [Range(0, 100)]
        public int BaggageCheckInKg { get; set; }
        public int TotalSeats { get; set; }
        [Required]
        public string Origin { get; set; }

        [Required]
        public string Destination { get; set; }
        [Required]
        public decimal Fare { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
    }
}
