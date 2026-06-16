import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function App() {
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    alert(`Password submitted\nStay signed in: ${staySignedIn ? "Yes" : "No"}`);
  };

  const handleResetPassword = () => {
    alert("Password reset link sent.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-200 px-6">
      <div className="flex min-h-screen w-full max-w-[960px] items-center justify-center bg-neutral-100">
        <div className="w-full max-w-[520px] rounded-3xl bg-white px-16 py-14 shadow-2xl">
          <h1 className="mb-10 text-[22px] font-bold tracking-[-0.02em] text-slate-900">
            Enter your password
          </h1>

          <div className="mb-8 flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt="Profile"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <p className="text-xs text-slate-700">Business Account</p>

              <p className="text-xl font-semibold text-slate-900">
                Sarah Bills
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Password
            </label>

            <div className="mb-8 flex items-center gap-3">
              <div className="relative flex-1">
                <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                <input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-400 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-700"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="flex items-center justify-center text-slate-600 transition hover:text-slate-900 gap-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>

            <div className="mb-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStaySignedIn((value) => !value)}
                className="flex items-center gap-3"
              >
                <div
                  className={`relative h-8.5 w-18 rounded-full border transition ${staySignedIn ? "border-slate-400 bg-white" : "border-slate-300 bg-slate-900"}`}
                >
                  <div
                    className={`absolute top-1 size-6 rounded-full bg-slate-900 transition-all ${
                      staySignedIn
                        ? "left-1 translate-x-0"
                        : "translate-x-10 bg-white"
                    }`}
                  />
                </div>

                <span className="text-base font-medium text-slate-800">
                  Stay signed in
                </span>
              </button>

              <button
                type="submit"
                className="h-12 rounded-xl bg-slate-900 px-8 text-base font-medium text-white transition hover:bg-slate-800"
              >
                Continue
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              className="text-base font-medium text-slate-900 underline underline-offset-4"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
