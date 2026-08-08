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

export type FontId = "france" | "haiti" | "jamaica" | "usa";

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
    description: "The match strip: jersey, shorts, and the set that travels as one.",
    hero: heroKit,
  },
  {
    id: "spirit",
    label: "Spirit",
    description: "Court pieces cut with the same crest and the same discipline.",
    hero: heroSpirit,
  },
  {
    id: "warmup",
    label: "Warm-Up",
    description: "Crew, long sleeve, and the layer you wear into the building.",
    hero: heroCrew,
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    description: "Off the pitch. Same garnet. Same mark.",
    hero: heroField,
  },
];

/** Base field + three alternate geometric motifs (kit-campaign heritage, no trademarks). */
export const MOTIFS: {
  id: MotifId;
  label: string;
  description: string;
}[] = [
  {
    id: "chevron",
    label: "Chevron",
    description: "Diagonal blocks — the equipment-room classic, drawn clean.",
  },
  {
    id: "grid",
    label: "Grid",
    description: "A quiet technical grid. You notice it second.",
  },
  {
    id: "arc",
    label: "Arc Panel",
    description: "A curved torso panel — modern kit geometry, no noise.",
  },
];

/**
 * Four kit lettering faces — local OTFs in src/assets/fonts/.
 * Loaded via @font-face in styles.css (not Google Fonts).
 */
export const FONTS: {
  id: FontId;
  label: string;
  cssFamily: string;
  file: string;
  sample: string;
}[] = [
  {
    id: "france",
    label: "France Away",
    cssFamily: "'France Away', sans-serif",
    file: "france-away.otf",
    sample: "BAYONNE",
  },
  {
    id: "haiti",
    label: "Haiti",
    cssFamily: "'Haiti', sans-serif",
    file: "haiti.otf",
    sample: "BAYONNE",
  },
  {
    id: "jamaica",
    label: "Jamaica Away",
    cssFamily: "'Jamaica Away', sans-serif",
    file: "jamaica-away.otf",
    sample: "BAYONNE",
  },
  {
    id: "usa",
    label: "USA Away",
    cssFamily: "'USA Away', sans-serif",
    file: "usa-away.otf",
    sample: "BAYONNE",
  },
];

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "jersey",
    handle: "bayonne-bees-jersey",
    name: "Match Jersey",
    blurb: "Garnet field. Black chest panel edged in white. Crest left. Your name on the back.",
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
    blurb: "Matching garnet shorts. Black honeycomb side panel. Crest on the left leg.",
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
    blurb: "Jersey and shorts sold together — one color story, one crest, one order.",
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
    blurb: "Black mesh court jersey. Garnet trim. One crest. Number on the chest.",
    category: "spirit",
    price: 52,
    customizable: true,
    nameNumber: true,
    thumb: mockHoops,
    gallery: [mockHoops],
  },
  {
    id: "jersey-dress",
    handle: "bayonne-bees-jersey-dress",
    name: "Jersey Dress",
    blurb: "A spirit dress cut like a jersey — crest first, no clutter.",
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
    blurb: "Warm-up crew. Garnet body, black panels, crest where it belongs.",
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
    blurb: "Long sleeve for cold nights. Name and number on the back; year in the collar.",
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
    blurb: "Quarter-zip travel layer. Crest on the left chest. Nothing else shouting.",
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
    blurb: "Off-pitch shorts in the same garnet language as the match strip.",
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

/** @deprecated Kit faces are local OTFs via styles.css; keep UI chrome on Barlow. */
export function fontsStylesheetHref() {
  return "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600&display=swap";
}
