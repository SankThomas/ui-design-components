import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

type PaymentMethod = "card" | "later";

function App() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("later");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [rememberCard, setRememberCard] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  const handleCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(event.target.value));
    setErrors((previous) => ({ ...previous, cardNumber: "" }));
  };

  const handleExpiry = (event: ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(event.target.value));
    setErrors((previous) => ({ ...previous, expiry: "" }));
  };

  const handleCvc = (event: ChangeEvent<HTMLInputElement>) => {
    setCvc(event.target.value.replace(/\D/g, "").slice(0, 4));
    setErrors((previous) => ({ ...previous, cvc: "" }));
  };

  const handlePaymentChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setErrors({});
    setSubmitted(false);
  };

  const validateCard = () => {
    const nextErrors: Record<string, string> = {};
    const digits = cardNumber.replace(/\D/g, "");
    const [month, year] = expiry.split("/");

    if (digits.length < 13 || digits.length > 19) {
      nextErrors.cardNumber = "Enter a valid card number.";
    }

    if (
      !month ||
      !year ||
      Number(month) < 1 ||
      Number(month) > 12 ||
      year.length !== 2
    ) {
      nextErrors.expiry = "Enter a valid expiry date.";
    } else {
      const currentDate = new Date();
      const expiryMonth = Number(month);
      const expiryYear = 2000 + Number(year);

      if (
        expiryYear < currentDate.getFullYear() ||
        (expiryYear === currentDate.getFullYear() &&
          expiryMonth < currentDate.getMonth() + 1)
      ) {
        nextErrors.expiry = "This card has expired.";
      }
    }

    if (![3, 4].includes(cvc.length)) {
      nextErrors.cvc = "Enter a valid security code.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (paymentMethod === "card") {
      const nextErrors = validateCard();
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  return (
    <main className="payment-page">
      <section className="payment-card" aria-labelledby="payment-title">
        {submitted ? (
          <div className="success-panel" role="status">
            <div className="success-icon">
              <CheckCircle2 size={32} strokeWidth={1.8} />
            </div>

            <h1 className="payment-title">You're all set!</h1>

            <p className="success-description">
              {paymentMethod === "later"
                ? "Your pay-later option has been selected. You can pay within 30 days."
                : "Your payment details have passed the demo validation."}
            </p>

            <div className="success-summary">
              <ShieldCheck size={20} />
              <span>
                {paymentMethod === "later"
                  ? "Payment due within 30 days"
                  : `Card ending in ${cardNumber.replace(/\D/g, "").slice(-4)}`}
              </span>
            </div>

            <button
              className="continue-button"
              type="button"
              onClick={handleBack}
            >
              <ArrowLeft size={16} />
              BACK TO PAYMENT
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h1 id="payment-title" className="payment-title">
              Payment
            </h1>

            <div className="payment-options">
              <div className="payment-option">
                <button
                  type="button"
                  className={`payment-radio ${paymentMethod === "card" ? "is-selected" : ""}`}
                  role="radio"
                  aria-checked={paymentMethod === "card"}
                  aria-label="Pay with a card"
                  onClick={() => handlePaymentChange("card")}
                >
                  {paymentMethod === "card" && <span className="radio-dot" />}
                </button>

                <div className="payment-option-content">
                  <button
                    type="button"
                    className="payment-option-title"
                    onClick={() => handlePaymentChange("card")}
                  >
                    Card
                  </button>

                  <p className="payment-description">Pay with a card</p>

                  {paymentMethod === "card" && (
                    <div className="card-fields">
                      <label className="field-row">
                        <CreditCard className="field-icon" size={24} />
                        <input
                          aria-label="Card number"
                          autoComplete="cc-number"
                          inputMode="numeric"
                          placeholder="Card number"
                          value={cardNumber}
                          onChange={handleCardNumber}
                          maxLength={23}
                        />
                      </label>
                      {errors.cardNumber && (
                        <p className="field-error">{errors.cardNumber}</p>
                      )}

                      <div className="split-fields">
                        <label className="field-row">
                          <CreditCard className="field-icon" size={24} />
                          <input
                            aria-label="Expiry date"
                            autoComplete="cc-exp"
                            inputMode="numeric"
                            placeholder="mm/yy"
                            value={expiry}
                            onChange={handleExpiry}
                            maxLength={5}
                          />
                        </label>

                        <label className="field-row">
                          <LockKeyhole className="field-icon" size={24} />
                          <input
                            aria-label="CVC"
                            autoComplete="cc-csc"
                            inputMode="numeric"
                            placeholder="CVC"
                            value={cvc}
                            onChange={handleCvc}
                            maxLength={4}
                          />
                        </label>
                      </div>

                      <div className="split-errors">
                        <span>{errors.expiry}</span>
                        <span>{errors.cvc}</span>
                      </div>

                      <label className="remember-option">
                        <input
                          type="checkbox"
                          checked={rememberCard}
                          onChange={(event) =>
                            setRememberCard(event.target.checked)
                          }
                        />
                        <span className="custom-checkbox">
                          {rememberCard && <CheckCircle2 size={15} />}
                        </span>
                        <span>Remember my card</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="later-option"
                role="radio"
                aria-checked={paymentMethod === "later"}
                onClick={() => handlePaymentChange("later")}
              >
                <span
                  className={`later-radio ${paymentMethod === "later" ? "is-selected" : ""}`}
                >
                  {paymentMethod === "later" && (
                    <span className="later-radio-inner" />
                  )}
                </span>

                <span className="later-content">
                  <span className="payment-option-title">
                    Get first. Pay later.
                  </span>
                  <span className="payment-description">
                    Pay within 30 days.
                  </span>
                </span>
              </button>
            </div>

            <button className="continue-button" type="submit">
              CONTINUE
            </button>

            <p className="secure-note">
              <ShieldCheck size={15} />
              Secure checkout demonstration
            </p>
          </form>
        )}
      </section>
    </main>
  );
}

export default App;
