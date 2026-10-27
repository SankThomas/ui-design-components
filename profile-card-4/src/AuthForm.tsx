import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState, type SubmitEvent } from "react";

export default function AuthForm({
  mode,
  onClose,
}: {
  mode: "login" | "join";
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const isJoin = mode === "join";

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (isJoin && password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }

    setBusy(true);

    // Never store passwords in localStorage.
    window.setTimeout(() => {
      setBusy(false);
      setMessage(
        "The form is valid, but authentication is not configured yet. Connect an authentication provider to continue.",
      );
    }, 350);
  }

  return (
    <form className="dialog-content" onSubmit={submit}>
      <p className="dialog-description">
        {isJoin
          ? "Create an account to get started."
          : "Enter your account details to sign in."}
      </p>

      <label className="field-label" htmlFor="auth-email">
        Email address
      </label>
      <input
        className="profile-input"
        id="auth-email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label className="field-label" htmlFor="auth-password">
        Password
      </label>
      <div className="password-field">
        <input
          className="profile-input"
          id="auth-password"
          type={showPassword ? "text" : "password"}
          autoComplete={isJoin ? "new-password" : "current-password"}
          placeholder="At least 8 characters"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button
          className="password-toggle"
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {isJoin && (
        <>
          <label className="field-label" htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            className="profile-input"
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </>
      )}

      <button className="dialog-primary" type="submit" disabled={busy}>
        {busy ? "Please wait..." : isJoin ? "Create account" : "Sign in"}
      </button>

      {message && (
        <p className="form-feedback auth-feedback" role="status">
          {message}
        </p>
      )}

      <p className="auth-note">
        <ShieldCheck aria-hidden="true" />
        Your password is not stored by this demo.
      </p>

      <button className="dialog-text-button" type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}


