import { FaQuoteLeft, FaStar, FaMale, FaFemale } from "react-icons/fa";

export default function Testimonials() {
const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    gender: "male",
    role: "Software Engineer",
    rating: 5,
    text: "HealMind made finding the right counsellor incredibly easy. The booking process was smooth, and my therapist helped me manage work stress with practical strategies.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    gender: "female",
    role: "College Student",
    rating: 5,
    text: "I was struggling with anxiety before my exams. My counsellor was patient, supportive, and helped me regain confidence. Highly recommended!",
  },
  {
    id: 3,
    name: "Rohan Verma",
    gender: "male",
    role: "Marketing Executive",
    rating: 5,
    text: "The platform is simple to use and the counsellors are highly professional. Every session has been confidential and genuinely helpful.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    gender: "female",
    role: "Entrepreneur",
    rating: 5,
    text: "Balancing business and personal life became overwhelming. HealMind connected me with a wonderful therapist who helped me build healthier routines.",
  },
  {
    id: 5,
    name: "Aditya Rao",
    gender: "male",
    role: "UX Designer",
    rating: 5,
    text: "The counsellor listened without judgment and gave practical advice I could apply immediately. I noticed positive changes after just a few sessions.",
  },
  {
    id: 6,
    name: "Neha Joshi",
    gender: "female",
    role: "HR Professional",
    rating: 5,
    text: "I appreciate how easy it was to schedule appointments. The counsellor made me feel heard and supported throughout my journey.",
  },
  {
    id: 7,
    name: "Vikram Singh",
    gender: "male",
    role: "Project Manager",
    rating: 5,
    text: "Excellent platform with experienced counsellors. It helped me improve my work-life balance and communicate better with my family.",
  },
  {
    id: 8,
    name: "Ananya Das",
    gender: "female",
    role: "Teacher",
    rating: 5,
    text: "HealMind gave me the confidence to seek professional help. The sessions were insightful, comforting, and truly life-changing.",
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

     <p className="testimonial-text">{item.text}</p>

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