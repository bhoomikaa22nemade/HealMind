import Avatar from "./Avatars.jsx";

export default function CounsellorCard({ counsellor, onBook, style }) {
  const {
    name,
    specialization,
    experience,
    rating,
    fee,
    availability,
    bio,
    gender,
  } = counsellor;

  const isAvailable = availability.toLowerCase() === "available";

  return (
    <article className="counsellor-card" style={style}>
      <div className="card-top">
        <Avatar gender={gender} size={64} className="card-avatar" />
        <div>
          <h3 className="card-name">{name}</h3>
          <span className="card-spec">{specialization}</span>
        </div>
      </div>

      <p className="card-bio">{bio}</p>

      <div className="card-stats">
        <div className="card-stat">
          <span className="label">Experience</span>
          <span className="value">{experience} yrs</span>
        </div>
        <div className="card-stat">
          <span className="label">Rating</span>
          <span className="value">
            <span className="rating-star">★</span> {rating.toFixed(1)}
          </span>
        </div>
        <div className="card-stat">
          <span className="label">Session Fee</span>
          <span className="value">₹{fee}</span>
        </div>
        <div className="card-stat">
          <span className="label">Availability</span>
          <span className={`availability ${isAvailable ? "available" : "busy"}`}>
            <span className="dot" />
            {availability}
          </span>
        </div>
      </div>

      <div className="card-footer">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => onBook(counsellor)}
        >
          Book Session
        </button>
      </div>
    </article>
  );
}
