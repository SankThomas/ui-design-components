import { CircleCheck, Code2, Mail, MessageCircle } from "lucide-react";
import {
  defaultPreferences,
  initialNotifications,
  STORAGE_KEY,
  type StoredState,
} from "./data";

export function getInitialState(): StoredState {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<StoredState>;

        if (Array.isArray(parsed.notifications)) {
          return {
            notifications: parsed.notifications.map((item) => ({
              ...item,
              icon:
                item.category === "Updates"
                  ? Code2
                  : item.category === "Reminders"
                    ? CircleCheck
                    : item.category === "Social"
                      ? MessageCircle
                      : Mail,
              color:
                item.color ??
                (item.category === "Messages"
                  ? "#d93279"
                  : item.category === "Updates"
                    ? "#2563eb"
                    : item.category === "Reminders"
                      ? "#15803d"
                      : "#7c3aed"),
              background:
                item.background ??
                (item.category === "Messages"
                  ? "#ffe8f1"
                  : item.category === "Updates"
                    ? "#dbeafe"
                    : item.category === "Reminders"
                      ? "#dcfce7"
                      : "#ede9fe"),
            })),
            preferences: {
              ...defaultPreferences,
              ...parsed.preferences,
            },
            darkMode: parsed.darkMode ?? false,
          };
        }
      }
    } catch {
      // Do some recovery here
    }
  }

  return {
    notifications: initialNotifications,
    preferences: defaultPreferences,
    darkMode: false,
  };
}

export function relativeTime(date: string) {
  const elapsed = Math.max(0, Date.now() - new Date(date).getTime());
  const minutes = Math.floor(elapsed / 60_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
