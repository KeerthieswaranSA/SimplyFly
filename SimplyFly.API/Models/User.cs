using System.ComponentModel.DataAnnotations;

namespace SimplyFly.API.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required, MaxLength(100)]
        public string FullName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Phone]
        public string ContactNumber { get; set; }

        public string Gender { get; set; }

        public string Address { get; set; }

        [Required]
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public ICollection<Booking> Bookings { get; set; }
    }
}
