import React, { useEffect, useState } from "react";
import {
  getAllFlights,
  addFlight,
  deleteFlight,
  updateFlight,
  getFlightSchedules,
  addFlightSchedule,
  deleteFlightSchedule,
  updateFlightSchedule, // NEW: implement in flightService.js
} from "../services/flightService";
import Layout from "./Layout";
import { toast } from "react-toastify";

const ManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFlight, setEditingFlight] = useState(null);
  const [editingSchedule, setEditingSchedule] = useState(null); // NEW
  const [schedules, setSchedules] = useState({});
  const [addingScheduleFlightId, setAddingScheduleFlightId] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    departureTime: "",
    arrivalTime: ""
  });
  const [newFlight, setNewFlight] = useState(initialFlight());
  
  function initialFlight() {
    return {
      flightName: "",
      flightNumber: "",
      origin: "",
      destination: "",
      fare: "",
      totalSeats: "",
      baggageCheckInKg: "",
      baggageCabinKg: "",
    };
  }

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const data = await getAllFlights();
      setFlights(data);
    } catch (err) {
      toast.error("Error fetching flights.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    const alphaRegex = /^[A-Za-z ]+$/;
    if (!alphaRegex.test(newFlight.origin)) {
      toast.error("Origin must contain only letters.");
      return;
    }
    if (!alphaRegex.test(newFlight.destination)) {
      toast.error("Destination must contain only letters.");
      return;
    }
    if (
      !newFlight.flightName.trim() ||
      !newFlight.flightNumber.trim()
    ) {
      toast.error("Flight name and number are required.");
      return;
    }
    if (
      Number(newFlight.fare) <= 0 ||
      Number(newFlight.totalSeats) <= 0 ||
      Number(newFlight.baggageCheckInKg) < 0 ||
      Number(newFlight.baggageCabinKg) < 0
    ) {
      toast.error("Fare, seats, and baggage must be positive numbers.");
      return;
    }

    try {
      await addFlight(newFlight);
      toast.success("Flight added successfully.");
      setNewFlight(initialFlight());
      setShowAddFlightForm(false);
      fetchFlights();
    } catch (err) {
      toast.error("Error adding flight.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await deleteFlight(id);
      toast.success("Flight deleted.");
      fetchFlights();
    } catch (err) {
      toast.error("Error deleting flight.");
      console.error(err);
    }
  };

  const handleEdit = (flight) => {
    setEditingFlight({ ...flight });
  };

  const handleUpdateFlight = async () => {
    try {
      await updateFlight(editingFlight.flightId, editingFlight);
      toast.success("Flight updated successfully.");
      setEditingFlight(null);
      fetchFlights();
    } catch (err) {
      toast.error("Error updating flight.");
      console.error(err);
    }
  };

const handleShowSchedules = async (flightId) => {
  if (schedules[flightId]) {
    // If already loaded, clicking again will hide it
    setSchedules((prev) => {
      const updated = { ...prev };
      delete updated[flightId];
      return updated;
    });
    return;
  }

  try {
    const data = await getFlightSchedules(flightId);
    setSchedules((prev) => ({
      ...prev,
      [flightId]: data,
    }));
  } catch (err) {
    toast.error("Error fetching schedules.");
    console.error(err);
  }
};

  const handleAddScheduleClick = (flightId) => {
    setAddingScheduleFlightId(flightId);
    setNewSchedule({ departureTime: "", arrivalTime: "" });
    setEditingSchedule(null);
  };

  const handleSaveSchedule = async () => {
    if (!newSchedule.departureTime || !newSchedule.arrivalTime) {
      toast.warning("Please fill all schedule fields.");
      return;
    }
    try {
      await addFlightSchedule({
        flightId: addingScheduleFlightId,
        departureTime: newSchedule.departureTime,
        arrivalTime: newSchedule.arrivalTime
      });
      toast.success("Schedule added.");
      setAddingScheduleFlightId(null);
      setNewSchedule({ departureTime: "", arrivalTime: "" });
      handleShowSchedules(addingScheduleFlightId);
    } catch (err) {
      toast.error("Error adding schedule.");
      console.error(err);
    }
  };

  const handleDeleteSchedule = async (scheduleId, flightId) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await deleteFlightSchedule(scheduleId);
      toast.success("Schedule deleted.");
      handleShowSchedules(flightId);
    } catch (err) {
      toast.error("Error deleting schedule.");
      console.error(err);
    }
  };

  const handleEditSchedule = (schedule, flightId) => {
    setEditingSchedule({ ...schedule, flightId });
    setAddingScheduleFlightId(null);
  };

  const handleUpdateSchedule = async () => {
    try {
      await updateFlightSchedule(editingSchedule.scheduleId, {
        departureTime: editingSchedule.departureTime,
        arrivalTime: editingSchedule.arrivalTime,
      });
      toast.success("Schedule updated successfully.");
      setEditingSchedule(null);
      handleShowSchedules(editingSchedule.flightId);
    } catch (err) {
      toast.error("Error updating schedule.");
      console.error(err);
    }
  };

  return (
    <Layout>
    <div className="container-fluid p-3">
      <h2>Manage My Flights</h2>

      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <>
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
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleShowSchedules(f.flightId)}
                      >
                        View Schedules
                      </button>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleAddScheduleClick(f.flightId)}
                      >
                        Add Schedule
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

                  {schedules[f.flightId]?.length > 0 && (
                    <tr>
                      <td colSpan="7">
                        <strong>Schedules:</strong>
                        <ul className="list-group mt-2">
                          {schedules[f.flightId].map((s) => (
                            <li
                              key={s.scheduleId}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <span>
                                Departure: {new Date(s.departureTime).toLocaleString()} | Arrival: {new Date(s.arrivalTime).toLocaleString()}
                              </span>
                              <div>
                                <button
                                  className="btn btn-sm btn-warning me-2"
                                  onClick={() => handleEditSchedule(s, f.flightId)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteSchedule(s.scheduleId, f.flightId)}
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}

                  {addingScheduleFlightId === f.flightId && (
                    <tr>
                      <td colSpan="7">
                        <div className="row">
                          <div className="col-md-5 mb-2">
                            <label>Departure Time</label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              value={newSchedule.departureTime}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  departureTime: e.target.value
                                })
                              }
                            />
                          </div>
                          <div className="col-md-5 mb-2">
                            <label>Arrival Time</label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              value={newSchedule.arrivalTime}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  arrivalTime: e.target.value
                                })
                              }
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button
                              className="btn btn-success me-2"
                              onClick={handleSaveSchedule}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setAddingScheduleFlightId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {editingSchedule?.scheduleId && editingSchedule.flightId === f.flightId && (
                    <tr>
                      <td colSpan="7">
                        <div className="row">
                          <div className="col-md-5 mb-2">
                            <label>Edit Departure Time</label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              value={editingSchedule.departureTime.slice(0, 16)}
                              onChange={(e) =>
                                setEditingSchedule({
                                  ...editingSchedule,
                                  departureTime: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-5 mb-2">
                            <label>Edit Arrival Time</label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              value={editingSchedule.arrivalTime.slice(0, 16)}
                              onChange={(e) =>
                                setEditingSchedule({
                                  ...editingSchedule,
                                  arrivalTime: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button
                              className="btn btn-success me-2"
                              onClick={handleUpdateSchedule}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setEditingSchedule(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {flights.length === 0 && <p>No flights found.</p>}
        </>
      )}

      {/* Flight Edit Form */}
      {editingFlight && (
        <div className="card mt-4 p-3">
          <h5>Edit Flight: {editingFlight.flightName}</h5>
          <div className="row">
            {[
              { key: "flightName", label: "Flight Name" },
              { key: "origin", label: "Origin" },
              { key: "destination", label: "Destination" },
              { key: "fare", label: "Fare", type: "number" },
              { key: "totalSeats", label: "Total Seats", type: "number" },
              { key: "baggageCheckInKg", label: "Baggage Check-In (kg)", type: "number" },
              { key: "baggageCabinKg", label: "Baggage Cabin (kg)", type: "number" },
            ].map((field) => (
              <div className="col-md-4 mb-2" key={field.key}>
                <input
                  type={field.type || "text"}
                  className="form-control"
                  placeholder={field.label}
                  value={editingFlight[field.key]}
                  onChange={(e) =>
                    setEditingFlight({
                      ...editingFlight,
                      [field.key]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>
          <button className="btn btn-success" onClick={handleUpdateFlight}>
            Save Changes
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setEditingFlight(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Add Flight */}
      <h4 className="mt-4">Add New Flight</h4>
      <form onSubmit={handleAddFlight}>
        <div className="row">
          {[
            { key: "flightName", label: "Flight Name" },
            { key: "flightNumber", label: "Flight Number" },
            { key: "origin", label: "Origin" },
            { key: "destination", label: "Destination" },
            { key: "fare", label: "Fare", type: "number" },
            { key: "totalSeats", label: "Total Seats", type: "number" },
            { key: "baggageCheckInKg", label: "Baggage Check-In (kg)", type: "number" },
            { key: "baggageCabinKg", label: "Baggage Cabin (kg)", type: "number" },
          ].map((field) => (
            <div className="col-md-4 mb-2" key={field.key}>
              <input
                type={field.type || "text"}
                className="form-control"
                placeholder={field.label}
                value={newFlight[field.key]}
                onChange={(e) =>
                  setNewFlight({
                    ...newFlight,
                    [field.key]: e.target.value,
                  })
                }
                required
              />
            </div>
          ))}
        </div>
        <button className="btn btn-success mt-2">Add Flight</button>
      </form>
      </div>
    </Layout>
  );
};

export default ManageFlights;