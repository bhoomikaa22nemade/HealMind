import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <Link to="/" className="navbar-brand">
          <div className="brand-icon">🧠</div>

          <div className="brand-text">
            <h2>HealMind</h2>
            <span>Your Mental Health Partner</span>
          </div>
        </Link>

        <nav className="navbar-links">

          <Link to="/" className="nav-link">
            Home
          </Link>
<Link to="/about" className="nav-link">
  About
</Link>
          {user && (
            <Link to="/bookings" className="nav-link">
              My Bookings
            </Link>
          )}

          {user ? (
            <div className="navbar-user">

              <div className="user-pill">
                👋 Hi, <strong>{user.name.split(" ")[0]}</strong>
              </div>

              <button
                className="btn btn-outline btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}