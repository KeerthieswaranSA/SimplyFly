namespace SimplyFly.API.DTOs
{
    public class FlightDto
    {
        public string FlightName { get; set; }
        public string FlightNumber { get; set; }
        public int BaggageCheckInKg { get; set; }
        public int BaggageCabinKg { get; set; }
        public int TotalSeats { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public decimal Fare { get; set; }
    }
}
