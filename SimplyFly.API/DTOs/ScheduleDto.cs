namespace SimplyFly.API.DTOs
{
    public class ScheduleDto
    {
        public int FlightId { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
    }
}
