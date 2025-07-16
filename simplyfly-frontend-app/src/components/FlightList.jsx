import React, { useEffect, useState } from "react";
import { getAllFlights } from "../services/flightService";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getAllFlights();
        setFlights(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);
  const navigate = useNavigate();

const handleBook = (flightId) => {
  navigate(`/passenger/book/${flightId}`);
};
  return (
    <Layout>
      <h2>Available Flights</h2>
      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Fare</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightId}>
                <td>{flight.flightName}</td>
                <td>{flight.flightNumber}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>₹{flight.fare}</td>
                <td>{flight.totalSeats}</td>
                <td>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleBook(flight.flightId)}>
                  Book
              </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </Layout>
  );
};

export default FlightList;
