import { useState } from "react";
import { Check, MapPin } from "lucide-react";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80",
];

export default function App() {
  const [isAttending, setIsAttending] = useState(false);

  const attendeeCount = isAttending ? 27 : 26;

  return (
    <main className="page-container">
      <article className="event-frame" aria-label="Event card">
        <section className="event-card">
          <p className="event-meta">
            Wed Nov 24, 2026 &nbsp; &middot; &nbsp; 6:00 EAT
          </p>

          <h1 className="event-title">Sustainability in Product Design</h1>

          <div className="event-location">
            <MapPin size={23} strokeWidth={2} aria-hidden="true" />

            <span>Oslo</span>
          </div>

          <footer className="event-footer">
            <div
              className="attendee-stack"
              aria-label={`${attendeeCount} attendees`}
            >
              {avatars.map((avatar, index) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt={`Attendee ${index + 1}`}
                  className="attendee-avatar"
                />
              ))}

              <span className="attendee-more">+{isAttending ? 24 : 23}</span>
            </div>

            <button
              type="button"
              className={`attend-button ${isAttending ? "is-attending" : ""}`}
              aria-pressed={isAttending}
              onClick={() => setIsAttending((current) => !current)}
            >
              {isAttending ? (
                <>
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  Attending
                </>
              ) : (
                "Attend"
              )}
            </button>
          </footer>
        </section>
      </article>
    </main>
  );
}
