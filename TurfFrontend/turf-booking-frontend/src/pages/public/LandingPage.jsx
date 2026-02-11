import { useEffect, useState } from "react";
import { getAllTurfs } from "../../api/turfService";
import { Link } from "react-router-dom";
import "../../styles/landing.css";

export default function LandingPage() {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    getAllTurfs().then(res => setTurfs(res.data));
  }, []);

  return (
    <div className="landing-container">
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Turf Booking System</h1>
          <p>Book sports turfs easily. Manage bookings professionally.</p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      {/* TURFS */}
      <section className="section" id="turfs">
        <h2>Available Turfs</h2>

        <div className="turf-grid">
          {turfs.slice(0, 5).map(t => (
            <div key={t.id} className="turf-card">
              <h3>{t.name}</h3>
              <p><b>Area:</b> {t.area || t.location}</p>
              <p><b>City:</b> {t.city || "-"}</p>

              <div className="turf-footer">
                <span>₹ {t.pricePerHour}/hr</span>
                <Link to="/login" className="btn-small">
                  Login to Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section light" id="how">
        <h2>How It Works</h2>

        <div className="how-grid">
          <div className="how-card">
            <h3>👤 Register</h3>
            <p>Register as User or Turf Owner</p>
          </div>

          <div className="how-card">
            <h3>🏟 Book Turf</h3>
            <p>Users book turfs instantly</p>
          </div>

          <div className="how-card">
            <h3>🛠 Manage</h3>
            <p>Owners manage turfs & bookings</p>
          </div>

          <div className="how-card">
            <h3>🔒 Secure</h3>
            <p>Role-based secure system</p>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="footer" id="contact">
        <div>
          <h3>🏟 Turf Booking</h3>
          <p>Smart turf booking & management platform.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: support@turfbooking.com</p>
          <p>Phone: +91 7666551412</p>
        </div>
      </footer>
    </div>
  );
}
