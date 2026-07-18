import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I book a counselling session?",
      answer:
        "Simply browse the counsellor directory, choose the counsellor that best suits your needs, click 'Book Session', and fill in your details.",
    },
    {
      question: "Are my sessions confidential?",
      answer:
        "Yes. Your privacy is our priority. All counselling sessions and personal information remain completely confidential.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Absolutely. You can contact the counsellor or support team to request a new appointment time.",
    },
    {
      question: "Are online counselling sessions effective?",
      answer:
        "Yes. Online counselling offers the same professional guidance while giving you the flexibility to attend sessions from anywhere.",
    },
    {
      question: "How do I choose the right counsellor?",
      answer:
        "Use the search, filters, ratings, experience, and specialization to find the counsellor that best matches your requirements.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="container">

        <div className="section-title">
          <span>FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Find answers to common questions about booking counselling sessions
            and using MindWell.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>

                <div className="faq-icon">
                  {activeIndex === index ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
              </div>

              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "250px" : "0",
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}