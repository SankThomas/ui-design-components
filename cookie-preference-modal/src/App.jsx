import { useMemo, useState } from "react";
import { ChevronUp, Plus } from "lucide-react";

const sections = [
  {
    id: "necessary",
    title: "Strictly Necessary Cookies",
    description:
      "These cookies are essential for the website to function properly and cannot be disabled.",
    locked: true,
  },
  {
    id: "functional",
    title: "Functional Cookies",
    description:
      "These cookies enable enhanced functionality and personalization.",
  },
  {
    id: "performance",
    title: "Performance Cookies",
    description:
      "These cookies help us understand how visitors interact with the website.",
  },
  {
    id: "ads",
    title:
      "Personalised ads and content measurement, audience insights and product development",
    description:
      "These cookies are used to deliver personalised advertising and measure campaign performance.",
  },
];

export default function App() {
  const [expanded, setExpanded] = useState(null);

  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    performance: true,
    ads: false,
  });

  const enabledCount = useMemo(() => {
    return Object.values(preferences).filter(Boolean).length;
  }, [preferences]);

  const toggleSection = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const togglePreference = (id) => {
    if (id === "necessary") return;

    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const rejectAll = () => {
    setPreferences({
      necessary: true,
      functional: false,
      performance: false,
      ads: false,
    });
  };

  const allowAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      performance: true,
      ads: true,
    });
  };

  const submitChoices = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));

    alert("Preferences saved");
  };

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">
      <div className="relative w-full max-w-3xl">
        <div className="absolute left-30 -top-10 hidden h-104 w-88 rounded-[4rem] bg-indigo-950 lg:block" />

        <div className="relative ml-auto w-full max-w-xl rounded-4xl bg-white p-6 shadow-xl sm:p-8">
          <div className="space-y-5">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  About Your Privacy
                </h1>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  We process your data to deliver content or advertisements and
                  measure the delivery of such content or advertisements to
                  extract insights about our website. We share this information
                  with our partners on the basis of consent and legitimate
                  interest.
                </p>
              </div>

              <button
                onClick={allowAll}
                className="inline-flex items-center justify-center rounded-full bg-indigo-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-900"
              >
                Allow all
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Manage Consent Preferences
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {enabledCount} categories enabled
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {sections.map((section) => {
                  const isExpanded = expanded === section.id;
                  const isEnabled = preferences[section.id];

                  return (
                    <div
                      key={section.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                    >
                      <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-200"
                        >
                          {isExpanded ? (
                            <ChevronUp className="size-4" />
                          ) : (
                            <Plus className="size-4" />
                          )}
                        </button>

                        <button
                          onClick={() => toggleSection(section.id)}
                          className="flex-1 text-left"
                        >
                          <p className="text-sm font-medium leading-5 text-slate-800">
                            {section.title}
                          </p>
                        </button>

                        {section.locked ? (
                          <span className="text-sm font-medium text-slate-400">
                            Always Active
                          </span>
                        ) : (
                          <button
                            onClick={() => togglePreference(section.id)}
                            className={`relative flex h-7 w-12 items-center rounded-full transition ${
                              isEnabled ? "bg-indigo-950" : "bg-slate-200"
                            }`}
                          >
                            <span
                              className={`size-5 rounded-full bg-white shadow-sm transition ${
                                isEnabled ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="border-t border-slate-200 px-5 py-4">
                          <p className="text-sm leading-6 text-slate-600">
                            {section.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  onClick={rejectAll}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-900"
                >
                  Reject all
                </button>

                <button
                  onClick={submitChoices}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-900"
                >
                  Submit My Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
