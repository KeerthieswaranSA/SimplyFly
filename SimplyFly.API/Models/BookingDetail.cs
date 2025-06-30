using System.ComponentModel.DataAnnotations;
namespace SimplyFly.API.Models
{
    public class BookingDetail
    {
        public int BookingDetailId { get; set; }
        [Required]
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
        [Required]
        public string SeatNumber { get; set; }
        [Range(1, double.MaxValue)]
        public decimal Fare { get; set; }
    }
}
