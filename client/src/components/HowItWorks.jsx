import {
  FaSearch,
  FaUserCheck,
  FaCalendarAlt,
  FaSmile,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Find a Counsellor",
      description:
        "Browse experienced counsellors based on specialization, ratings and experience.",
    },
    {
      icon: <FaUserCheck />,
      title: "Choose the Right Expert",
      description:
        "Compare counsellors and select the one that best fits your needs.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Book Your Session",
      description:
        "Schedule your counselling session quickly using our easy booking form.",
    },
    {
      icon: <FaSmile />,
      title: "Start Your Journey",
      description:
        "Attend your confidential online session and begin improving your mental well-being.",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="section-title">
        <span>How It Works</span>
        <h2>Your Journey in 4 Simple Steps</h2>
        <p>
          Finding the right counsellor has never been easier.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

            <span className="step-number">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}