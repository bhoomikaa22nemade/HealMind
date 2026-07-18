export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">

        {/* Brand */}
        <div className="footer-col">
          <div className="footer-brand">🧠 HealMind</div>

          <p className="footer-tag">
            Helping you connect with trusted counsellors for anxiety, career,
            relationships, and stress support through a simple and secure
            counselling directory.
          </p>

          <div className="footer-contact">
            <p>📍 Baner, Pune, Maharashtra 411045</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@HealMind.in</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/bookings">My Bookings</a>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4>Categories</h4>
          <a href="/">Anxiety</a>
          <a href="/">Career</a>
          <a href="/">Relationship</a>
          <a href="/">Stress</a>
        </div>

      </div>

      <div className="footer-bottom">
        © HealMind Counsellor Directory.| Built for educational purposes only and not a substitute for professional mental healthcare.
      </div>
    </footer>
  );
}