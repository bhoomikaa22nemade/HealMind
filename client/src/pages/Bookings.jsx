import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getMyBookings, cancelBooking } from "../services/api.js";
import Avatar from "../components/Avatars.jsx";
import ReceiptModal from "../components/ReceiptModal.jsx";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function Bookings() {
  const { user, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getMyBookings();
        if (!cancelled) setBookings(res.data);
      } catch (err) {
        if (!cancelled) {
          setError("Couldn't load your bookings. Make sure the backend is running.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      const res = await cancelBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? res.data : b)));
      setSelected((prev) => (prev && prev.id === id ? res.data : prev));
    } catch (err) {
      // best-effort — the button simply re-enables on failure
    } finally {
      setCancellingId(null);
    }
  };

  if (authLoading) {
    return (
      <section className="container">
        <div className="state-block">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="container">
        <div className="state-block fade-in">
          <h3>Log in to view your bookings</h3>
          <p>Create an account or log in to see your session history and receipts.</p>
          <div className="empty-actions">
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container bookings-page">
      <div className="section-heading">
        <span>MY ACCOUNT</span>
        <h1>Your Bookings</h1>
        <p>Track every session you've booked, and pull up a full receipt any time.</p>
      </div>

      {loading && (
        <div className="state-block">
          <div className="spinner"></div>
          <p>Fetching your bookings...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-block">
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="state-block fade-in">
          <h3>No bookings yet</h3>
          <p>When you book a session, it'll show up here with a full receipt.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 14 }}>
            Browse Counsellors
          </Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="booking-list">
          {bookings.map((booking, i) => (
            <article
              key={booking.id}
              className="booking-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="booking-item-main">
                <Avatar size={54} className="booking-avatar" />
                <div>
                  <h3>{booking.counsellorName}</h3>
                  <span className="card-spec">{booking.counsellorSpecialization}</span>
                </div>
              </div>

              <div className="booking-item-details">
                <div>
                  <span className="label">Date &amp; Time</span>
                  <strong>
                    {formatDate(booking.date)} • {booking.time}
                  </strong>
                </div>
                <div>
                  <span className="label">Mode</span>
                  <strong>{booking.mode}</strong>
                </div>
                <div>
                  <span className="label">Total</span>
                  <strong>₹{booking.total.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="label">Status</span>
                  <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="booking-item-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setSelected(booking)}>
                  View Receipt
                </button>
                {booking.status === "Confirmed" && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleCancel(booking.id)}
                    disabled={cancellingId === booking.id}
                  >
                    {cancellingId === booking.id ? "Cancelling..." : "Cancel"}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && <ReceiptModal booking={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}