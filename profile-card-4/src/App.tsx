import { Ellipsis, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { DialogState, MenuDialogType, MenuEntry, Profile } from "./data";
import ProfileAvatar from "./ProfileAvatar";
import ProfileActions from "./ProfileActions";
import ProfileMenu from "./ProfileMenu";
import Dialog from "./Dialog";

export default function App() {
  const [profile, setProfile] = useState<Profile>({
    name: "Ildiko Gaspar",
    role: "UX Designer",
    status: "",
  });

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("profile-language") || "English";
    } catch {
      return "English";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("profile-language", language);
    } catch {
      // The preference remains available for the current session.
    }
  }, [language]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [menuNotice, setMenuNotice] = useState("");

  const moreRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleOutside(event: PointerEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutside);

    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [menuOpen]);

  const closeDialog = () => setDialog(null);

  function selectMenuItem(item: MenuEntry) {
    setMenuOpen(false);

    const routes: Record<string, MenuDialogType> = {
      Login: "login",
      Join: "join",
      "Change language": "language",
      "Image & Video API": "api",
      "Apps & Plugins": "plugins",
      FAQ: "faq",
      Partnerships: "partnerships",
      "Imprint & Terms": "legal",
    };

    const type = routes[item.label];

    if (type) {
      setDialog({ type });
    }
  }

  return (
    <main className="profile-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="profile-stage" aria-label="Profile card">
        <article className="profile-card">
          <div className="card-topline">
            <span className="card-brand">
              <span className="brand-mark">T</span>
              <span>studio</span>
            </span>
          </div>

          <ProfileAvatar />

          <div className="profile-identity">
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">{profile.role}</p>
          </div>

          {profile.status && (
            <div className="current-status">
              <span className="status-dot status-available" />
              {profile.status}
            </div>
          )}

          <div className="profile-divider" />

          <ProfileActions
            onStatus={() => setDialog({ type: "status" })}
            onEdit={() => setDialog({ type: "profile" })}
            onToggleMenu={() => setMenuOpen((open) => !open)}
            menuOpen={menuOpen}
          />

          <p className="card-caption">Make yourself at home.</p>

          <div className="menu-anchor" ref={moreRef}>
            <button
              ref={moreButtonRef}
              className="menu-anchor-trigger"
              type="button"
              aria-label={menuOpen ? "Close account menu" : "Open account menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Ellipsis aria-hidden="true" />
              )}
            </button>

            <ProfileMenu
              open={menuOpen}
              onClose={() => {
                setMenuOpen(false);
                moreButtonRef.current?.focus();
              }}
              onSelect={selectMenuItem}
            />
          </div>
        </article>

        <div className="stage-footer">
          <span>DESIGNED WITH INTENTION</span>
          <span className="stage-footer-line" />
          <span>01 / 01</span>
        </div>
      </section>

      {menuNotice && (
        <div className="sr-only" role="status">
          {menuNotice}
        </div>
      )}

      <Dialog
        dialog={dialog}
        profile={profile}
        language={language}
        onClose={closeDialog}
        onSaveProfile={(nextProfile) => {
          setProfile(nextProfile);
        }}
        onSaveStatus={(status) =>
          setProfile((current) => ({ ...current, status }))
        }
        onSaveLanguage={(nextLanguage) => {
          setLanguage(nextLanguage);
          setMenuNotice(`Language preference set to ${nextLanguage}`);
        }}
      />
    </main>
  );
}
