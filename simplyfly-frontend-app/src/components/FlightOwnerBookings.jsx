import React, { useState, useEffect } from "react";
import { getFlightsByOwner, getBookingsByFlight } from "../services/flightOwnerService";
import Layout from "./Layout";

const FlightOwnerBookings = () => {
  const [flights, setFlights] = useState([]);
  const [expandedFlightId, setExpandedFlightId] = useState(null);
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const data = await getFlightsByOwner();
        setFlights(data);
      } catch (err) {
        console.error("Error loading flights", err);
      }
    };
    loadFlights();
  }, []);

  const handleToggleBookings = async (flightId) => {
    if (expandedFlightId === flightId) {
      setExpandedFlightId(null);
    } else {
      setExpandedFlightId(flightId);
      if (!bookings[flightId]) {
        try {
          const data = await getBookingsByFlight(flightId);
          setBookings((prev) => ({ ...prev, [flightId]: data }));
        } catch (err) {
          console.error("Error loading bookings", err);
        }
      }
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">✈️ My Flights and Bookings</h2>
      {flights.length === 0 && <p>No flights found.</p>}
      {flights.map((flight) => (
        <div key={flight.flightId} className="card mb-4 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-2">{flight.flightName} ({flight.flightNumber})</h5>
              <p className="mb-1"><strong>Route:</strong> {flight.origin} ➡ {flight.destination}</p>
              <p className="mb-1"><strong>Seats:</strong> {flight.totalSeats}</p>
              {/* <p className="mb-0"><strong>Available Seats:</strong> {flight.availableSeats}</p> */}
            </div>
            <button
              className="btn btn-outline-primary"
              onClick={() => handleToggleBookings(flight.flightId)}
            >
              {expandedFlightId === flight.flightId ? "Hide Bookings" : "Show Bookings"}
            </button>
          </div>

          {expandedFlightId === flight.flightId && (
            <div className="card-body border-top">
              <h6 className="mb-3">Bookings:</h6>
              {bookings[flight.flightId]?.length > 0 ? (
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Passenger</th>
                      <th>Email</th>
                      <th>Seats</th>
                      <th>Status</th>
                      <th>Amount Paid</th>
                      <th>Payment</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings[flight.flightId].map((b) => (
                      <tr key={b.bookingId}>
                        <td>{b.passenger}</td>
                        <td>{b.email}</td>
                        <td>{b.seats?.join(", ") || "N/A"}</td>
                        <td>{b.status}</td>
                        <td>₹{b.payment?.amountPaid || 0}</td>
                        <td>{b.payment?.paymentStatus || "N/A"}</td>
                        <td>{new Date(b.schedule?.departureTime).toLocaleString()}</td>
                        <td>{new Date(b.schedule?.arrivalTime).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">No bookings found for this flight.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default FlightOwnerBookings;
