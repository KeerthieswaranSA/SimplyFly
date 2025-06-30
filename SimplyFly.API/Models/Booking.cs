using System.ComponentModel.DataAnnotations;
namespace SimplyFly.API.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        [Required]
        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }
        [Range(1, double.MaxValue)]
        public decimal TotalAmount { get; set; }
        [Required]
        public string Status { get; set; }

        public ICollection<BookingDetail> BookingDetails { get; set; }
        public Payment Payment { get; set; }
    }
}
