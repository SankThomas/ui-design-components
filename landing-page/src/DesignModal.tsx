import { Download, X } from "lucide-react";
import type { Design } from "./data";
import DownloadPreview from "./DownloadPreview";
import SettingsPreview from "./SettingsPreview";
import ReportPreview from "./ReportPreview";

export default function DesignModal({ design, onClose}: { design: Design; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="design-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className={`modal-preview ${design.background}`}>
          {design.preview === "download" && <DownloadPreview />}
          {design.preview === "settings" && <SettingsPreview />}
          {design.preview === "report" && <ReportPreview />}
        </div>

        <div className="modal-content">
          <div>
            <span className="modal-type">{design.type}</span>
            <h2>{design.title}</h2>
            <p>
              A free {design.type.toLowerCase()} resource created by{" "}
              {design.author}.
            </p>
          </div>

          <div className="modal-actions">
            <button className="secondary-action" onClick={onClose}>
              Close
            </button>
            <button className="primary-action">
              <Download size={17} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
