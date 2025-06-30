using Moq;
using NUnit.Framework;
using SimplyFly.API.Controllers;
using SimplyFly.API.DTOs;

using Microsoft.AspNetCore.Mvc;
using SimplyFly.API.Services;

namespace SimplyFly.Tests
{
    [TestFixture]
    public class BookingControllerTest
    {
        private Mock<IBookingService> _mockService;
        private BookingController _controller;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<IBookingService>();
            _controller = new BookingController(_mockService.Object);
        }

        [Test]
        public async Task Books_Valid_Flight_Returns_OK()
        {
            var dto = new BookingDto
            {
                Username = "john@example.com",
                FlightId = 1,
                TravelDate = System.DateTime.Today,
                NumberOfSeats = 2,
                PreferredSeats = new List<string> { "A1", "A2" },
                PaymentStatus = "Success",
            };

            var mockResponse = new
            {
                BookingId = 101,
                FlightName = "IndiGo",
                Origin = "Chennai",
                Destination = "Delhi",
                Amount = 5000,
                Message = "Booking successful"
            };

            _mockService.Setup(s => s.BookWithFlightInfoAsync(dto)).ReturnsAsync(mockResponse);

            var result = await _controller.BookFlight(dto);

            var ok = result as OkObjectResult;
            Assert.IsNotNull(ok);
            Assert.That(ok.Value.ToString(), Does.Contain("Booking successful"));
        }

        [Test]
        public async Task GetMyBookings_Returns_Booking_List()
        {

            var mockBookings = new List<object>
            {
                new
                {
                    BookingId = 101,
                    FlightName = "TestAir",
                    Status = "Booked",
                    TotalAmount = 3000,
                    Seats = new List<string> { "B1", "B2" }
                }
            };

            _mockService.Setup(s => s.GetMyBookingsAsync(It.IsAny<System.Security.Claims.ClaimsPrincipal>()))
                .ReturnsAsync(mockBookings);

            var result = await _controller.MyBookings();

            var ok = result as OkObjectResult;
            Assert.IsNotNull(ok);
            var list = ok.Value as IEnumerable<object>;
            Assert.IsNotNull(list);
        }

        [Test]
        public async Task Cancels_Valid_Booking_Returns_OK()
        {
            int bookingId = 101;
            _mockService.Setup(s => s.CancelBookingAsync(bookingId, It.IsAny<System.Security.Claims.ClaimsPrincipal>()))
                .ReturnsAsync("Booking cancelled and refunded.");

            var result = await _controller.Cancel(bookingId);


            var ok = result as OkObjectResult;
            Assert.IsNotNull(ok);
            Assert.That(ok.Value.ToString(), Does.Contain("cancelled"));
        }

        [Test]
        public async Task Cancels_Invalid_Booking_Returns_BadRequest()
        {
 
            int bookingId = 999;
            _mockService.Setup(s => s.CancelBookingAsync(bookingId, It.IsAny<System.Security.Claims.ClaimsPrincipal>()))
                .ThrowsAsync(new System.Exception("Booking not found."));

            var result = await _controller.Cancel(bookingId);

            var bad = result as BadRequestObjectResult;
            Assert.IsNotNull(bad);
            Assert.That(bad.Value.ToString(), Does.Contain("Booking not found"));
        }
    }
}
