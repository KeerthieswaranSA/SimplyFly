import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/loginService";
import logo from "../assets/logo1.jpg"
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid p-2">
          <Link className="navbar-brand" to="/">
            <img src={logo} height ="80px" />
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {role === "Admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/users">
                      Manage Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/bookings">
                      All Bookings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/flights">
                      Manage Flights
                    </Link>
                  </li>
                </>
              )}

              {role === "Passenger" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/passenger">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/passenger/bookings">
                      My Bookings
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/passenger/profile">
                      My Profile
                    </Link>
                  </li> */}
                </>
              )}

              {role === "FlightOwner" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/flight-owner">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/flight-owner/manage-flights">
                      Manage Flights
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/flight-owner/bookings">
                      View Bookings
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center">
              {username && (
                <span className="navbar-text me-3">
                  {username} ({role})
                </span>
              )}
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mt-4">{children}</main>
    </>
  );
};

export default Layout;
