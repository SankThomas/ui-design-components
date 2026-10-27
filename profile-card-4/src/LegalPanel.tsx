import { ShieldCheck } from "lucide-react";

export default function LegalPanel() {
  return (
    <div className="dialog-content legal-content">
      <p className="dialog-description">
        Replace these examples with the actual legal details and policies for
        your application before publishing.
      </p>

      <section>
        <h3>Imprint</h3>
        <p>
          Add the legal name of the responsible person or organization, postal
          address, and any applicable registration information.
        </p>
      </section>

      <section>
        <h3>Privacy</h3>
        <p>
          Document which personal data you collect, why you collect it, how long
          it is retained, and how users can exercise their rights.
        </p>
      </section>

      <section>
        <h3>Terms of use</h3>
        <p>
          Describe acceptable use, account responsibilities, intellectual
          property, service availability, and applicable terms.
        </p>
      </section>

      <div className="dialog-note">
        <ShieldCheck aria-hidden="true" />
        <p>
          These sections are placeholders, not a legally complete policy. Have
          the final content reviewed for the jurisdictions where you operate.
        </p>
      </div>
    </div>
  );
}
