import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7134/api/FlightOwner",
});


export const getFlightsByOwner = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/flights", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBookingsByFlight = async (flightId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/bookings/${flightId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
