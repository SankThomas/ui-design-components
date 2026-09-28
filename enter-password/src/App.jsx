import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const API_URL = "https://dummyjson.com";

export default function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: "emilys",
          password,
          expiresInMins: staySignedIn ? 30 : 5,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid password.");
        return;
      }

      setUser(data);
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = () => {
    alert("Password reset functionality is not available in this demo.");
  };

  const handleLogout = () => {
    setUser(null);
    setPassword("");
  };

  if (user) {
    return (
      <main className="app">
        <div className="app-container">
          <div className="password-card">
            <h1 className="password-title">Welcome back</h1>

            <div className="account-info">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="profile-image"
              />

              <div>
                <p className="account-type">Business Account</p>

                <p className="account-name">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>

            <p className="account-email">{user.email}</p>

            <div className="authenticated-actions">
              <button
                type="button"
                onClick={handleLogout}
                className="continue-button"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <div className="app-container">
        <div className="password-card">
          <h1 className="password-title">Enter your password</h1>

          <div className="account-info">
            <img
              src="https://dummyjson.com/icon/emilys/128"
              alt="Emily Johnson"
              className="profile-image"
            />

            <div>
              <p className="account-type">Business Account</p>

              <p className="account-name">Emily Johnson</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="password" className="password-label">
              Password
            </label>

            <div className="password-input-row">
              <div className="password-input-wrapper">
                <Lock className="password-icon" aria-hidden="true" />

                <input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "password-error" : undefined}
                  className={`password-input ${
                    error ? "password-input-error" : ""
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="password-visibility-button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="visibility-icon" aria-hidden="true" />
                ) : (
                  <Eye className="visibility-icon" aria-hidden="true" />
                )}
              </button>
            </div>

            {error && (
              <p id="password-error" className="password-error" role="alert">
                {error}
              </p>
            )}

            <div className="password-actions">
              <button
                type="button"
                onClick={() => setStaySignedIn((value) => !value)}
                className="stay-signed-in"
                aria-pressed={staySignedIn}
              >
                <div
                  className={`stay-signed-in-switch ${
                    staySignedIn
                      ? "stay-signed-in-switch-active"
                      : "stay-signed-in-switch-inactive"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`stay-signed-in-indicator ${
                      staySignedIn
                        ? "stay-signed-in-indicator-active"
                        : "stay-signed-in-indicator-inactive"
                    }`}
                  />
                </div>

                <span className="stay-signed-in-label">Stay signed in</span>
              </button>

              <button
                type="submit"
                className="continue-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Continue"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              className="reset-password-button"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
