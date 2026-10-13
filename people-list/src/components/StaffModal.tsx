import { useEffect } from "react";
import { Mail, X } from "lucide-react";
import type { StaffMember } from "../data/staff";

interface StaffModalProps {
  person: StaffMember;
  onClose: () => void;
}

export default function StaffModal({ person, onClose }: StaffModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="staff-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-modal-title"
        aria-describedby="staff-modal-role"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close staff profile"
          autoFocus
        >
          <X size={19} />
        </button>

        <div className="modal-profile">
          <img
            className="modal-avatar"
            src={person.image}
            alt={person.name}
            width={104}
            height={104}
          />

          <span className="modal-department">{person.department}</span>

          <h2 id="staff-modal-title" className="modal-name">
            {person.name}
          </h2>

          <p id="staff-modal-role" className="modal-role">
            {person.role}
          </p>
        </div>

        <div className="modal-divider" />

        <div className="modal-contact">
          <p className="modal-section-label">CONTACT INFORMATION</p>

          <a className="modal-contact-link" href={`mailto:${person.email}`}>
            <span className="modal-contact-icon">
              <Mail size={18} />
            </span>

            <span className="modal-contact-text">
              <span className="modal-contact-label">Email</span>
              <span className="modal-contact-value">{person.email}</span>
            </span>
          </a>

          <a
            className="modal-contact-link"
            href={`https://twitter.com/${person.twitter}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="modal-contact-icon">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
              >
                <title>X</title>
                <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
              </svg>
            </span>

            <span className="modal-contact-text">
              <span className="modal-contact-label">Twitter</span>
              <span className="modal-contact-value">@{person.twitter}</span>
            </span>
          </a>
        </div>

        <button type="button" className="modal-done" onClick={onClose}>
          Close profile
        </button>
      </section>
    </div>
  );
}
