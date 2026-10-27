import { useEffect, useRef, useState } from "react";
import {
  Check,
  ExternalLink,
  Heart,
  Link as LinkIcon,
  Share2,
  UserRound,
  X,
} from "lucide-react";

const creator = {
  name: "Mae Shaw",
  handle: "@maeshaw",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=85",
  description:
    "If you like my work, consider supporting me on PayPal and help me make a dream come true.",
  stats: [
    { value: "74.3M", label: "Views" },
    { value: "17", label: "Rank" },
    { value: "45M", label: "Downloads" },
  ],
};

// Add the creator's actual PayPal or profile URL when available.
const SUPPORT_URL = "http://localhost:5173";
const PROFILE_URL = typeof window !== "undefined" ? window.location.href : "";

function readFollowing(): boolean {
  try {
    return localStorage.getItem("maeshaw-following") === "true";
  } catch {
    return false;
  }
}

function App() {
  const [following, setFollowing] = useState(readFollowing);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("maeshaw-following", String(following));
    } catch {
      // The follow state still works for the current session.
    }
  }, [following]);

  useEffect(() => {
    if (!profileOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }

      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>(
          "[data-profile-dialog]",
        );

        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [profileOpen]);

  useEffect(() => {
    if (!notice) return;

    const timeout = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function toggleFollowing() {
    setFollowing((current) => {
      const next = !current;
      setNotice(
        next
          ? `You are now following ${creator.name}.`
          : `You unfollowed ${creator.name}.`,
      );
      return next;
    });
  }

  async function shareProfile() {
    const shareData = {
      title: `${creator.name} — Creator Profile`,
      text: `Check out ${creator.name}'s creator profile.`,
      url: PROFILE_URL,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setNotice("Profile shared.");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setNotice("Profile link copied to clipboard.");
        window.setTimeout(() => setCopied(false), 2000);
        return;
      }

      setNotice("Sharing is not supported in this browser.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setNotice("Unable to share the profile. Please try again.");
    }
  }

  return (
    <main className="profile-page">
      <div className="profile-glow profile-glow-one" aria-hidden="true" />
      <div className="profile-glow profile-glow-two" aria-hidden="true" />

      <article className="profile-card">
        <div className="profile-card-inner">
          <div className="profile-avatar-wrap">
            {avatarFailed ? (
              <div
                className="profile-avatar profile-avatar-fallback"
                role="img"
                aria-label={`${creator.name}'s avatar`}
              >
                <UserRound aria-hidden="true" />
              </div>
            ) : (
              <img
                className="profile-avatar"
                src={creator.avatar}
                alt={`${creator.name}'s profile`}
                onError={() => setAvatarFailed(true)}
              />
            )}
          </div>

          <div className="profile-content">
            <div className="profile-heading-row">
              <div>
                <h1 className="profile-heading">{creator.name}</h1>
                <p className="profile-handle">{creator.handle}</p>
              </div>

              <button
                type="button"
                className="profile-icon-button"
                onClick={shareProfile}
                aria-label="Share profile"
                title="Share profile"
              >
                {copied ? (
                  <Check aria-hidden="true" />
                ) : (
                  <Share2 aria-hidden="true" />
                )}
              </button>
            </div>

            <p className="profile-description">{creator.description}</p>

            <dl className="profile-stats" aria-label="Creator statistics">
              {creator.stats.map((stat) => (
                <div className="profile-stat" key={stat.label}>
                  <dt className="profile-stat-value">{stat.value}</dt>
                  <dd className="profile-stat-label">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <div className="profile-actions">
              <button
                type="button"
                className={`profile-button ${
                  following
                    ? "profile-button-following"
                    : "profile-button-primary"
                }`}
                onClick={toggleFollowing}
                aria-pressed={following}
              >
                {following ? (
                  <>
                    <Check aria-hidden="true" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart aria-hidden="true" />
                    Follow
                  </>
                )}
              </button>

              <button
                type="button"
                className="profile-button profile-button-secondary"
                onClick={() => setProfileOpen(true)}
              >
                <UserRound aria-hidden="true" />
                View profile
              </button>
            </div>

            {SUPPORT_URL && (
              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noreferrer"
                className="profile-support-link"
              >
                Support {creator.name}
                <ExternalLink aria-hidden="true" />
              </a>
            )}

            {notice && (
              <p className="profile-notice" role="status" aria-live="polite">
                <Check className="mr-2 inline size-4" />
                {notice}
              </p>
            )}
          </div>
        </div>
      </article>

      {profileOpen && (
        <div
          className="profile-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setProfileOpen(false);
            }
          }}
        >
          <section
            className="profile-dialog"
            data-profile-dialog
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-dialog-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {avatarFailed ? (
                  <div className="profile-dialog-avatar-fallback">
                    <UserRound aria-hidden="true" />
                  </div>
                ) : (
                  <img
                    src={creator.avatar}
                    alt=""
                    className="size-14 rounded-full border-2 border-slate-100 object-cover"
                    onError={() => setAvatarFailed(true)}
                  />
                )}

                <div>
                  <h2
                    id="profile-dialog-title"
                    className="text-xl font-extrabold"
                  >
                    {creator.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {creator.handle}
                  </p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="profile-dialog-close"
                onClick={() => setProfileOpen(false)}
                aria-label="Close profile"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              {creator.description}
            </p>

            <dl className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4">
              {creator.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-extrabold">{stat.value}</dt>
                  <dd className="mt-1 text-xs text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className={`profile-button ${
                  following
                    ? "profile-button-following"
                    : "profile-button-primary"
                }`}
                onClick={toggleFollowing}
              >
                {following ? (
                  <>
                    <Check aria-hidden="true" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart aria-hidden="true" />
                    Follow Mae
                  </>
                )}
              </button>

              <button
                type="button"
                className="profile-button profile-button-secondary"
                onClick={shareProfile}
              >
                <LinkIcon aria-hidden="true" />
                Copy / share link
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Creator profile preview
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
