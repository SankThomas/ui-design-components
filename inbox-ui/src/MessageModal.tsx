import { X } from "lucide-react";

type Message = {
  id: number;
  name: string;
  preview: string;
  date: string;
  image: string;
  status: "online" | "busy" | "offline";
};

type MessageModalProps = {
  message: Message;
  onClose: () => void;
};

export default function MessageModal({ message, onClose }: MessageModalProps) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="detail-modal">
        <div className="modal-header">
          <div className="detail-user">
            <img
              src={message.image}
              alt={message.name}
              className="detail-avatar"
            />

            <div>
              <h2 className="detail-name">{message.name}</h2>
              <p className="detail-status">
                {message.status === "online"
                  ? "Online"
                  : message.status === "busy"
                    ? "Busy"
                    : "Offline"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close message"
          >
            <X className="close-icon" />
          </button>
        </div>

        <div className="detail-message">{message.preview}</div>

        <p className="detail-date">{message.date}</p>
      </div>
    </div>
  );
}
