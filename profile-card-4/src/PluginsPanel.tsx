import { useState } from "react";
import { INTEGRATIONS } from "./data";
import { Plug } from "lucide-react";

export default function PluginsPanel() {
  const [enabled, setEnabled] = useState<string[]>([]);

  return (
    <div className="dialog-content">
      <p className="dialog-description">
        Manage demo integration preferences. These switches do not establish
        external connections.
      </p>

      <div className="integration-list">
        {INTEGRATIONS.map((integration) => {
          const active = enabled.includes(integration.id);

          return (
            <div className="integration-item" key={integration.id}>
              <div className="integration-icon">
                <Plug aria-hidden="true" />
              </div>

              <div className="integration-copy">
                <strong>{integration.name}</strong>
                <span>{integration.description}</span>
                <small>{active ? "Enabled locally" : "Not enabled"}</small>
              </div>

              <button
                className={`integration-toggle ${active ? "integration-toggle-on" : ""}`}
                type="button"
                role="switch"
                aria-checked={active}
                aria-label={`Enable ${integration.name}`}
                onClick={() =>
                  setEnabled((current) =>
                    active
                      ? current.filter((id) => id !== integration.id)
                      : [...current, integration.id],
                  )
                }
              >
                <span />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
