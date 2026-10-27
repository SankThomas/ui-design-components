type Offer = {
  id: string;
  label: string;
  title: string;
  description: string;
  badge?: string;
};

export const offers: Offer[] = [
  {
    id: "monthly",
    label: "MONTHLY",
    title: "4 weeks for free",
    description: "Then $3 every month for the first year",
  },
  {
    id: "yearly",
    label: "YEARLY",
    title: "4 weeks for free",
    description: "Then $30 for the first year",
    badge: "Best value",
  },
];

export const extraOffers: Offer[] = [
  {
    id: "quarterly",
    label: "QUARTERLY",
    title: "4 weeks for free",
    description: "Then $9 every three months",
  },
  {
    id: "lifetime",
    label: "LIFETIME",
    title: "One-time purchase",
    description: "Get permanent access for $99",
  },
];
