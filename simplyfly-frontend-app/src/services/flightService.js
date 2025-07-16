// ✅ ALWAYS import axios
import axios from "axios";
import axiosins from "./axiosInstance";

export const getAllFlights = async () => {
  const response = await axiosins.get("/FlightOwner/flights");
  return response.data;
};

export const addFlight = async (flight) => {
  await axiosins.post("/FlightOwner/flights", flight);
};

export const deleteFlight = async (id) => {
  await axiosins.delete(`/FlightOwner/flights/${id}`);
};

export const updateFlight = async (flightId, updatedFlight) => {
  const response = await axiosins.put(`/FlightOwner/flights/${flightId}`, updatedFlight);
  return response.data;
};

export const addFlightSchedule = async (scheduleDto) => {
  const response = await axiosins.post("/FlightOwner/schedules", scheduleDto);
  return response.data;
};

export const deleteFlightSchedule = async (scheduleId) => {
  const response = await axiosins.delete(`/FlightOwner/schedules/${scheduleId}`);
  return response.data;
};

export const updateFlightSchedule = async (scheduleId, data) => {
  const response = await axiosins.put(`/FlightOwner/schedules/${scheduleId}`, data);
  return response.data;
};

export const getFlightSchedules = async (flightId) => {
  const response = await axiosins.get(`/FlightOwner/schedules/${flightId}`);
  return response.data;
};

export const getFlightBookings = async (flightId) => {
  const response = await axiosins.get(`/FlightOwner/flights/${flightId}/bookings`);
  return response.data;
};

// ✅ THIS is where you were missing import
export async function searchFlights(dto) {
  
  const response = await axiosins.post("/Booking/search", dto);
  return response.data;
}
