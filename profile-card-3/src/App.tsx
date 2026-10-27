import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  MapPin,
  Menu,
  Palette,
  Share2,
  UserRound,
  X,
} from "lucide-react";

type DialogType = "profile" | "content" | null;

const profile = {
  name: "Daniel Joffrion",
  handle: "@danieljoffrion",
  location: "Atlanta, GA",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&h=320&q=85",
  description:
    "Creative professional exploring digital experiences, design, and technology.",
};

const projects = [
  {
    title: "Digital experiences",
    description: "Thoughtful interfaces built around people.",
    category: "Design",
    icon: Palette,
  },
  {
    title: "Creative experiments",
    description: "Ideas, prototypes, and things in progress.",
    category: "Exploration",
    icon: Code2,
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogType>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const avatar = avatarFailed ? null : profile.avatar;

  function openDialog(nextDialog: Exclude<DialogType, null>) {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setMenuOpen(false);
    setDialog(nextDialog);
  }

  function closeDialog() {
    setDialog(null);
  }

  useEffect(() => {
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDialog();
        return;
      }

      if (event.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      window.setTimeout(() => {
        if (previousFocusRef.current?.isConnected) {
          previousFocusRef.current.focus();
        }
      }, 0);
    };
  }, [dialog]);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  async function shareProfile() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.name} — Creator Profile`,
          text: `Discover ${profile.name}'s profile.`,
          url,
        });
        setNotice("Share action completed.");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
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

      setNotice("Could not share the profile. Please try again.");
    }
  }

  return (
    <main className="profile-page">
      <div className="ambient ambient-top" aria-hidden="true" />
      <div className="ambient ambient-bottom" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <div className="profile-scene">
        <div className="profile-backplate" aria-hidden="true">
          <span className="backplate-highlight" />
        </div>

        <article className="creator-card">
          <header className="card-toolbar">
            <span className="creator-label">
              <span className="creator-label-dot" />
              CREATOR PROFILE
            </span>

            <div className="menu-container" ref={menuRef}>
              <button
                ref={menuButtonRef}
                type="button"
                className="icon-button menu-trigger"
                aria-label={
                  menuOpen ? "Close profile menu" : "Open profile menu"
                }
                aria-expanded={menuOpen}
                aria-controls="profile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>

              {menuOpen && (
                <div
                  className="profile-menu"
                  id="profile-menu"
                  role="menu"
                  aria-label="Profile actions"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => openDialog("profile")}
                  >
                    <UserRound />
                    About Daniel
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => openDialog("content")}
                  >
                    <ExternalLink />
                    Explore content
                  </button>

                  <button type="button" role="menuitem" onClick={shareProfile}>
                    <Share2 />
                    Share profile
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="creator-body">
            <div className="avatar-frame">
              {avatar ? (
                <img
                  className="creator-avatar"
                  src={avatar}
                  alt={`${profile.name}'s portrait`}
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <div
                  className="creator-avatar avatar-fallback"
                  role="img"
                  aria-label={`${profile.name}'s profile image unavailable`}
                >
                  <UserRound />
                </div>
              )}

              <span className="avatar-status" title="Profile available" />
            </div>

            <h1 className="creator-name">{profile.name}</h1>
            <p className="creator-handle">{profile.handle}</p>

            <p className="creator-location">
              <MapPin aria-hidden="true" />
              {profile.location}
            </p>

            <p className="creator-description">{profile.description}</p>

            <div className="creator-divider" />

            <button
              type="button"
              className="content-button"
              onClick={() => openDialog("content")}
            >
              View content
              <ArrowUpRight aria-hidden="true" />
            </button>

            <button
              type="button"
              className="share-button"
              onClick={shareProfile}
            >
              {copied ? (
                <Check aria-hidden="true" />
              ) : (
                <Share2 aria-hidden="true" />
              )}
              {copied ? "Link copied" : "Share profile"}
            </button>
          </div>

          <footer className="card-footer">
            <span>DESIGNED TO CONNECT</span>
            <span className="footer-indicator" aria-hidden="true" />
          </footer>
        </article>

        <p className="scene-caption">A little space for creativity.</p>
      </div>

      {notice && (
        <div className="toast-message" role="status" aria-live="polite">
          <Check aria-hidden="true" />
          {notice}
        </div>
      )}

      {dialog && (
        <div
          className="dialog-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <section
            ref={dialogRef}
            className="profile-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <header className="dialog-header">
              <div>
                <p className="dialog-eyebrow">
                  {dialog === "content" ? "THE PORTFOLIO" : "THE CREATOR"}
                </p>
                <h2 id="dialog-title">
                  {dialog === "content" ? "Explore content" : "About Daniel"}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="icon-button dialog-close"
                aria-label="Close dialog"
                onClick={closeDialog}
              >
                <X />
              </button>
            </header>

            {dialog === "profile" ? (
              <div className="about-panel">
                <div className="about-identity">
                  {avatar ? (
                    <img src={avatar} alt="" />
                  ) : (
                    <UserRound aria-hidden="true" />
                  )}

                  <div>
                    <h3>{profile.name}</h3>
                    <p>{profile.handle}</p>
                  </div>
                </div>

                <p className="about-description">{profile.description}</p>

                <p className="dialog-location">
                  <MapPin aria-hidden="true" />
                  {profile.location}
                </p>
              </div>
            ) : (
              <div className="project-list">
                {projects.map((project, index) => {
                  const ProjectIcon = project.icon;

                  return (
                    <article className="project-item" key={project.title}>
                      <div className={`project-icon project-icon-${index}`}>
                        <ProjectIcon aria-hidden="true" />
                      </div>

                      <div className="project-copy">
                        <span>{project.category}</span>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>

                      <ArrowUpRight
                        className="project-arrow"
                        aria-hidden="true"
                      />
                    </article>
                  );
                })}

                <p className="content-disclaimer">
                  These are example content categories. Replace them with
                  Daniel's actual projects and links.
                </p>
              </div>
            )}

            <button type="button" className="dialog-done" onClick={closeDialog}>
              Close
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
