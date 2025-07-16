import React from "react";
import { useNavigate,Link } from "react-router-dom";
const LandingPage = () => {
    const navigate=useNavigate();
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">SimplyFly</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <Link to = "/login">
            <button className="btn btn-primary" onClick= {()=>navigate("/login")}>Login</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold text-primary">Fly the Smart Way ✈</h1>
          <p className="lead mb-4">
            Discover affordable, reliable, and comfortable flights across the globe with SimplyFly.
          </p>
          <Link to = "/login">
            <button className="btn btn-primary" onClick= {()=>navigate("/login")}>Login</button>
            </Link>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Our Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-airplane-engines fs-1 text-primary mb-3" />
                  <h5 className="card-title">Easy Booking</h5>
                  <p className="card-text">Book flights in seconds with our simple and sleek platform.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-geo-alt fs-1 text-primary mb-3" />
                  <h5 className="card-title">Global Destinations</h5>
                  <p className="card-text">Explore flights to over 150+ countries at your fingertips.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-headset fs-1 text-primary mb-3" />
                  <h5 className="card-title">24/7 Support</h5>
                  <p className="card-text">We’re here for you at any time, any day of the week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-3">Why Choose SimplyFly?</h2>
          <p className="lead">
            We believe air travel should be stress-free. SimplyFly offers transparent pricing, seamless booking, and exceptional service — all in one place.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="mb-3">Ready to Take Off?</h2>
          <p className="mb-4">Start your journey with SimplyFly today.</p>
          <Link to = "/login">
            <button className="btn btn-primary" onClick= {()=>navigate("/login")}>Book Now</button>
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white text-center py-4">
        <p className="mb-1">&copy; {new Date().getFullYear()} SimplyFly. All rights reserved.</p>
        <small>Made with ❤ for travelers.</small>
      </footer>
    </div>
  );
};

export default LandingPage;