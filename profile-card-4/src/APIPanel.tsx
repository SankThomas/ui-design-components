import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ApiPanel() {
  const [copied, setCopied] = useState(false);

  const example = `fetch("/api/images", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});`;

  async function copyExample() {
    try {
      await navigator.clipboard.writeText(example);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="dialog-content">
      <p className="dialog-description">
        Use this example as a starting point when connecting your own media API.
      </p>

      <div className="api-code-header">
        <span>JavaScript &middot; Fetch</span>
        <button className="copy-button" type="button" onClick={copyExample}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>

      <pre className="api-code">
        <code>{example}</code>
      </pre>

      <a
        className="resource-link"
        href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
        target="_blank"
        rel="noreferrer"
      >
        Learn about Fetch API
        <ExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
