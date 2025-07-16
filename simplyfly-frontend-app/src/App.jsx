import React from "react";
//import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import ManageFlights from "./components/ManageFlights";
import FlightOwnerPage from "./components/FlightOwnerPage";
import PrivateRoute from "./auth/PrivateRoute";
import PassengerPage from "./components/PassengerPage";
import SearchFlights from "./components/SearchFlights";
import MyBookings from "./components/MyBookings";
import BookFlight from "./components/BookFlight";
//import UpdateProfile from "./components/UpdateProfile";
import ManageUsers from "./components/ManageUsers";
import AdminBookings from "./components/AdminBookings";
import AdminManageFlights from "./components/AdminManageFlights";
import Register from "./components/Register";
import FlightOwnerBookings from "./components/FlightOwnerBookings";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/passenger"
          element={
            <PrivateRoute allowedRoles={["Passenger"]}>
              <PassengerPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/flight-owner"
          element={
            <PrivateRoute allowedRoles={["FlightOwner"]}>
              <FlightOwnerPage />
            </PrivateRoute>
          }
        />
        <Route path="/flight-owner/manage-flights"
          element={
            <PrivateRoute allowedRoles={["FlightOwner"]}>
              <ManageFlights />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/passenger/dashboard" element={<PassengerPage />} />
        <Route path="/passenger/search-flights" element={<SearchFlights />} />
        <Route path="/passenger/bookings" element={<MyBookings />} />
        <Route path="/flight-owner/bookings" element={<FlightOwnerBookings />} />
        <Route path="/book/:scheduleId" element={<BookFlight />} />

        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/flights" element={<AdminManageFlights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

