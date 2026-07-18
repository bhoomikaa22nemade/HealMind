import { FaQuoteLeft, FaStar, FaMale, FaFemale } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      gender: "female",
      review:
        "HealMind helped me find the perfect counsellor. Booking was quick, easy, and completely confidential. I finally feel heard and supported.",
    },
    {
      name: "Rahul Sharma",
      role: "College Student",
      gender: "male",
      review:
        "Career counselling completely changed my perspective. My counsellor guided me through every step and helped me make confident decisions.",
    },
    {
      name: "Emily Davis",
      role: "Marketing Manager",
      gender: "female",
      review:
        "The platform is clean, professional, and very easy to use. I highly recommend HealMind to anyone looking for trusted mental health support.",
    },
  ];

  return (
    <section className="testimonials">
      <div className="section-title">
        <span>Testimonials</span>

        <h2>What Our Clients Say</h2>

        <p>
          Thousands of people trust HealMind to connect with experienced
          counsellors and improve their mental well-being.
        </p>
      </div>

      <div className="testimonial-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <FaQuoteLeft className="quote-icon" />

            <p className="testimonial-text">{item.review}</p>

            <div className="testimonial-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <div className="testimonial-user">

              <div className="testimonial-avatar">
                {item.gender === "female" ? (
                  <FaFemale />
                ) : (
                  <FaMale />
                )}
              </div>

              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}