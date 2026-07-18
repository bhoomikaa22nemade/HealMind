import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bookSession } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "./Avatars.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function BookingModal({ counsellor, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    mode: "Online",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [booking, setBooking] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setMode = (mode) => setForm((prev) => ({ ...prev, mode }));

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!form.date) nextErrors.date = "Preferred date is required";
    if (!form.time) nextErrors.time = "Preferred time is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await bookSession({
        counsellorId: counsellor.id,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        mode: form.mode,
        notes: form.notes.trim(),
      });
      setBooking(res.booking);
    } catch (err) {
      const apiMessage = err?.response?.data?.message;
      setServerError(apiMessage || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToBookings = () => {
    onClose();
    navigate("/bookings");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {booking ? (
          <div className="booking-success">
            <div className="success-check">✓</div>
            <h3>Session Booked Successfully!</h3>
            <p>
              Thanks {form.name.split(" ")[0]}, {counsellor.name} will reach out to{" "}
              <strong>{form.email}</strong> to confirm your session.
            </p>

            <div className="mini-receipt">
              <div className="mini-receipt-row">
                <span>Receipt No.</span>
                <strong>{booking.receiptNo}</strong>
              </div>
              <div className="mini-receipt-row">
                <span>Date &amp; Time</span>
                <strong>
                  {booking.date} • {booking.time}
                </strong>
              </div>
              <div className="mini-receipt-row">
                <span>Mode</span>
                <strong>{booking.mode}</strong>
              </div>
              <div className="mini-receipt-row total">
                <span>Total Payable</span>
                <strong>₹{booking.total.toFixed(2)}</strong>
              </div>
            </div>

            {user ? (
              <button
                className="btn btn-primary btn-block"
                style={{ marginTop: 18 }}
                onClick={goToBookings}
              >
                View Full Receipt in My Bookings
              </button>
            ) : (
              <p className="mini-receipt-hint">
                <Link to="/login" onClick={onClose}>
                  Log in
                </Link>{" "}
                to save this receipt to your Bookings dashboard.
              </p>
            )}
            <button className="btn btn-ghost btn-block" style={{ marginTop: 8 }} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <Avatar gender={counsellor.gender} size={52} className="modal-avatar" />
              <div>
                <h3 id="booking-modal-title">Book with {counsellor.name}</h3>
                <span>
                  {counsellor.specialization} • ₹{counsellor.fee} / session
                </span>
              </div>
            </div>

            {serverError && <div className="form-error-banner">{serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="booking-name">Full Name</label>
                <input
                  id="booking-name"
                  type="text"
                  placeholder="e.g. Aisha Khan"
                  value={form.name}
                  onChange={handleChange("name")}
                  className={errors.name ? "invalid" : ""}
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="booking-email">Email</label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="e.g. aisha@example.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={errors.email ? "invalid" : ""}
                  />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="booking-phone">Phone (optional)</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="e.g. 98765 43210"
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="booking-date">Preferred Date</label>
                  <input
                    id="booking-date"
                    type="date"
                    min={todayISO()}
                    value={form.date}
                    onChange={handleChange("date")}
                    className={errors.date ? "invalid" : ""}
                  />
                  {errors.date && <div className="field-error">{errors.date}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="booking-time">Preferred Time</label>
                  <select
                    id="booking-time"
                    value={form.time}
                    onChange={handleChange("time")}
                    className={errors.time ? "invalid" : ""}
                  >
                    <option value="">Select a slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && <div className="field-error">{errors.time}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Session Mode</label>
                <div className="mode-toggle" role="group" aria-label="Session mode">
                  <button
                    type="button"
                    className={`mode-btn ${form.mode === "Online" ? "active" : ""}`}
                    onClick={() => setMode("Online")}
                  >
                    Online
                  </button>
                  <button
                    type="button"
                    className={`mode-btn ${form.mode === "In-Person" ? "active" : ""}`}
                    onClick={() => setMode("In-Person")}
                  >
                    In-Person
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="booking-notes">Notes for the counsellor (optional)</label>
                <input
                  id="booking-notes"
                  type="text"
                  placeholder="Anything you'd like them to know beforehand"
                  value={form.notes}
                  onChange={handleChange("notes")}
                />
              </div>

              <div className="fee-preview">
                <span>Session Fee</span>
                <strong>₹{counsellor.fee}</strong>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}