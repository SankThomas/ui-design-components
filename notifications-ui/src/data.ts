import { CircleCheck, Code2, Mail, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const STORAGE_KEY = "notifications-center";

export type Category = "Messages" | "Updates" | "Reminders" | "Social";
export type Filter = "All" | "Unread" | "Archived";

export type Preferences = Record<Category, boolean>;

export type StoredState = {
  notifications: NotificationItem[];
  preferences: Preferences;
  darkMode: boolean;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  category: Category;
  date: string;
  read: boolean;
  archived: boolean;
  icon: LucideIcon;
  color: string;
  background: string;
  actionLabel?: string;
  actionUrl?: string;
};

export const defaultPreferences: Preferences = {
  Messages: true,
  Updates: true,
  Reminders: true,
  Social: true,
};

export const initialNotifications: NotificationItem[] = [
  {
    id: "message-1",
    title: "You have a new message",
    message: "If you like what we do, please tell your friends and share.",
    category: "Messages",
    date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    read: false,
    archived: false,
    icon: Mail,
    color: "#d93279",
    background: "#ffe8f1",
    actionLabel: "View message",
  },
  {
    id: "update-1",
    title: "Project update",
    message: "Your latest project update is ready to review.",
    category: "Updates",
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: false,
    archived: false,
    icon: Code2,
    color: "#2563eb",
    background: "#dbeafe",
    actionLabel: "View project",
  },
  {
    id: "reminder-1",
    title: "Don't forget your tasks",
    message: "You have a few tasks waiting for your attention today.",
    category: "Reminders",
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    archived: false,
    icon: CircleCheck,
    color: "#15803d",
    background: "#dcfce7",
    actionLabel: "Review tasks",
  },
  {
    id: "social-1",
    title: "Thanks for sharing",
    message: "Your support helps more people discover our work.",
    category: "Social",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    archived: false,
    icon: MessageCircle,
    color: "#7c3aed",
    background: "#ede9fe",
  },
];
