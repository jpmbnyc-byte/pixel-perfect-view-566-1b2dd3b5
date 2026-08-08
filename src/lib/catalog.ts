/**
 * Bayonne Bees Team Customs catalog.
 * Categories → products → customizable listing (motif + font + name/number).
 * Handles align with docs/MERCHIZE_LISTING_MAP.md
 */

import type { Item } from "./kit";

import mockCrewneck from "@/assets/bayonne/mockups/mock-crewneck.jpg";
import mockHoops from "@/assets/bayonne/mockups/mock-hoops-jersey.jpg";
import mockJerseyBack from "@/assets/bayonne/mockups/mock-jersey-back.jpg";
import mockJerseyFront from "@/assets/bayonne/mockups/mock-jersey-front.jpg";
import mockQuarterZip from "@/assets/bayonne/mockups/mock-quarter-zip.jpg";
import mockShorts from "@/assets/bayonne/mockups/mock-shorts.jpg";
import heroKit from "@/assets/bayonne/heroes/hero-kit-studio.jpg";
import heroSpirit from "@/assets/bayonne/heroes/hero-spirit-gym.jpg";
import heroCrew from "@/assets/bayonne/heroes/hero-crewneck-studio.jpg";
import heroField from "@/assets/bayonne/heroes/hero-field-lifestyle.jpg";

export type CategoryId = "core" | "spirit" | "warmup" | "lifestyle";

export type MotifId = "chevron" | "grid" | "arc";

export type FontId = "matchday" | "procondensed" | "impact" | "varsity";

export type CatalogProduct = {
  id: string;
  handle: string;
  name: string;
  blurb: string;
  category: CategoryId;
  price: number;
  /** Maps to Shopify configurator item when Merchize-synced */
  shopifyItem?: Item;
  customizable: boolean;
  nameNumber: boolean;
  thumb: string;
  gallery: string[];
};

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  hero: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "core",
    label: "Core Kit",
    description: "Match jersey, shorts, and full set — the season baseline.",
    hero: heroKit,
  },
  {
    id: "spirit",
    label: "Spirit",
    description: "Court and sideline pieces with school motif energy.",
    hero: heroSpirit,
  },
  {
    id: "warmup",
    label: "Warm-Up",
    description: "Crew, long-sleeve, and travel layers.",
    hero: heroCrew,
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    description: "Geometric separates for off the field.",
    hero: heroField,
  },
];

/** Base field + three alternate geometric motifs (Adidas-heritage, no trademarks). */
export const MOTIFS: {
  id: MotifId;
  label: string;
  description: string;
}[] = [
  {
    id: "chevron",
    label: "Chevron",
    description: "Sharp diagonal blocks — equipment-room classic.",
  },
  {
    id: "grid",
    label: "Grid",
    description: "Micro athletic grid — quiet, technical.",
  },
  {
    id: "arc",
    label: "Arc Panel",
    description: "Curved panel geometry — modern kit language.",
  },
];

