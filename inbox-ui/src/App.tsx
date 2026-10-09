import { useState } from "react";
import { Check, Edit3 } from "lucide-react";
import ComposeModal from "./ComposeModal";
import MessageModal from "./MessageModal";

type Message = {
  id: number;
  name: string;
  preview: string;
  date: string;
  image: string;
  status: "online" | "busy" | "offline";
};

const initialMessages: Message[] = [
  {
    id: 1,
    name: "Rafel Jay",
    preview: "Hi there, how are you?",
    date: "4 days ago",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "online",
  },
  {
    id: 2,
    name: "Frank Johnson",
    preview: "How was the trip?",
    date: "5 days ago",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    status: "busy",
  },
  {
    id: 3,
    name: "Ashley Pierce",
    preview: "I hope you are well.",
    date: "Mar 12, 2022",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    status: "online",
  },
  {
    id: 4,
    name: "Nancy Meyer",
    preview: "Thank you for answering.",
    date: "Feb 3, 2022",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    status: "offline",
  },
];

export default function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [toast, setToast] = useState("");

  const handleSend = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const recipient = String(form.get("recipient") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!recipient || !message) return;

    const newMessage: Message = {
      id: Date.now(),
      name: recipient,
      preview: message,
      date: "Just now",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      status: "online",
    };

    setMessages((current) => [newMessage, ...current]);
    setComposeOpen(false);
    setToast("Message sent successfully");

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <main className="app">
      <div className="background-shape" />

      <section className="message-panel">
        <h1 className="message-title">Your messages</h1>

        <button
          type="button"
          className="compose-button"
          onClick={() => setComposeOpen(true)}
        >
          <span>Compose</span>
          <Edit3 className="compose-icon" />
        </button>

        <div className="message-list">
          {messages.map((message) => (
            <button
              key={message.id}
              type="button"
              className={`message-item ${message.id === 2 && messages.length === 4 ? "message-item-selected" : ""}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="avatar-wrapper">
                <img
                  src={message.image}
                  alt={message.name}
                  className="avatar"
                />

                <span
                  className={`status-dot status-${message.status}`}
                  aria-label={message.status}
                />
              </div>

              <div className="message-content">
                <div className="message-top">
                  <span className="sender-name">{message.name}</span>

                  <span className="message-date">{message.date}</span>
                </div>

                <p className="message-preview">{message.preview}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {composeOpen && (
        <ComposeModal
          onClose={() => setComposeOpen(false)}
          onSend={handleSend}
        />
      )}

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}

      {toast && (
        <div className="toast">
          <span className="flex items-center gap-2">
            <Check className="size-4" />
            {toast}
          </span>
        </div>
      )}
    </main>
  );
}
