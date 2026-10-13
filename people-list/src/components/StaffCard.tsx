import { Mail, ExternalLink } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import type { StaffMember } from "../data/staff";

interface StaffCardProps {
  person: StaffMember;
  onOpen: (person: StaffMember) => void;
}

export default function StaffCard({ person, onOpen }: StaffCardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(person);
    }
  }

  function handleClick(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a")) return;
    onOpen(person);
  }

  return (
    <article
      className="staff-card"
      role="group"
      aria-label={`${person.name}, ${person.role}. Open profile`}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="staff-avatar-wrap">
        <img
          className="staff-avatar"
          src={person.image}
          alt={person.name}
          loading="lazy"
          width={88}
          height={88}
        />
      </div>

      <div className="staff-details">
        <h2 className="staff-name">{person.name}</h2>
        <p className="staff-role">{person.role}</p>

        <div className="staff-links">
          <a
            className="staff-link"
            href={`mailto:${person.email}`}
            aria-label={`Email ${person.name}`}
          >
            <Mail size={15} aria-hidden="true" />
            <span>Email</span>
          </a>

          <span className="staff-separator" aria-hidden="true">
            ·
          </span>

          <a
            className="staff-link"
            href={`https://twitter.com/${person.twitter}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${person.name} on Twitter`}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-3"
            >
              <title>X</title>
              <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
            </svg>
            <span>Twitter</span>
            <ExternalLink
              className="staff-external-icon"
              size={11}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