/** Four premium lettering faces for name / number. */
export const FONTS: {
  id: FontId;
  label: string;
  cssFamily: string;
  google: string;
  sample: string;
}[] = [
  {
    id: "matchday",
    label: "Match Day",
    cssFamily: "'Bebas Neue', sans-serif",
    google: "Bebas+Neue",
    sample: "BAYONNE",
  },
  {
    id: "procondensed",
    label: "Pro Condensed",
    cssFamily: "'Oswald', sans-serif",
    google: "Oswald:wght@500;600;700",
    sample: "BAYONNE",
  },
  {
    id: "impact",
    label: "Impact Block",
    cssFamily: "'Anton', sans-serif",
    google: "Anton",
    sample: "BAYONNE",
  },
  {
    id: "varsity",
    label: "Varsity",
    cssFamily: "'Graduate', serif",
    google: "Graduate",
    sample: "BAYONNE",
  },
];

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "jersey",
    handle: "bayonne-bees-jersey",
    name: "Match Jersey",
    blurb: "V-neck short sleeve. Base maroon field, motif accents, custom back.",
    category: "core",
    price: 58,
    shopifyItem: "top",
    customizable: true,
    nameNumber: true,
    thumb: mockJerseyFront,
    gallery: [mockJerseyFront, mockJerseyBack],
  },
  {
    id: "shorts",
    handle: "bayonne-bees-shorts",
    name: "Match Shorts",
    blurb: "Side-panel geometry with soft crest mark.",
    category: "core",
    price: 34,
    shopifyItem: "bottom",
    customizable: true,
    nameNumber: false,
    thumb: mockShorts,
    gallery: [mockShorts],
  },
  {
    id: "full-set",
    handle: "bayonne-bees-full-set",
    name: "Full Kit Set",
    blurb: "Jersey + shorts as one drop. Name and number on the jersey.",
    category: "core",
    price: 89,
    shopifyItem: "set",
    customizable: true,
    nameNumber: true,
    thumb: mockJerseyFront,
    gallery: [mockJerseyFront, mockJerseyBack, mockShorts],
  },
  {
    id: "hoops-jersey",
    handle: "bayonne-bees-hoops-jersey",
    name: "Hoops Jersey",
    blurb: "Sleeveless court jersey with striped rib and chest number.",
    category: "spirit",
    price: 52,
    customizable: true,
    nameNumber: true,
    thumb: mockHoops,
    gallery: [mockHoops],
  },
  {
    id: "spirit-skirt-set",
    handle: "bayonne-bees-spirit-skirt-set",
    name: "Spirit Skirt Set",
    blurb: "Crop jersey + pleated skirt. School motif, clean number.",
    category: "spirit",
    price: 78,
    customizable: true,
    nameNumber: true,
    thumb: heroSpirit,
    gallery: [heroSpirit],
  },
  {
    id: "jersey-dress",
    handle: "bayonne-bees-jersey-dress",
    name: "Jersey Dress",
    blurb: "One-piece spirit dress. Crest-forward, motif on panels.",
    category: "spirit",
    price: 72,
    customizable: true,
    nameNumber: true,
    thumb: heroSpirit,
    gallery: [heroSpirit],
  },
  {
    id: "crewneck",
    handle: "bayonne-bees-crewneck",
    name: "Geo Crewneck",
    blurb: "All-over geometric warm-up. Motif leads; crest optional.",
    category: "warmup",
    price: 64,
    customizable: true,
    nameNumber: false,
    thumb: mockCrewneck,
    gallery: [mockCrewneck, heroCrew],
  },
  {
    id: "ls-jersey",
    handle: "bayonne-bees-ls-jersey",
    name: "Long-Sleeve Jersey",
    blurb: "Script front, custom name and number on the back.",
    category: "warmup",
    price: 62,
    customizable: true,
    nameNumber: true,
    thumb: mockJerseyBack,
    gallery: [mockJerseyBack, mockJerseyFront],
  },
  {
    id: "quarter-zip",
    handle: "bayonne-bees-quarter-zip",
    name: "Quarter-Zip",
    blurb: "Travel layer. Crest only — motif in the tonal field.",
    category: "warmup",
    price: 68,
    customizable: true,
    nameNumber: false,
    thumb: mockQuarterZip,
    gallery: [mockQuarterZip],
  },
  {
    id: "geo-shorts",
    handle: "bayonne-bees-geo-shorts",
    name: "Geo Lifestyle Shorts",
    blurb: "Off-pitch geometric shorts with soft Bees mark.",
    category: "lifestyle",
    price: 42,
    customizable: true,
    nameNumber: false,
    thumb: mockShorts,
    gallery: [mockShorts, heroField],
  },
];

export function categoryById(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id);
}

export function productsInCategory(id: CategoryId) {
  return PRODUCTS.filter((p) => p.category === id);
}

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function fontById(id: FontId) {
  return FONTS.find((f) => f.id === id) ?? FONTS[0]!;
}

export function motifById(id: MotifId) {
  return MOTIFS.find((m) => m.id === id) ?? MOTIFS[0]!;
}

export function fontsStylesheetHref() {
  const families = FONTS.map((f) => f.google).join("&family=");
  return `https://fonts.googleapis.com/css2?family=${families}&family=Barlow+Condensed:wght@400;500;600&display=swap`;
}
