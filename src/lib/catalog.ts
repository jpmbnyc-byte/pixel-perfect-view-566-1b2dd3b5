/**
 * Bayonne Bees Team Customs catalog.
 * Categories → products → customizable listing (motif + optional typography).
 * Handles align with docs/LISTING_MAP.md
 *
 * Preview rule:
 * - Tops with lettering → front + back (typography UI)
 * - Shorts / sweats / hats → front + side (motif only, no name/number/font)
 */

import type { Item, LetteringLayout } from "./kit";
import { LETTERING } from "./kit";

/* Category heroes — do not regenerate; campaign stills only */
import heroKit from "@/assets/bayonne/heroes/hero-kit-studio.jpg";
import heroSpirit from "@/assets/bayonne/heroes/hero-spirit-football.jpg";
import heroCrew from "@/assets/bayonne/heroes/hero-crewneck-studio.jpg";
import heroField from "@/assets/bayonne/heroes/hero-field-lifestyle.jpg";

/* Photoreal PDP detail shots */
import jerseyFront from "@/assets/bayonne/previews/jersey-front.jpg";
import jerseyBack from "@/assets/bayonne/previews/jersey-back.jpg";
import shortsFront from "@/assets/bayonne/previews/shorts-front.jpg";
import shortsSide from "@/assets/bayonne/previews/shorts-side.jpg";
import setFront from "@/assets/bayonne/previews/set-front.jpg";
import hoopsFront from "@/assets/bayonne/previews/hoops-front.jpg";
import hoopsBack from "@/assets/bayonne/previews/hoops-back.jpg";
import dressFront from "@/assets/bayonne/previews/dress-front.jpg";
import dressBack from "@/assets/bayonne/previews/dress-back.jpg";
import crewFront from "@/assets/bayonne/previews/crew-front.jpg";
import crewSide from "@/assets/bayonne/previews/crew-side.jpg";
import lsFront from "@/assets/bayonne/previews/ls-front.jpg";
import lsBack from "@/assets/bayonne/previews/ls-back.jpg";
import qzipFront from "@/assets/bayonne/previews/qzip-front.jpg";
import qzipBack from "@/assets/bayonne/previews/qzip-back.jpg";
import geoShortsFront from "@/assets/bayonne/previews/geo-shorts-front.jpg";
import geoShortsSide from "@/assets/bayonne/previews/geo-shorts-side.jpg";
import hatFront from "@/assets/bayonne/previews/hat-front.jpg";
import hatSide from "@/assets/bayonne/previews/hat-side.jpg";
import sweatsFront from "@/assets/bayonne/previews/sweats-front.jpg";
import sweatsSide from "@/assets/bayonne/previews/sweats-side.jpg";

export type CategoryId = "match" | "sideline" | "warmups" | "alumni";

export type MotifId = "chevron" | "grid" | "arc";

export type FontId = "rail" | "beacon" | "whistle" | "forge";

/** Companion shot paired with front — back for lettered tops, side for motif pieces */
export type PreviewPair = "front-back" | "front-side";

export type SizeChartKind = "apparel" | "hat";

export type ProductPreviews = {
  front: string;
  /** Back when previewPair is front-back; side when front-side */
  secondary: string;
};

export type CatalogProduct = {
  id: string;
  handle: string;
  name: string;
  blurb: string;
  category: CategoryId;
  price: number;
  /** Maps to Shopify configurator item when catalog-synced */
  shopifyItem?: Item;
  customizable: boolean;
  /** Name + number fields (implies typography) */
  nameNumber: boolean;
  /** Font picker + lettering overlay — tops only */
  typography: boolean;
  /** Which second live-preview angle to offer */
  previewPair: PreviewPair;
  sizeChart: SizeChartKind;
  /** Per-product back lettering (photoreal framing differs by SKU) */
  lettering?: LetteringLayout;
  /** Store grid thumb — always the photoreal front */
  thumb: string;
  /** Photoreal front + secondary for live PDP preview */
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
    description: "The years are on the sleeve, or the collar.",
    hero: heroField,
  },
];

/** Three geometric motifs (kit-campaign heritage, no trademarks). */
export const MOTIFS: {
  id: MotifId;
  label: string;
  description: string;
}[] = [
  {
    id: "chevron",
    label: "Chevron",
    description: "Diagonal blocks sublimated into the panel — equipment-room classic.",
  },
  {
    id: "grid",
    label: "Grid",
    description: "A quiet technical grid printed into the fabric. You notice it second.",
  },
  {
    id: "arc",
    label: "Arc Panel",
    description: "Curved panel geometry, inked into the garment — modern kit, no noise.",
  },
];

/**
 * Four kit lettering faces — local OTFs in src/assets/fonts/.
 * Creative kit labels (not country names). Loaded via @font-face in styles.css.
 */
export const FONTS: {
  id: FontId;
  label: string;
  cssFamily: string;
  file: string;
  sample: string;
}[] = [
  {
    id: "rail",
    label: "Rail Cut",
    cssFamily: "'Rail Cut', sans-serif",
    file: "france-away.otf",
    sample: "BAYONNE",
  },
  {
    id: "beacon",
    label: "Beacon",
    cssFamily: "'Beacon', sans-serif",
    file: "haiti.otf",
    sample: "BAYONNE",
  },
  {
    id: "whistle",
    label: "Whistle",
    cssFamily: "'Whistle', sans-serif",
    file: "jamaica-away.otf",
    sample: "BAYONNE",
  },
  {
    id: "forge",
    label: "Forge",
    cssFamily: "'Forge', sans-serif",
    file: "usa-away.otf",
    sample: "BAYONNE",
  },
];

