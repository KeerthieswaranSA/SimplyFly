using System.ComponentModel.DataAnnotations;
namespace SimplyFly.API.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        [Required]
        public int BookingId { get; set; }  
        public Booking Booking { get; set; }
        [Required]
        public DateTime PaymentDate { get; set; }
        [Range(1, double.MaxValue)]
        public decimal AmountPaid { get; set; }
        [Required]
        public string PaymentStatus { get; set; }
    }
}
