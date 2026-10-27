import { useState } from "react";
import { FAQ_ITEMS } from "./data";

export default function FAQPanel() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="dialog-content">
      <p className="dialog-description">
        Quick answers about using your profile.
      </p>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = expanded === index;

          return (
            <section className="faq-item" key={item.question}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-indicator">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && <p className="faq-answer">{item.answer}</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}
