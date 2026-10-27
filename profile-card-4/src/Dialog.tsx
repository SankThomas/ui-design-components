import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import {
  DIALOG_TITLES,
  LANGUAGES,
  STATUS_OPTIONS,
  type DialogState,
  type Profile,
} from "./data";
import { Check, X } from "lucide-react";
import AuthForm from "./AuthForm";
import ApiPanel from "./APIPanel";
import PluginsPanel from "./PluginsPanel";
import FAQPanel from "./FAQPanel";
import PartnershipPanel from "./PartnershipPanel";
import LegalPanel from "./LegalPanel";

export default function Dialog({
  dialog,
  profile,
  language,
  onClose,
  onSaveProfile,
  onSaveStatus,
  onSaveLanguage,
}: {
  dialog: DialogState;
  profile: Profile;
  language: string;
  onClose: () => void;
  onSaveProfile: (profile: Profile) => void;
  onSaveStatus: (status: string) => void;
  onSaveLanguage: (language: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const [draftProfile, setDraftProfile] = useState(profile);
  const [draftStatus, setDraftStatus] = useState(profile.status);
  const [draftLanguage, setDraftLanguage] = useState(language);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setDraftProfile(profile);
    setDraftStatus(profile.status);
    setDraftLanguage(language);
    setFeedback("");
  }, [dialog, profile, language]);

  useEffect(() => {
    if (!dialog) return;

    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("input, select, button")
        ?.focus();
    });

    function handleKeys(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const elements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          [
            "button:not(:disabled)",
            "input:not(:disabled)",
            "select:not(:disabled)",
            "textarea:not(:disabled)",
            "a[href]",
            '[tabindex]:not([tabindex="-1"])',
          ].join(", "),
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.hasAttribute("hidden") &&
          element.getAttribute("aria-hidden") !== "true",
      );

      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeys);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKeys);
      previousFocus.current?.focus();
    };
  }, [dialog, onClose]);

  if (!dialog) return null;

  function submitProfile(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onSaveProfile({
      name: draftProfile.name.trim(),
      role: draftProfile.role.trim(),
      status: profile.status,
    });
    setFeedback("Your profile changes have been saved.");
  }

  const title =
    dialog.type === "status"
      ? "Set a status"
      : dialog.type === "profile"
        ? "Edit profile"
        : dialog.type === "language"
          ? "Language preferences"
          : DIALOG_TITLES[dialog.type];

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="profile-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <header className="dialog-header">
          <div>
            <span className="dialog-kicker">PROFILE SETTINGS</span>
            <h2 id="dialog-title">{title}</h2>
          </div>
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        {dialog.type === "status" && (
          <div className="dialog-content">
            <p className="dialog-description">
              Choose a status to let people know what you are up to.
            </p>

            <div className="status-options">
              {STATUS_OPTIONS.map((option) => (
                <button
                  className={`status-option ${draftStatus === option.label ? "status-option-selected" : ""}`}
                  key={option.label}
                  type="button"
                  onClick={() => setDraftStatus(option.label)}
                  aria-pressed={draftStatus === option.label}
                >
                  <span className={`status-dot status-${option.color}`} />
                  <span>{option.label}</span>
                  {draftStatus === option.label && <Check aria-hidden="true" />}
                </button>
              ))}
              <button
                className={`status-option ${draftStatus === "" ? "status-option-selected" : ""}`}
                type="button"
                onClick={() => setDraftStatus("")}
                aria-pressed={draftStatus === ""}
              >
                <span className="status-dot status-none" />
                <span>Clear status</span>
                {draftStatus === "" && <Check aria-hidden="true" />}
              </button>
            </div>

            <button
              className="dialog-primary"
              type="button"
              onClick={() => {
                onSaveStatus(draftStatus);
                onClose();
              }}
            >
              Save status
            </button>
          </div>
        )}

        {dialog.type === "profile" && (
          <form className="dialog-content" onSubmit={submitProfile}>
            <label className="field-label" htmlFor="display-name">
              Display name
            </label>
            <input
              className="profile-input"
              id="display-name"
              value={draftProfile.name}
              onChange={(event) =>
                setDraftProfile((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              maxLength={60}
              required
            />

            <label className="field-label" htmlFor="profile-role">
              Professional title
            </label>
            <input
              className="profile-input"
              id="profile-role"
              value={draftProfile.role}
              onChange={(event) =>
                setDraftProfile((current) => ({
                  ...current,
                  role: event.target.value,
                }))
              }
              maxLength={80}
              required
            />

            <button className="dialog-primary" type="submit">
              Save changes
            </button>

            {feedback && (
              <p className="form-feedback" role="status">
                <Check aria-hidden="true" /> {feedback}
              </p>
            )}
          </form>
        )}

        {dialog.type === "language" && (
          <div className="dialog-content">
            <p className="dialog-description">
              Select the language you prefer to use.
            </p>
            <label className="field-label" htmlFor="language-select">
              Display language
            </label>
            <select
              className="profile-input"
              id="language-select"
              value={draftLanguage}
              onChange={(event) => setDraftLanguage(event.target.value)}
            >
              {LANGUAGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button
              className="dialog-primary"
              type="button"
              onClick={() => {
                onSaveLanguage(draftLanguage);
                setFeedback(`Preference saved: ${draftLanguage}.`);
              }}
            >
              Apply preference
            </button>
            {feedback && (
              <p className="form-feedback" role="status">
                <Check aria-hidden="true" /> {feedback}
              </p>
            )}
          </div>
        )}

        {dialog.type === "login" && <AuthForm mode="login" onClose={onClose} />}

        {dialog.type === "join" && <AuthForm mode="join" onClose={onClose} />}

        {dialog.type === "api" && <ApiPanel />}

        {dialog.type === "plugins" && <PluginsPanel />}

        {dialog.type === "faq" && <FAQPanel />}

        {dialog.type === "partnerships" && <PartnershipPanel />}

        {dialog.type === "legal" && <LegalPanel />}
      </section>
    </div>
  );
}
