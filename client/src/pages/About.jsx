import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="container">

          <span className="about-badge">
            🌿 About HealMind
          </span>

          <h1>
            Supporting Mental Wellness,
            <br />
            One Conversation at a Time.
          </h1>

          <p>
            HealMind is a trusted online counselling directory designed to help
            individuals connect with qualified mental health professionals.
            Whether you're facing stress, anxiety, career challenges, or
            relationship concerns, we're here to make finding the right
            counsellor simple, secure, and accessible.
          </p>

        </div>
      </section>

      <section className="container about-section">

        <div className="about-grid">

          <div className="about-card">
            <div className="about-icon">🎯</div>
            <h3>Our Mission</h3>

            <p>
              To make mental health support accessible by connecting people
              with experienced counsellors through an easy-to-use digital
              platform.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">👁️</div>
            <h3>Our Vision</h3>

            <p>
              We envision a world where seeking professional mental health
              support is simple, stigma-free, and available to everyone.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🤝</div>
            <h3>Our Values</h3>

            <p>
              Compassion, trust, confidentiality, professionalism, and
              accessibility are at the heart of everything we do.
            </p>
          </div>

        </div>

      </section>

      <section className="container why-about">

        <div className="section-title">
          <span>WHY CHOOSE US</span>

          <h2>Why Thousands Trust HealMind</h2>

          <p>
            We simplify the process of finding the right mental health
            professional while ensuring quality, privacy, and convenience.
          </p>
        </div>

        <div className="about-features">

          <div className="feature-box">
            ✔ Verified Counsellors
          </div>

          <div className="feature-box">
            ✔ Secure Online Booking
          </div>

          <div className="feature-box">
            ✔ Multiple Specializations
          </div>

          <div className="feature-box">
            ✔ Confidential Sessions
          </div>

          <div className="feature-box">
            ✔ Flexible Scheduling
          </div>

          <div className="feature-box">
            ✔ Trusted by Thousands
          </div>

        </div>

      </section>

      <section className="about-cta">

        <div className="container">

          <h2>Start Your Wellness Journey Today</h2>

          <p>
            Browse our experienced counsellors and take the first step toward
            better mental health.
          </p>

          <Link to="/" className="btn btn-primary">
            Find a Counsellor
          </Link>

        </div>

      </section>

    </div>
  );
}