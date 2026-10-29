import { X } from "lucide-react";

export default function ReportPreview() {
  return (
    <div className="report-preview">
      <div className="report-modal">
        <button className="report-close">
          <X size={12} />
        </button>

        <strong>Download the full report for even more insights</strong>

        <input placeholder="Enter your email address" />

        <button>Download the Report</button>
      </div>

      <div className="report-shadow" />
    </div>
  );
}