export const HAT_SIZES = ["S/M", "L/XL"] as const;
export type HatSize = (typeof HAT_SIZES)[number];

export const HAT_SIZE_CHART: { size: HatSize; note: string }[] = [
  { size: "S/M", note: 'Fits ~6⅞–7¼"' },
  { size: "L/XL", note: 'Fits ~7⅜–7¾"' },
];

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "jersey",
    handle: "bayonne-bees-jersey",
    name: "Match Jersey",
    blurb:
      "Black V-neck. Garnet field. Black chest panel with BAYONNE. Crest left. Name and number on the back.",
    category: "match",
    price: 58,
    shopifyItem: "top",
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    lettering: LETTERING,
    thumb: jerseyFront,
    previews: { front: jerseyFront, secondary: jerseyBack },
  },
  {
    id: "shorts",
    handle: "bayonne-bees-shorts",
    name: "Match Shorts",
    blurb: "Same garnet as the jersey. Geometric side panel you pick. Bee on the left leg. No name or number.",
    category: "match",
    price: 34,
    shopifyItem: "bottom",
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: shortsFront,
    previews: { front: shortsFront, secondary: shortsSide },
  },
  {
    id: "full-set",
    handle: "bayonne-bees-full-set",
    name: "Full Kit Set",
    blurb:
      "Black-collar jersey and matching shorts. One garnet. One crest. Name and number on the jersey.",
    category: "match",
    price: 89,
    shopifyItem: "set",
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    /** Back uses Match jersey plate — same spine as jersey */
    lettering: {
      ...LETTERING,
      centerX: 48,
      name: { ...LETTERING.name, y: 16 },
      number: { ...LETTERING.number, y: 28 },
    },
    thumb: setFront,
    previews: { front: setFront, secondary: jerseyBack },
  },
  {
    id: "hoops-jersey",
    handle: "bayonne-bees-hoops-jersey",
    name: "Hoops Jersey",
    blurb: "Blackout mesh. Garnet trim. Crest left. Name and number on the back.",
    category: "sideline",
    price: 52,
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    /** Blackout mesh — full torso; geometric center is the spine */
    lettering: { ...LETTERING, centerX: 50, surface: "blackout" },
    thumb: hoopsFront,
    previews: { front: hoopsFront, secondary: hoopsBack },
  },
  {
    id: "jersey-dress",
    handle: "bayonne-bees-jersey-dress",
    name: "Jersey Dress",
    blurb: "One-piece sideline cut. Color-block basketball crest on the chest. Name and number on the back.",
    category: "sideline",
    price: 72,
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    lettering: { ...LETTERING, centerX: 49.5 },
    thumb: dressFront,
    previews: { front: dressFront, secondary: dressBack },
  },
  {
    id: "aop-hat",
    handle: "bayonne-bees-aop-hat",
    name: "AOP Hat",
    blurb: "All-over geo on the crown. Crest up front. Pick the side-panel language.",
    category: "sideline",
    price: 36,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "hat",
    thumb: hatFront,
    previews: { front: hatFront, secondary: hatSide },
  },
  {
    id: "crewneck",
    handle: "bayonne-bees-crewneck",
    name: "1936 Crewneck",
    blurb: "Garnet body, black geo side panels. The year the school opened — motif only, no lettering.",
    category: "alumni",
    price: 64,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: crewFront,
    previews: { front: crewFront, secondary: crewSide },
  },
  {
    id: "sweatpants",
    handle: "bayonne-bees-sweatpants",
    name: "Base Layer Sweats",
    blurb: "Black base. Garnet geometric side panel you pick. Crest on the left thigh. Motif only.",
    category: "warmups",
    price: 58,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: sweatsFront,
    previews: { front: sweatsFront, secondary: sweatsSide },
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
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    lettering: { ...LETTERING, centerX: 50 },
    thumb: lsFront,
    previews: { front: lsFront, secondary: lsBack },
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
    typography: false,
    previewPair: "front-back",
    sizeChart: "apparel",
    thumb: qzipFront,
    previews: { front: qzipFront, secondary: qzipBack },
  },
  {
    id: "geo-shorts",
    handle: "bayonne-bees-geo-shorts",
    name: "Alumni Shorts",
    blurb: "Same garnet as the match strip. Geometric side panel off the field.",
    category: "alumni",
    price: 42,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: geoShortsFront,
    previews: { front: geoShortsFront, secondary: geoShortsSide },
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

/** Views offered on the PDP for a product */
export function previewViewsFor(product: CatalogProduct): Array<"front" | "back" | "side"> {
  return product.previewPair === "front-side" ? ["front", "side"] : ["front", "back"];
}

/** Resolved back-lettering layout for live preview + art spec */
export function letteringFor(product: CatalogProduct): LetteringLayout {
  return product.lettering ?? LETTERING;
}

/** @deprecated Kit faces are local OTFs via styles.css; keep UI chrome on Barlow. */
export function fontsStylesheetHref() {
  return "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600&display=swap";
}
