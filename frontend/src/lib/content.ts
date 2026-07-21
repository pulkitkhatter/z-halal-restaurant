export const BUSINESS = {
  name: "Z Halal Restaurant",
  address: "1168 Fulton St, Brooklyn, NY 11216",
  phoneDisplay: "(347) 996-2154",
  phoneTel: "tel:+13479962154",
  whatsappNumber: "13479962154",
  hours: "9:00 AM – 1:00 AM, 7 days a week",
  mapsQuery: encodeURIComponent("1168 Fulton St, Brooklyn, NY 11216"),
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi! I found you on your website";

export const TRANSIT = [
  "Franklin Ave (C / Shuttle)",
  "Nostrand Ave (A / C)",
  "Kingston & Throop (C)",
  "B25 bus",
];

// Three tagline options written per the brief (Section 5) for Blast to choose
// from. The first is the live default (also seeded as SiteSettings.tagline);
// the other two are documented here and in CONTENT_NOTES.md.
export const TAGLINE_OPTIONS = [
  "Authentic West African flavors, fresh daily.",
  "Your halal buffet, your neighborhood.",
  "From Senegal to Bed-Stuy — taste it fresh.",
];

// Fallback photo per menu category, used whenever a dish doesn't have its
// own imageUrl set (either not seeded with one, or not yet uploaded by an
// admin). Keeps every card looking appetizing even before every dish has a
// dedicated photo.
export const CATEGORY_IMAGES: Record<string, string> = {
  "Rice Dishes": "/images/menu/category-rice.jpg",
  "Stews & Sauces": "/images/menu/category-stews.jpg",
  Sides: "/images/menu/category-sides.jpg",
};

export const FALLBACK_CATEGORY_IMAGE = "/images/menu/category-rice.jpg";

export const DIET_LABELS: Record<string, { label: string; className: string }> = {
  VEG: { label: "Veg", className: "diet-veg" },
  NON_VEG: { label: "Non-Veg", className: "diet-non-veg" },
  EGG: { label: "Contains Egg", className: "diet-egg" },
};

export const TRUST_BADGES = [
  {
    icon: "☪",
    title: "100% Halal Certified",
    text: "Fully certified — no exceptions.",
  },
  {
    icon: "⚖",
    title: "Priced By The Pound",
    text: "Serve yourself, pay only for what you take.",
  },
  {
    icon: "🕐",
    title: "Open Late, Every Day",
    text: "9:00 AM – 1:00 AM, 7 days a week.",
  },
  {
    icon: "🍽",
    title: "Catering Available",
    text: "Planning an event? Message us on WhatsApp.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Pick up a plate",
    description: "Grab a plate at the start of the steam table.",
  },
  {
    step: "2",
    title: "Serve yourself",
    description: "Choose from our daily-changing selection of Senegalese dishes.",
  },
  {
    step: "3",
    title: "Get weighed & pay by the pound",
    description: "Your plate is weighed at the register — pay only for what you take.",
  },
];
