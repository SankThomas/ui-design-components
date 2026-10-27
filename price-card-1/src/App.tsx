import { useState } from "react";
import { Check, Image as ImageIcon, X } from "lucide-react";

const plans = [
  { downloads: 10, price: 99 },
  { downloads: 25, price: 199 },
  { downloads: 50, price: 299 },
  { downloads: 100, price: 499 },
];

export default function App() {
  const [selectedDownloads, setSelectedDownloads] = useState(25);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const selectedPlan = plans.find(
    (plan) => plan.downloads === selectedDownloads,
  );

  function handleSubscribe() {
    setShowConfirmation(true);
  }

  function handleConfirm() {
    // This is where you would trigger payment and create the subscription
    setSubscribed(true);
    setShowConfirmation(false);
  }

  function handleClose() {
    setShowConfirmation(false);
  }

  return (
    <main className="page">
      <section className="pricing-card" aria-label="Basic subscription plan">
        <div className="plan-icon">
          <ImageIcon className="plan-image" strokeWidth={1.8} />
          <span className="plan-label">BASIC</span>
        </div>

        <div className="price-block" aria-live="polite">
          <div className="price-line">
            <span className="currency">KR</span>
            <span className="price">{selectedPlan?.price}</span>
          </div>
          <span className="billing-period">NOK/MONTH</span>
        </div>

        <div className="plan-options">
          <div
            className="download-options"
            role="group"
            aria-label="Downloads per month"
          >
            {plans.map((plan) => (
              <button
                key={plan.downloads}
                type="button"
                className={`download-option ${selectedDownloads === plan.downloads ? "is-selected" : ""}`}
                aria-pressed={selectedDownloads === plan.downloads}
                onClick={() => {
                  setSelectedDownloads(plan.downloads);
                  setSubscribed(false);
                }}
              >
                {plan.downloads}
              </button>
            ))}
          </div>

          <p className="donwload-caption">Downloads per month</p>
        </div>

        <button
          className={`subscribe-button ${subscribed ? "is-subscribed" : ""}`}
          type="button"
          onClick={handleSubscribe}
        >
          {subscribed ? (
            <>
              <Check className="button-icon" />
              Subscribed
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </section>

      {showConfirmation && (
        <div
          className="modal-overlay"
          onClick={handleClose}
          role="presentation"
        >
          <section
            className="confirmation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close dialog"
              onClick={handleClose}
            >
              <X size={20} />
            </button>

            <div className="modal-icon">
              <Check size={24} />
            </div>

            <h2 id="modal-title">Your Basic plan</h2>
            <p className="modal-description">
              Review your subscription selection before continuing.
            </p>

            <div className="modal-summary">
              <div>
                <span>Plan</span>
                <strong>Basic</strong>
              </div>
              <div>
                <span>Downloads</span>
                <strong>{selectedPlan?.downloads} per month</strong>
              </div>
              <div>
                <span>Monthly price</span>
                <strong>KR {selectedPlan?.price} NOK</strong>
              </div>
            </div>

            <button
              type="button"
              className="subscribe-button modal-confirm"
              onClick={handleConfirm}
            >
              Confirm selection
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
