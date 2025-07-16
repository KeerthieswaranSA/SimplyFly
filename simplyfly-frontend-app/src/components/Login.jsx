import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/loginService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username) {
      newErrors.username = "You cannot leave the email blank.";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password must not be entered blank.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { role } = await login(username, password);

      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Passenger") {
        navigate("/passenger");
      } else if (role === "FlightOwner") {
        navigate("/flight-owner");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      // Always show a clean, user-friendly error message
      setErrors({
        general: "Login failed. Please check your email and password.",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <h2 className="mb-1 fw-bold">Welcome back!!</h2>
        <p className="text-muted mb-4">Login to start booking flights</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${
                errors.username ? "is-invalid" : ""
              }`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              placeholder="you@example.com"
            />
            {errors.username && (
              <div className="invalid-feedback d-block">
                {errors.username}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="Enter a password"
            />
            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}
          </div>
          {errors.general && (
            <div className="alert alert-danger py-2">{errors.general}</div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
          >
            Submit
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">
            Don’t have an account?{" "}
            <Link to="/register" className="fw-semibold">
              Sign up now!
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
