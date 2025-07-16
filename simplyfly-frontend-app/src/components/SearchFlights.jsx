import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchFlights } from "../services/flightService";
import Layout from "./Layout";
import { toast } from "react-toastify";

const SearchFlights = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!origin || !destination || !date) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const dto = { origin, destination, travelDate: date };
      console.log("dto",dto);
      const data = await searchFlights(dto);
      setResults(data);
      if (data.length === 0) toast.info("No flights found.");
    } catch (err) {
      console.error("Search error", err);
      toast.error("Error searching flights.");
    }
  };

  const handleBook = (scheduleId) => {
    navigate(`/book/${scheduleId}`);
  };

  return (
    <Layout>
      <div className="container py-4">
        <h2>Search Flights</h2>

        <div className="row g-2 mb-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="mt-3">
            {results.map((s) => (
              <div key={s.scheduleId} className="card mb-3">
                <div className="card-body">
                  <h5>{s.flight?.flightName || "Unnamed Flight"} ({s.flight?.flightNumber || "N/A"})</h5>
                  <p>
                    <strong>{s.flight?.origin} → {s.flight?.destination}</strong><br/>
                    Departure: {new Date(s.departureTime).toLocaleString()}<br/>
                    Arrival: {new Date(s.arrivalTime).toLocaleString()}<br/>
                    Fare: ₹{s.flight?.fare ?? "N/A"}<br/>
                    Available Seats: {s.availableSeats ?? "N/A"}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => handleBook(s.scheduleId)}
                  >
                    Book This Flight
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchFlights;
