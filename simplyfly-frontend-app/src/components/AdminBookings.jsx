import React, { useEffect, useState } from "react";
import { getAllBookings, cancelBooking } from "../services/adminService";
import Layout from "./Layout";
import { toast } from "react-toastify";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      console.log("Fetched bookings:", data);
      setBookings(data);
    } catch (err) {
      toast.error("Error fetching bookings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(bookingId);
      toast.success("Booking cancelled.");
      fetchBookings();
    } catch (err) {
      toast.error("Error cancelling booking.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="container p-3">
        <h2>All Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Passenger</th>
                  <th>Flight</th>
                  <th>Route</th>
                  <th>Departure</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Total Paid</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>
                      {b.passenger}
                      <br />
                      <small>{b.passengerEmail}</small>
                    </td>
                    <td>
                      {b.flightName || "N/A"} ({b.flightNumber || "N/A"})
                    </td>
                    <td>
                      {b.origin} → {b.destination}
                    </td>
                    <td>
                      {b.departureTime
                        ? new Date(b.departureTime).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{b.status}</td>
                    <td>{b.paymentStatus}</td>
                    <td>₹{b.totalAmount}</td>
                    <td>
                      {b.status !== "Cancelled" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancel(b.bookingId)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminBookings;
