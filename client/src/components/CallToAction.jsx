import { FaArrowRight } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-content">

        <span className="cta-tag">
          🌿 Begin Your Wellness Journey
        </span>

        <h2>
          Take the First Step Towards
          <br />
          Better Mental Health
        </h2>

        <p>
          Whether you're dealing with stress, anxiety, relationship challenges,
          or career uncertainty, our experienced counsellors are here to guide
          and support you every step of the way.
        </p>

        <div className="cta-buttons">
  <button
    className="btn btn-primary"
    onClick={() => {
      document
        .getElementById("our-counsellors")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
  >
    Find Counsellor
  </button>

  <button
    className="btn btn-outline"
    onClick={() => {
      document
        .getElementById("our-counsellors")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
  >
    Book Session →
  </button>
</div>

      </div>
    </section>
  );
}