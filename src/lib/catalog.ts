/**
 * Bayonne Bees Team Customs catalog.
 * Categories → products → customizable listing (motif + font + name/number).
 * Handles align with docs/MERCHIZE_LISTING_MAP.md
 */

import type { Item } from "./kit";

/* Category heroes — do not regenerate; campaign stills only */
import heroKit from "@/assets/bayonne/heroes/hero-kit-studio.jpg";
import heroSpirit from "@/assets/bayonne/heroes/hero-spirit-football.jpg";
import heroCrew from "@/assets/bayonne/heroes/hero-crewneck-studio.jpg";
import heroField from "@/assets/bayonne/heroes/hero-field-lifestyle.jpg";

/* Photoreal PDP front/back detail shots */
import jerseyFront from "@/assets/bayonne/previews/jersey-front.jpg";
import jerseyBack from "@/assets/bayonne/previews/jersey-back.jpg";
import shortsFront from "@/assets/bayonne/previews/shorts-front.jpg";
import shortsBack from "@/assets/bayonne/previews/shorts-back.jpg";
import setFront from "@/assets/bayonne/previews/set-front.jpg";
import setBack from "@/assets/bayonne/previews/set-back.jpg";
import hoopsFront from "@/assets/bayonne/previews/hoops-front.jpg";
import hoopsBack from "@/assets/bayonne/previews/hoops-back.jpg";
import dressFront from "@/assets/bayonne/previews/dress-front.jpg";
import dressBack from "@/assets/bayonne/previews/dress-back.jpg";
import crewFront from "@/assets/bayonne/previews/crew-front.jpg";
import crewBack from "@/assets/bayonne/previews/crew-back.jpg";
import lsFront from "@/assets/bayonne/previews/ls-front.jpg";
import lsBack from "@/assets/bayonne/previews/ls-back.jpg";
import qzipFront from "@/assets/bayonne/previews/qzip-front.jpg";
import qzipBack from "@/assets/bayonne/previews/qzip-back.jpg";
import geoShortsFront from "@/assets/bayonne/previews/geo-shorts-front.jpg";
import geoShortsBack from "@/assets/bayonne/previews/geo-shorts-back.jpg";

export type CategoryId = "match" | "sideline" | "warmups" | "alumni";

export type MotifId = "chevron" | "grid" | "arc";

export type FontId = "france" | "haiti" | "jamaica" | "usa";

export type ProductPreviews = {
  front: string;
  back: string;
};

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
  /** Store grid thumb — always the photoreal front */
  thumb: string;
  /** Photoreal front/back for live PDP preview */
  previews: ProductPreviews;
};

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  hero: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "match",
    label: "Match",
    description: "What they wear when the whistle blows.",
    hero: heroKit,
  },
  {
    id: "sideline",
    label: "Sideline",
    description: "For standing outside in November.",
    hero: heroSpirit,
  },
  {
    id: "warmups",
    label: "Warmups",
    description: "What the team wears before the whistle.",
    hero: heroCrew,
  },
  {
    id: "alumni",
    label: "Alumni",
    description: "The years are on the back.",
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
    blurb: "Garnet field. Black chest panel edged in white. Crest left. Name and number on the back.",
    category: "match",
    price: 58,
    shopifyItem: "top",
    customizable: true,
    nameNumber: true,
    thumb: jerseyFront,
    previews: { front: jerseyFront, back: jerseyBack },
  },
  {
    id: "shorts",
    handle: "bayonne-bees-shorts",
    name: "Match Shorts",
    blurb: "Garnet. Black honeycomb side panel. Crest on the left leg.",
    category: "match",
    price: 34,
    shopifyItem: "bottom",
    customizable: true,
    nameNumber: false,
    thumb: shortsFront,
    previews: { front: shortsFront, back: shortsBack },
  },
  {
    id: "full-set",
    handle: "bayonne-bees-full-set",
    name: "Full Kit Set",
    blurb: "Jersey and shorts in one order. One garnet. One crest.",
    category: "match",
    price: 89,
    shopifyItem: "set",
    customizable: true,
    nameNumber: true,
    thumb: setFront,
    previews: { front: setFront, back: setBack },
  },
  {
    id: "hoops-jersey",
    handle: "bayonne-bees-hoops-jersey",
    name: "Hoops Jersey",
    blurb: "Black mesh. Garnet trim. Crest left. Number on the chest.",
    category: "sideline",
    price: 52,
    customizable: true,
    nameNumber: true,
    thumb: hoopsFront,
    previews: { front: hoopsFront, back: hoopsBack },
  },
  {
    id: "jersey-dress",
    handle: "bayonne-bees-jersey-dress",
    name: "Jersey Dress",
    blurb: "Sideline cut. Crest first. Garnet field.",
    category: "sideline",
    price: 72,
    customizable: true,
    nameNumber: true,
    thumb: dressFront,
    previews: { front: dressFront, back: dressBack },
  },
  {
    id: "crewneck",
    handle: "bayonne-bees-crewneck",
    name: "1936 Crewneck",
    blurb: "Garnet body, black panels. The year the school opened — for people who don’t need the chest to explain it.",
    category: "warmups",
    price: 64,
    customizable: true,
    nameNumber: false,
    thumb: crewFront,
    previews: { front: crewFront, back: crewBack },
  },
  {
    id: "ls-jersey",
    handle: "bayonne-bees-ls-jersey",
    name: "Long-Sleeve Jersey",
    blurb: "Name and number on the back. Year inside the collar.",
    category: "warmups",
    price: 62,
    customizable: true,
    nameNumber: true,
    thumb: lsFront,
    previews: { front: lsFront, back: lsBack },
  },
  {
    id: "quarter-zip",
    handle: "bayonne-bees-quarter-zip",
    name: "Quarter-Zip",
    blurb: "Crest on the left chest. Nothing else on the front.",
    category: "warmups",
    price: 68,
    customizable: true,
    nameNumber: false,
    thumb: qzipFront,
    previews: { front: qzipFront, back: qzipBack },
  },
  {
    id: "geo-shorts",
    handle: "bayonne-bees-geo-shorts",
    name: "Alumni Shorts",
    blurb: "Same garnet as the match strip. Off the field.",
    category: "alumni",
    price: 42,
    customizable: true,
    nameNumber: false,
    thumb: geoShortsFront,
    previews: { front: geoShortsFront, back: geoShortsBack },
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
