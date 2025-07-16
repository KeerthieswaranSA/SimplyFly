import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const PassengerPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container py-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Welcome to SimplyFly Passenger Dashboard</h2>
          <p className="text-muted">
            Here you can search flights and manage your bookings.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow h-100 border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <span role="img" aria-label="search">🔍</span> Search Flights
                </h5>
                <p className="card-text flex-grow-1">
                  Find available flights based on your preferred route and date.
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate("/passenger/search-flights")}
                >
                  Search Flights
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow h-100 border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <span role="img" aria-label="ticket">🎫</span> My Bookings
                </h5>
                <p className="card-text flex-grow-1">
                  View, cancel, or manage your current flight reservations.
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate("/passenger/bookings")}
                >
                  View Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PassengerPage;
