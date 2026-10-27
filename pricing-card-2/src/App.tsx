import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { plans, type Plan } from "./data";

export default function App() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const closeDialog = () => setActivePlan(null);

  useEffect(() => {
    if (!activePlan) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePlan]);

  const confirmSelection = () => {
    if (!activePlan) return;

    setSelectedPlan(activePlan);
    closeDialog();
  };

  return (
    <main className="pricing-page">
      <section className="pricing-frame" aria-label="Pricing plans">
        <div className="pricing-panel">
          <div className="pricing-grid">
            {plans.map((plan) => {
              const isSelected = selectedPlan?.id === plan.id;

              return (
                <article className="plan-card" key={plan.id}>
                  <h2 className="plan-name">{plan.name}</h2>

                  <p className="plan-price">
                    <span className="plan-currency">$</span>
                    <span className="plan-amount">{plan.price}</span>
                  </p>

                  <p className="plan-billing">{plan.billing}</p>

                  <p className="plan-description">{plan.description}</p>

                  <button
                    type="button"
                    className={`plan-button ${plan.buttonClass}`}
                    onClick={() => setActivePlan(plan)}
                    aria-label={`${plan.buttonLabel} - ${plan.name} plan`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="mr-2 size-4" /> Selected
                      </>
                    ) : (
                      plan.buttonLabel
                    )}
                  </button>
                </article>
              );
            })}
          </div>

          {selectedPlan && (
            <div className="selection-message" role="status" aria-live="polite">
              <p className="flex items-center gap-2 font-bold">
                <Check className="size-4 text-emerald-600" />
                {selectedPlan.name} plan selected
              </p>

              <p className="mt-1 text-slate-600">
                {selectedPlan.price === 0
                  ? "You selected the free plan."
                  : `You selected $${selectedPlan.price} per user per month.`}{" "}
                This is a demo; no subscription has been created.
              </p>

              <button
                type="button"
                onClick={() => setActivePlan(selectedPlan)}
                className="mt-3 text-sm font-bold underline underline-offset-4"
              >
                Change plan
              </button>
            </div>
          )}
        </div>
      </section>

      {activePlan && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog();
            }
          }}
        >
          <section
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            aria-modal="true"
            role="dialog"
            className="modal-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Your plan
                </p>
                <h2
                  id="dialog-title"
                  className="mt-2 text-2xl font-extrabold text-slate-900"
                >
                  {activePlan.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeDialog}
                className="modal-close"
                aria-label="Close dialog"
                autoFocus
              >
                <X className="size-5" />
              </button>
            </div>

            <p
              id="dialog-description"
              className="mt-4 text-sm leading-relaxed text-slate-600"
            >
              {activePlan.description}{" "}
              {activePlan.price === 0
                ? "This plan is free for your whole team."
                : `The listed price is $${activePlan.price} per user per month.`}
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Plan price</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                ${activePlan.price}
                {activePlan.price > 0 && (
                  <span className="ml-1 text-sm font-medium text-slate-500">
                    / user / month
                  </span>
                )}
              </p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Demo only. Confirming will update your selected plan locally. No
              payment or subscription will be created.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDialog}
                className="modal-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmSelection}
                className={`modal-primary ${activePlan.buttonClass}`}
              >
                Confirm selection
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
