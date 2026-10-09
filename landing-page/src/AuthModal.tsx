import { Sparkles, X } from "lucide-react";
import React, { useState } from "react";

export default function AuthModal({
  mode,
  onClose,
  onSwitch,
}: {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (!email || !password) return;

    setIsSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="auth-icon">
          <Sparkles size={22} />
        </div>

        <h2>{isLogin ? "Welcome back" : "Create an account"}</h2>

        <p>
          {isLogin
            ? "Sign in to continue exploring free UI resources."
            : "Create an account to save and download your favorite designs."}
        </p>

        {isSubmitted ? (
          <div className="success-message">
            <div>
              <Sparkles size={20} />
            </div>

            <strong>
              {isLogin ? "You're signed in!" : "Account created!"}
            </strong>
            <span>Submitted successfully</span>
            <button onClick={onClose}>Continue</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
                required
              />
            </label>

            <button className="auth-submit" type="submit">
              {isLogin ? "Log in" : "Create account"}
            </button>
          </form>
        )}

        {!isSubmitted && (
          <p className="switch-auth">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={onSwitch}>{isLogin ? "Sign up" : "Log in"}</button>
          </p>
        )}
      </div>
    </div>
  );
}
