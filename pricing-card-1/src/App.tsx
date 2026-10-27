import { useState } from "react";
import { Check, ChevronLeft, X } from "lucide-react";
import { extraOffers, offers } from "./data";

export default function App() {
  const [selected, setSelected] = useState("monthly");
  const [showMore, setShowMore] = useState(false);
  const [checkoutMethod, setCheckoutMethod] = useState<
    "standard" | "paypal" | null
  >(null);
  const [confirmed, setConfirmed] = useState(false);

  const availableOffers = showMore ? [...offers, ...extraOffers] : offers;

  const currentOffer =
    availableOffers.find((offer) => offer.id === selected) ?? offers[0];

  function chooseOffer(id: string) {
    setSelected(id);
    setConfirmed(false);
  }

  function startCheckout(method: "standard" | "paypal") {
    setCheckoutMethod(method);
    setConfirmed(false);
  }

  function closeCheckout() {
    setCheckoutMethod(null);
    setConfirmed(false);
  }

  return (
    <main className="page-shell">
      <section className="offer-card" aria-labelledby="offer-heading">
        <header className="offer-header">
          <h1 id="offer-heading">Try FREE for 4 weeks</h1>
          <p>
            We uncover the facts around the
            <br className="desktop-break" /> clock, all over the globe.
          </p>
        </header>

        <div
          className="offer-list"
          role="radiogroup"
          aria-label="Subscription plan"
        >
          {availableOffers.map((offer) => {
            const isSelected = selected === offer.id;

            return (
              <button
                key={offer.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`offer-option ${isSelected ? "offer-option-selected" : ""}`}
                onClick={() => chooseOffer(offer.id)}
              >
                <span
                  className={`radio-indicator ${isSelected ? "radio-indicator-selected" : ""}`}
                  aria-hidden="true"
                >
                  {isSelected && <Check size={25} strokeWidth={3} />}
                </span>

                <span className="offer-copy">
                  {offer.badge && (
                    <span className="offer-badge">{offer.badge}</span>
                  )}
                  <span className="offer-label">{offer.label}</span>
                  <span className="offer-title">{offer.title}</span>
                  <span className="offer-description">{offer.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="checkout-actions">
          <button
            type="button"
            className="continue-button"
            onClick={() => startCheckout("standard")}
          >
            Continue
          </button>

          <button
            type="button"
            className="paypal-button"
            onClick={() => startCheckout("paypal")}
          >
            <span>Continue with</span>
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>PayPal</title>
              <path d="M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86m6.57 5.546c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z" />
            </svg>
          </button>

          <button
            type="button"
            className="more-offers-link"
            aria-expanded={showMore}
            onClick={() => setShowMore((previous) => !previous)}
          >
            {showMore ? "View fewer offers" : "View more offers"}
          </button>
        </div>
      </section>

      {checkoutMethod && (
        <div
          className="dialog-backdrop"
          onClick={closeCheckout}
          role="presentation"
        >
          <section
            className="checkout-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="dialog-close"
              aria-label="Close checkout"
              onClick={closeCheckout}
            >
              <X size={20} />
            </button>

            {confirmed ? (
              <>
                <div className="dialog-success-icon">
                  <Check size={25} />
                </div>

                <h2 id="checkout-heading">You're all set</h2>
                <p className="dialog-description">
                  Your demo selection has been confirmed. No payment was
                  processed and no subscription was created.
                </p>

                <button
                  type="button"
                  className="continue-button dialog-primary"
                  onClick={closeCheckout}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="dialog-back"
                  onClick={closeCheckout}
                >
                  <ChevronLeft size={17} />
                  Back to offers
                </button>

                <h2 id="checkout-heading">
                  {checkoutMethod === "paypal"
                    ? "Continue with PayPal"
                    : "Review your offer"}
                </h2>
                <p className="dialog-description">
                  You selected the {currentOffer.label.toLowerCase()} plan.
                </p>

                <div className="checkout-summary">
                  <span>{currentOffer.title}</span>
                  <strong>{currentOffer.description}</strong>
                  <span className="summary-method">
                    Payment method:{" "}
                    {checkoutMethod === "paypal"
                      ? "PayPal"
                      : "Standard checkout"}
                  </span>
                </div>

                <button
                  type="button"
                  className="continue-button dialog-primary"
                  onClick={() => setConfirmed(true)}
                >
                  Confirm demo selection
                </button>
                <p className="demo-disclaimer">
                  Demo only. This action will not charge you.
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
