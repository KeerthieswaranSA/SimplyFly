namespace SimplyFly.API.DTOs
{
    public class BookingDto
    {
        public string Username { get; set; }          
        public int FlightId { get; set; }            
        public DateTime TravelDate { get; set; }     
        public int NumberOfSeats { get; set; }       
        public List<string>? PreferredSeats { get; set; }
        public string PaymentStatus { get; set; }    
    }
}
