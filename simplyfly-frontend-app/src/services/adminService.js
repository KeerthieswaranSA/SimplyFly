import axiosins from "./axiosInstance";

// Get all users
export const getUsers = async () => {
  const response = await axiosins.get("/Admin/users");
  return response.data;
};

// Delete a user
export const deleteUser = async (userId) => {
  await axiosins.delete(`/Admin/users/${userId}`);
};

// Get all bookings
export const getAllBookings = async () => {
  const response = await axiosins.get("/Admin/bookings");
  return response.data;
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  await axiosins.put(`/Admin/bookings/${bookingId}/cancel`);
};
//Get All Flights
export const getAllFlightsAdmin = async () => {
  const res = await axiosins.get("/Admin/flights");
  return res.data;
};
//Get Sched
export const getFlightSchedulesAdmin = async (flightId) => {
  const res = await axiosins.get(`/Admin/flights/${flightId}/schedules`);
  return res.data;
};

export const updateFlightAdmin = async (flightId, flight) => {
  await axiosins.put(`/Admin/flights/${flightId}`, flight);
};

export const deleteFlightAdmin = async (flightId) => {
  await axiosins.delete(`/Admin/flights/${flightId}`);
};
