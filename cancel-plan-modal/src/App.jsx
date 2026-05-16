import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(["done"]);
  const [confirmText, setConfirmText] = useState("");

  const reasons = [
    {
      id: "difficult",
      label: "The software is too difficult to use.",
    },
    {
      id: "missing",
      label: "Features I need are missing.",
    },
    {
      id: "expensive",
      label: "Too expensive",
    },
    {
      id: "done",
      label: "I am done with this project.",
    },
    {
      id: "different",
      label: "I am using a different software now.",
    },
  ];

  const toggleReason = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-violet-100 px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-violet-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-violet-700"
      >
        Open modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-100/90 px-4 py-8">
          <div className="relative flex w-full max-w-4xl items-center justify-center">
            <div className="absolute h-96 w-80 rounded-3xl bg-violet-200/60" />

            <div className="relative z-10 w-full max-w-md rounded-3xl bg-white px-8 py-8 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Cancel site plan
                </h1>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 transition hover:text-slate-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                </button>
              </div>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                We&apos;re sorry to see you cancel your plan. To help us
                improve, we have a few short questions for you before you leave
                us.
              </p>

              <div className="mt-8">
                <h2 className="text-base font-semibold text-slate-900">
                  Why are you cancelling your plan?
                </h2>

                <div className="mt-5 space-y-4">
                  {reasons.map((reason) => {
                    const checked = selected.includes(reason.id);

                    return (
                      <label
                        key={reason.id}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <button
                          type="button"
                          onClick={() => toggleReason(reason.id)}
                          className={`flex h-6 w-6 items-center justify-center rounded border transition ${
                            checked
                              ? "border-violet-700 bg-white"
                              : "border-slate-400 bg-white"
                          }`}
                        >
                          {checked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-violet-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415 0l-3.25-3.25a1 1 0 111.414-1.42l2.543 2.544 6.543-6.544a1 1 0 011.415 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>

                        <span className="text-lg text-slate-700">
                          {reason.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-lg text-slate-800">
                  Type ‘CANCEL’ to confirm.
                </label>

                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="CANCEL"
                  className="mt-3 h-14 w-full rounded-lg border border-violet-300 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <button className="mt-7 flex h-14 w-full items-center justify-center rounded-lg bg-rose-500 text-lg font-medium text-white transition hover:bg-rose-600">
                Cancel plan
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-5 w-full text-center text-lg font-medium text-slate-400 transition hover:text-slate-600"
              >
                Never mind
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
