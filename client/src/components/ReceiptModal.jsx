import { useEffect } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReceiptModal({ booking, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card receipt-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close no-print" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="receipt-print-area">
          <div className="receipt-card">
            <div className="receipt-header">
              <div className="receipt-brand">
                <span className="brand-mark">🧠</span>
                <div>
                  <strong>HealMind</strong>
                  <span>Counsellor Directory</span>
                </div>
              </div>
              <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
            </div>

            <div className="receipt-meta">
              <div>
                <span className="label">Receipt No.</span>
                <strong>{booking.receiptNo}</strong>
              </div>
              <div>
                <span className="label">Booking ID</span>
                <strong>{booking.id.slice(0, 8).toUpperCase()}</strong>
              </div>
              <div>
                <span className="label">Booked On</span>
                <strong>{formatDateTime(booking.createdAt)}</strong>
              </div>
            </div>

            <hr className="receipt-divider" />

            <div className="receipt-section">
              <h4 id="receipt-modal-title">Counsellor</h4>
              <p>
                {booking.counsellorName} — {booking.counsellorSpecialization}
              </p>
            </div>

            <div className="receipt-section receipt-columns">
              <div>
                <h4>Client Details</h4>
                <p>{booking.name}</p>
                <p>{booking.email}</p>
                {booking.phone && <p>{booking.phone}</p>}
              </div>
              <div>
                <h4>Session Details</h4>
                <p>{formatDate(booking.date)}</p>
                <p>{booking.time}</p>
                <p>{booking.mode}</p>
              </div>
            </div>

            {booking.notes && (
              <div className="receipt-section">
                <h4>Notes</h4>
                <p>{booking.notes}</p>
              </div>
            )}

            <hr className="receipt-divider" />

            <table className="receipt-table">
              <tbody>
                <tr>
                  <td>Session Fee</td>
                  <td>₹{booking.fee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Platform Fee</td>
                  <td>₹{booking.platformFee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>GST (18%)</td>
                  <td>₹{booking.tax.toFixed(2)}</td>
                </tr>
                <tr className="receipt-total-row">
                  <td>Total Payable</td>
                  <td>₹{booking.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <p className="receipt-footnote">
              This receipt confirms your session booking. Payment is collected securely at
              the time of your session. For changes or cancellations, contact support or use
              the Cancel option on your Bookings page.
            </p>
          </div>
        </div>

        <div className="receipt-actions no-print">
          <button className="btn btn-outline" onClick={() => window.print()}>
            Print / Save as PDF
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}