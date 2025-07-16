import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookFlight } from "../services/bookingService";
import { toast } from "react-toastify";
import Layout from "./Layout";

const BookFlight = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const [numSeats, setNumSeats] = useState(1);
  const [preferredSeats, setPreferredSeats] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("User info not found. Please log in again.");
      return;
    }

    const parsedSeats = parseInt(numSeats);
    if (!parsedSeats || parsedSeats <= 0) {
      toast.error("Please enter a valid number of seats.");
      return;
    }

    // Build the payload safely
    const payload = {
      username,
      flightId: scheduleId ? parseInt(scheduleId) : null,
      travelDate: new Date().toISOString(),
      numberOfSeats: parsedSeats,
      preferredSeats: preferredSeats
        ? preferredSeats.split(",").map((s) => s.trim())
        : null, // Use null instead of []
      paymentStatus,
    };

    // Validate that flightId is valid
    if (!payload.flightId) {
      toast.error("Invalid flight schedule ID.");
      return;
    }

    console.log("Booking Payload:", payload);

    try {
      const result = await bookFlight(payload);
      console.log("Booking Success:", result);
      toast.success("Booking successful!");
      navigate("/passenger/bookings");
    } catch (err) {
      console.error("Booking error:", err.response.data);
      const errorMessage =
        err?.response?.data ||
        err?.message ||
        "Booking failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout>
      <div className="container p-4">
        <h2>Confirm Your Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Number of Seats</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={numSeats}
              onChange={(e) => setNumSeats(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Preferred Seats (comma separated)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., S1, S2"
              value={preferredSeats}
              onChange={(e) => setPreferredSeats(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Status</label>
            <select
              className="form-select"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <button className="btn btn-success" type="submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default BookFlight;
