import axiosins from "./axiosInstance";

// export const bookFlight = async (bookingDto) => {
//   const response = await axiosins.post("/Booking/flight-booking", bookingDto);
//   return response.data;
// };

export const cancelBooking = async (bookingId) => {
  const response = await axiosins.delete(`/Booking/cancel/${bookingId}`);
  return response.data;
};
/////////////////////////////
export const getMyBookings = async () => {
  const response = await axiosins.get("/Booking/my");
  return response.data;
};
export const getScheduleById = async (scheduleId) => {
  const response = await axiosins.get(`/Passenger/schedules/${scheduleId}`);
  return response.data;
};

export const createBooking = async (scheduleId, seats) => {
  const response = await axiosins.post(`/Passenger/bookings`, {
    scheduleId,
    seats
  });
  return response.data;
};

//////////////////
export const getFlightOwnerBookings = async () => {
  const res = await axios.get("https://localhost:7134/api/FlightOwner/bookings");
  return res.data;
};

export async function getProfile() {
  const response = await axiosins.get("/Passenger/profile");
  return response.data;
}

export async function bookFlight(data) {
  console.log("data",data);
  const response = await axiosins.post("/Booking/flight-booking", data);
  return response.data;
}