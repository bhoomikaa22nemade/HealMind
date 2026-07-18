import {
  FaUserShield,
  FaCalendarCheck,
  FaHeart,
  FaLock,
} from "react-icons/fa";

export default function WhyChoose() {
  const features = [
    {
      icon: <FaUserShield />,
      title: "Verified Counsellors",
      desc: "All counsellors are carefully verified with years of professional experience.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      desc: "Book your preferred session within minutes with our simple scheduling system.",
    },
    {
      icon: <FaHeart />,
      title: "Personalized Care",
      desc: "Receive guidance tailored to your emotional well-being and personal goals.",
    },
    {
      icon: <FaLock />,
      title: "100% Confidential",
      desc: "Your conversations remain private and secure with complete confidentiality.",
    },
  ];

  return (
    <section className="why-section">
      <div className="section-heading">
        <span>WHY CHOOSE US</span>
        <h2>Helping You Live a Healthier & Happier Life</h2>
        <p>
          We connect you with trusted mental health professionals who provide
          compassionate, confidential, and personalized counselling.
        </p>
      </div>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}