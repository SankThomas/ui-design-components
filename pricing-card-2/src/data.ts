export type Plan = {
  id: "free" | "standard" | "premium";
  name: string;
  price: number;
  billing: string;
  description: string;
  buttonLabel: string;
  buttonClass: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billing: "Free for your whole team",
    description: "For individuals or teams looking to organize anything.",
    buttonLabel: "Get started",
    buttonClass: "plan-button-free",
  },
  {
    id: "standard",
    name: "Standard",
    price: 6,
    billing: "Per user per month",
    description: "For teams that need to manage more work.",
    buttonLabel: "Upgrade Now",
    buttonClass: "plan-button-standard",
  },
  {
    id: "premium",
    name: "Premium",
    price: 12,
    billing: "Per user per month",
    description: "Best for teams that need to track multiple projects.",
    buttonLabel: "Try for free",
    buttonClass: "plan-button-premium",
  },
];
