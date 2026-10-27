import { Mail } from "lucide-react";
import { useState, type SubmitEvent } from "react";

export default function PartnershipPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const subject = `Partnership inquiry from ${name.trim()}`;
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      "",
      details.trim(),
    ].join("\n");

    const mailto = `mailto:partnerships@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Replace this placeholder with your real contact address.
    if (mailto.includes("partnerships@example.com")) {
      setError(
        "Set your real partnership email address in PartnershipPanel before sending.",
      );
      return;
    }

    window.location.href = mailto;
  }

  return (
    <form className="dialog-content" onSubmit={submit}>
      <p className="dialog-description">
        Tell us a little about your organization and the opportunity.
      </p>

      <label className="field-label" htmlFor="partner-name">
        Your name or organization
      </label>
      <input
        className="profile-input"
        id="partner-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        maxLength={100}
      />

      <label className="field-label" htmlFor="partner-email">
        Contact email
      </label>
      <input
        className="profile-input"
        id="partner-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label className="field-label" htmlFor="partner-details">
        How would you like to collaborate?
      </label>
      <textarea
        className="profile-input partnership-textarea"
        id="partner-details"
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        required
        minLength={10}
        maxLength={2000}
        rows={4}
        placeholder="Describe your proposal..."
      />

      <button className="dialog-primary" type="submit">
        <Mail aria-hidden="true" />
        Prepare email
      </button>

      {error && (
        <p className="form-feedback" role="alert">
          {error}
        </p>
      )}

      <p className="api-note">
        This form opens your email application once a real recipient is
        configured. It does not submit data to a server.
      </p>
    </form>
  );
}
