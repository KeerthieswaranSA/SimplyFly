import React, { useEffect, useState } from "react";
import {
  getAllFlightsAdmin,
  getFlightSchedulesAdmin,
  updateFlightAdmin,
  deleteFlightAdmin
} from "../services/adminService";
import { toast } from "react-toastify";
import Layout from "./Layout";

const AdminManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      setLoading(true);
      const data = await getAllFlightsAdmin();
      setFlights(data);
    } catch (err) {
      toast.error("Error loading flights.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSchedules = async (flightId) => {
    if (schedules[flightId]) {
      setSchedules((prev) => {
        const updated = { ...prev };
        delete updated[flightId];
        return updated;
      });
      return;
    }

    try {
      const data = await getFlightSchedulesAdmin(flightId);
      setSchedules((prev) => ({
        ...prev,
        [flightId]: data
      }));
    } catch (err) {
      toast.error("Error loading schedules.");
      console.error(err);
    }
  };

  const handleEdit = (flight) => {
    setSelectedFlight({ ...flight });
  };

  const handleCancelEdit = () => {
    setSelectedFlight(null);
  };

  const handleSaveEdit = async () => {
    try {
      await updateFlightAdmin(selectedFlight.flightId, selectedFlight);
      toast.success("Flight updated.");
      setSelectedFlight(null);
      loadFlights();
    } catch (err) {
      toast.error("Error updating flight.");
      console.error(err);
    }
  };

  const handleDelete = async (flightId) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await deleteFlightAdmin(flightId);
      toast.success("Flight deleted.");
      loadFlights();
    } catch (err) {
      toast.error("Error deleting flight.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="container p-3">
        <h2>Admin Manage Flights</h2>

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <React.Fragment key={f.flightId}>
                  <tr>
                    <td>{f.flightName}</td>
                    <td>{f.flightNumber}</td>
                    <td>{f.origin}</td>
                    <td>{f.destination}</td>
                    <td>₹{f.fare}</td>
                    <td>{f.totalSeats}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleViewSchedules(f.flightId)}
                      >
                        View Schedules
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(f)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(f.flightId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {schedules[f.flightId] && (
                    <tr>
                      <td colSpan="7">
                        <strong>Schedules:</strong>
                        <ul>
                          {schedules[f.flightId].map((s) => (
                            <li key={s.scheduleId}>
                              Departure: {new Date(s.departureTime).toLocaleString()} | Arrival: {new Date(s.arrivalTime).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {selectedFlight && (
          <div className="card p-3 mt-3">
            <h4>Edit Flight</h4>
            <div className="row">
              {[
                { key: "flightName", label: "Flight Name" },
                { key: "flightNumber", label: "Flight Number" },
                { key: "origin", label: "Origin" },
                { key: "destination", label: "Destination" },
                { key: "fare", label: "Fare", type: "number" },
                { key: "totalSeats", label: "Total Seats", type: "number" }
              ].map((field) => (
                <div className="col-md-4 mb-2" key={field.key}>
                  <input
                    type={field.type || "text"}
                    className="form-control"
                    placeholder={field.label}
                    value={selectedFlight[field.key]}
                    onChange={(e) =>
                      setSelectedFlight({
                        ...selectedFlight,
                        [field.key]: e.target.value
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-success me-2" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminManageFlights;
