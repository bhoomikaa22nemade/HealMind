import { FaQuoteLeft, FaStar, FaMale, FaFemale } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Aarav Mahajan",
      gender: "male",
      role: "Software Engineer",
      rating: 5,
      text: "HealMind made finding the right counsellor incredibly easy. The booking process was smooth, and my therapist helped me manage work stress with practical strategies.",
    },
    {
      id: 2,
      name: "Kashish Mehta",
      gender: "female",
      role: "College Student",
      rating: 5,
      text: "I was struggling with anxiety before my exams. My counsellor was patient, supportive, and helped me regain confidence. Highly recommended!",
    },
    {
      id: 3,
      name: "Rohan Singhania",
      gender: "male",
      role: "Marketing Executive",
      rating: 5,
      text: "The platform is simple to use and the counsellors are highly professional. Every session has been confidential and genuinely helpful.",
    },
    {
      id: 4,
      name: "Mansi Patil",
      gender: "female",
      role: "Entrepreneur",
      rating: 5,
      text: "Balancing business and personal life became overwhelming. HealMind connected me with a wonderful therapist who helped me build healthier routines.",
    },
    {
      id: 5,
      name: "Pratham Rao",
      gender: "male",
      role: "UX Designer",
      rating: 5,
      text: "The counsellor listened without judgment and gave practical advice I could apply immediately. I noticed positive changes after just a few sessions.",
    },
    {
      id: 6,
      name: "Rakhi Joshi",
      gender: "female",
      role: "HR Professional",
      rating: 5,
      text: "I appreciate how easy it was to schedule appointments. The counsellor made me feel heard and supported throughout my journey.",
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
        {testimonials.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <FaQuoteLeft className="quote-icon" />

            <p className="testimonial-text">{item.text}</p>

            <div className="testimonial-stars">
              {Array.from({ length: item.rating }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <div className="testimonial-user">
              <div className="testimonial-avatar">
                {item.gender === "female" ? <FaFemale /> : <FaMale />}
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