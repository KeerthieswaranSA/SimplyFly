// src/components/AdminPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container p-4">
        <h2 className="mb-3">Admin Dashboard</h2>
        <p>Welcome, Admin! Use the tools below to manage the platform.</p>

        <div className="row g-3 mt-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Manage Users</h5>
                <p className="card-text">
                  View and manage passengers and flight owners.
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Manage Flights</h5>
                <p className="card-text">
                  Approve or reject flights and edit details.
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate("/admin/flights")}
                >
                  Manage Flights
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">View All Bookings</h5>
                <p className="card-text">
                  Browse all bookings across the system.
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate("/admin/bookings")}
                >
                  View Bookings
                </button>
              </div>
            </div>
          </div>

          {/* <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Reports & Analytics</h5>
                <p className="card-text">
                  Generate reports and track platform performance.
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate("/admin/reports")}
                >
                  View Reports
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
