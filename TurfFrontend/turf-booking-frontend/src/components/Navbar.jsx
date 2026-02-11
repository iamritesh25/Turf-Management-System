import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="main-header">
      <div className="nav-container">
        {/* Brand */}
        <div className="brand" onClick={() => navigate("/")}>
          🏟 <span>Turf Booking</span>
        </div>

        {/* Nav Links (NO HOME) */}
        <nav className="nav-links">
          <button onClick={() => goToSection("turfs")}>Turfs</button>
          <button onClick={() => goToSection("how")}>How It Works</button>
          <button onClick={() => goToSection("contact")}>Contact</button>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {!user && (
            <>
              <button
                type="button"
                className="nav-login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="nav-register"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}

          {user && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
}
