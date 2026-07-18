import { FaUserMd, FaSmile, FaStar, FaClock } from "react-icons/fa";

export default function Stats() {
  const stats = [
    {
      icon: <FaUserMd />,
      number: "500+",
      title: "Verified Counsellors",
    },
    {
      icon: <FaSmile />,
      number: "10,000+",
      title: "Happy Clients",
    },
    {
      icon: <FaStar />,
      number: "4.9",
      title: "Average Rating",
    },
    {
      icon: <FaClock />,
      number: "24/7",
      title: "Online Support",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-box" key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <h2>{stat.number}</h2>
            <p>{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}