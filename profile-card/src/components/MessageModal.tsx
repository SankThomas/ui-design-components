import { Send, X } from "lucide-react";
import { useState, type SubmitEvent } from "react";

type MessageModalProps = {
  recipient: string;
  onClose: () => void;
  onSend: (message: string) => void;
};

export default function MessageModal({
  recipient,
  onClose,
  onSend,
}: MessageModalProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSend(trimmedMessage);
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-title"
      >
        <div className="modal-heading">
          <div>
            <h2 id="message-title">Message {recipient}</h2>
            <p>Write a message to start a conversation.</p>
          </div>

          <button
            className="icon-button"
            type="button"
            aria-label="Close message dialog"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Your message
            <textarea
              rows={5}
              placeholder="Hi! I'd love to connect about..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={1000}
              required
            />
          </label>

          <p className="character-count">{message.length}/1000</p>

          <div className="modal-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="button button-primary" type="submit">
              <Send size={15} />
              Send message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
