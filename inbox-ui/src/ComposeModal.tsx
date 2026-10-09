import { Send, X } from "lucide-react";
import React from "react";

type ComposeModalProps = {
  onClose: () => void;
  onSend: (event: React.SyntheticEvent<HTMLFormElement>) => void;
};

export default function ComposeModal({ onClose, onSend }: ComposeModalProps) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="compose-modal">
        <div className="modal-header">
          <h2 className="modal-title">Compose message</h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close compose window"
          >
            <X className="close-icon" />
          </button>
        </div>

        <form onSubmit={onSend}>
          <div className="form-group">
            <label htmlFor="recipient" className="form-label">
              Recipient
            </label>

            <input
              id="recipient"
              name="recipient"
              className="form-input"
              placeholder="Enter recipient name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Write your message..."
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="send-button">
              <Send className="send-icon" />
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
