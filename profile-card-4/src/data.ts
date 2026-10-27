import {
  CircleHelp,
  Globe,
  Image,
  LogIn,
  Plug,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Profile = {
  name: string;
  role: string;
  status: string;
};

export type MenuEntry = {
  label: string;
  icon?: LucideIcon;
  description: string;
};

export const MENU_ITEMS: MenuEntry[] = [
  {
    label: "Login",
    icon: LogIn,
    description: "Connect this action to your authentication provider.",
  },
  {
    label: "Join",
    icon: UserPlus,
    description: "Connect this action to your account registration flow.",
  },
  {
    label: "Change language",
    icon: Globe,
    description: "Choose your preferred display language.",
  },
  {
    label: "Image & Video API",
    icon: Image,
    description:
      "Connect this destination to your image and video API documentation.",
  },
  {
    label: "Apps & Plugins",
    icon: Plug,
    description: "Explore integrations and supported plugins.",
  },
  {
    label: "FAQ",
    icon: CircleHelp,
    description: "Add frequently asked questions and their answers here.",
  },
  {
    label: "Partnerships",
    icon: Users,
    description: "Provide details about partnership opportunities.",
  },
  {
    label: "Imprint & Terms",
    description: "Add your legal notices, privacy policy, and terms.",
  },
];

export const STATUS_OPTIONS = [
  { label: "Available", color: "available" },
  { label: "Working", color: "working" },
  { label: "Taking a break", color: "break" },
  { label: "Away", color: "away" },
];

export const LANGUAGES = ["English", "Deutsch", "Français", "Español"];

export type MenuDialogType =
  | "login"
  | "join"
  | "language"
  | "api"
  | "plugins"
  | "faq"
  | "partnerships"
  | "legal";

export type DialogState =
  | { type: "status" }
  | { type: "profile" }
  | { type: "language" }
  | {
      type:
        | "login"
        | "join"
        | "api"
        | "plugins"
        | "faq"
        | "partnerships"
        | "legal";
    }
  | null;

export const FAQ_ITEMS = [
  {
    question: "How do I edit my profile?",
    answer:
      "Select Edit profile on the main card. Update your display name or professional title, then save your changes.",
  },
  {
    question: "How do I change my status?",
    answer:
      "Select Set a status, choose an availability option, and save it. You can also clear your status.",
  },
  {
    question: "Are my changes saved permanently?",
    answer:
      "Profile changes are currently held in application state. Language preferences can be persisted locally. Connect a backend to save profile data across sessions and devices.",
  },
  {
    question: "How do I connect an integration?",
    answer:
      "Open Apps & Plugins to inspect the available integrations. Actual connections require the appropriate provider credentials and authorization flow.",
  },
];

export const INTEGRATIONS = [
  {
    id: "image-api",
    name: "Image API",
    description: "Image generation and image processing.",
  },
  {
    id: "video-api",
    name: "Video API",
    description: "Video creation and media workflows.",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Send events to your own application.",
  },
];

export const DIALOG_TITLES = {
  login: "Welcome back",
  join: "Create your account",
  api: "Image & Video API",
  plugins: "Apps & Plugins",
  faq: "Frequently asked questions",
  partnerships: "Let's collaborate",
  legal: "Imprint & Terms",
} satisfies Record<
  Exclude<DialogState, null> extends infer D
    ? D extends { type: infer T }
      ? Exclude<T, "status" | "profile" | "language">
      : never
    : never,
  string
>;
