import {
  Link as LinkIcon,
  MapPin,
  Pencil,
  Check,
  MessageCircle,
} from "lucide-react";
import type { Profile } from "../data";

type ProfileHeaderProps = {
  profile: Profile;
  isFollowing: boolean;
  onEdit: () => void;
  onMessage: () => void;
  onToggleFollow: () => void;
};

export default function ProfileHeader({
  profile,
  isFollowing,
  onEdit,
  onMessage,
  onToggleFollow,
}: ProfileHeaderProps) {
  return (
    <>
      <button
        className="edit-profile-button"
        type="button"
        aria-label="Edit profile"
        onClick={onEdit}
      >
        <Pencil size={19} strokeWidth={1.7} />
      </button>

      <header className="profile-header">
        <div className="avatar-ring">
          <img
            className="profile-avatar"
            src={profile.avatar}
            alt={`${profile.name}'s profile`}
          />
        </div>

        <div className="profile-details">
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-title">{profile.title}</p>

          <div className="profile-meta">
            <span className="meta-item">
              <MapPin size={18} />
              {profile.location}
            </span>

            <a
              className="meta-item meta-link"
              href={`https://twitter.com/${encodeURIComponent(profile.handle)}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="twitter-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 5.9a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8A11.9 11.9 0 0 1 2.9 4.8a4.2 4.2 0 0 0 1.3 5.6 4.1 4.1 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 1.5 19a11.8 11.8 0 0 0 18.2-10 8.5 8.5 0 0 0 2.3-2.2Z" />
              </svg>
              {profile.handle}
            </a>

            <a
              className="meta-item meta-link"
              href={
                profile.website.startsWith("http")
                  ? profile.website
                  : `https://${profile.website}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon size={17} />
              {profile.website}
            </a>
          </div>

          <div className="profile-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={onMessage}
            >
              <MessageCircle className="action-icon" size={16} />
              Send a message
            </button>

            <button
              className={`button ${
                isFollowing ? "button-outline" : "button-primary"
              }`}
              type="button"
              aria-pressed={isFollowing}
              onClick={onToggleFollow}
            >
              {isFollowing && <Check className="action-icon" size={16} />}
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
