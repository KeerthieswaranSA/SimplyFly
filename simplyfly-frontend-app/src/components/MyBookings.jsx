
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getMyBookings } from "../services/bookingService";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      console.log("Bookings API response:", data); 
      setBookings(data);
    } catch (err) {
      toast.error("Error fetching bookings.");
      console.error(err);
    }
  };
  fetchBookings();
}, []);


  return (
    <Layout>
      <ul className="list-group">
  {bookings.map((b) => (
    <li
      key={b.bookingId}
      className="list-group-item mb-3"
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h5 style={{ marginBottom: "8px" }}>
  ✈️ Flight: <b>{b.flight?.flightName || "N/A"}</b> ({b.flight?.flightNumber || "N/A"})
</h5>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <strong>Route:</strong>
          <div>
            {b.origin} → {b.destination}
          </div>
        </div>
        <div>
          <strong>Departure:</strong>
          <div>{new Date(b.departureTime).toLocaleString()}</div>
        </div>
        <div>
          <strong>Seats:</strong>
          <div>{b.seats?.join(", ") || "N/A"}</div>
        </div>
        <div>
          <strong>Total Paid:</strong>
          <div>₹{b.totalAmount}</div>
        </div>
      </div>
    </li>
  ))}
</ul>



    </Layout>
  );
};

export default MyBookings;
