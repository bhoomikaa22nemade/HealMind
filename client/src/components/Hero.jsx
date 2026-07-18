import heroImage from "../assets/counsellor-images/herroo.png";

export default function Hero() {
  const scrollToCounsellors = () => {
    const section = document.getElementById("our-counsellors");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">
          🌿 Trusted Online Counselling Platform
        </span>

        <h1 className="hero-title">
          Your Mental Health <br />
          Matters Every Day.
        </h1>

        <p className="hero-description">
          Connect with verified and experienced counsellors for anxiety,
          stress, relationships, career guidance, and personal growth.
          Find the right support and book confidential online sessions
          anytime, anywhere.
        </p>

        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={scrollToCounsellors}
          >
            Find Counsellor
          </button>

          <button
            className="secondary-btn"
            onClick={scrollToCounsellors}
          >
            Book Session
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <h2>500+</h2>
            <p>Verified Counsellors</p>
          </div>

          <div className="stat-card">
            <h2>10K+</h2>
            <p>Sessions Completed</p>
          </div>

          <div className="stat-card">
            <h2>4.9★</h2>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src={heroImage}
          alt="Online Counselling"
        />
      </div>
    </section>
  );
}