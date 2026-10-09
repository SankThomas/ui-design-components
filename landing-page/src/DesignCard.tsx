import type { Design } from "./data";
import { Code2, Eye, GitBranch, Sparkles } from "lucide-react";
import DownloadPreview from "./DownloadPreview";
import SettingsPreview from "./SettingsPreview";
import ReportPreview from "./ReportPreview";

export default function DesignCard({ design, onClick}: { design: Design; onClick: () => void }) {
  return (
    <article className="design-card">
      <button
        className={`design-preview ${design.background}`}
        onClick={onClick}
        aria-label={`Preview ${design.title}`}
      >
        <div className="sketch-badge">
          <Sparkles size={20} />
        </div>

        {design.preview === "download" && <DownloadPreview />}
        {design.preview === "settings" && <SettingsPreview />}
        {design.preview === "report" && <ReportPreview />}

        <div className="preview-hover">
          <Eye size={18} />
          <span>View design</span>
        </div>
      </button>

      <div className="design-meta">
        <div className="author">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
            alt=""
          />
          <span>by <strong>{design.author}</strong></span>
        </div>

        <div className="card-stats">
          <span>
            <Code2 size={17} />
            25
          </span>
          <span>
            <GitBranch size={17} /> 25
          </span>
        </div>
      </div>
    </article>
  );
}
