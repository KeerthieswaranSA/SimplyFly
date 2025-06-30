namespace SimplyFly.API.DTOs
{
    public class RegisterUserDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ContactNumber { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public int RoleId { get; set; }   // 1 = Passenger, 2 = FlightOwner
    }
}
