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
import {
  LETTERING,
  LETTERING_DRESS,
  LETTERING_HOOPS,
  LETTERING_LS,
  LETTERING_SET,
} from "./kit";
import { PLATES, SURFACES } from "./brandAssets";
import { CAMPAIGN_SHOTS } from "./campaignAssets";

/** Grid / desire thumb — campaign front when shot exists, else truth plate. */
function thumbFor(plateId: keyof typeof PLATES): string {
  return CAMPAIGN_SHOTS[plateId]?.front ?? PLATES[plateId].front;
}

/*
 * Merchize-printable plates — resolved only via brandAssets (SSOT).
 * Thumbs, category heroes, landing, OG, and PDP share those modules.
 * Blank map: docs/MERCHIZE_BLANKS.md
 */

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
  /** Category grid / desire thumb — Tier 1 campaign when available */
  thumb: string;
  /** Tier 2 truth plates for live configurator preview */
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
    description: "For the whistle. Three pieces. One garnet.",
    hero: SURFACES.categoryHero.match,
  },
  {
    id: "sideline",
    label: "Sideline",
    description: "For standing outside in November.",
    hero: SURFACES.categoryHero.sideline,
  },
  {
    id: "warmups",
    label: "Warmups",
    description: "What the team wears before the whistle.",
    hero: SURFACES.categoryHero.warmups,
  },
  {
    id: "alumni",
    label: "Alumni",
    description: "1936 — kept close. Heritage tees and baggy sweats.",
    hero: SURFACES.categoryHero.alumni,
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
      "The right garnet. BAYONNE across the front. Your name and number on the back.",
    category: "match",
    price: 115,
    shopifyItem: "top",
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    lettering: LETTERING,
    thumb: thumbFor("jersey"),
    previews: { ...PLATES.jersey },
  },
  {
    id: "shorts",
    handle: "bayonne-bees-shorts",
    name: "Match Shorts",
    blurb: "One garnet. One bone stripe. Nothing unnecessary.",
    category: "match",
    price: 73,
    shopifyItem: "bottom",
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: thumbFor("shorts"),
    previews: { ...PLATES.shorts },
  },
  {
    id: "full-set",
    handle: "bayonne-bees-full-set",
    name: "Match Full Kit",
    blurb: "The complete Bayonne strip. Jersey, shorts and your name on the back.",
    category: "match",
    price: 188,
    shopifyItem: "set",
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    /** Set plate shows shirt + shorts — shirt hem ≈64%, so the block sits higher */
    lettering: LETTERING_SET,
    thumb: thumbFor("full-set"),
    previews: { ...PLATES["full-set"] },
  },
  {
    id: "hoops-jersey",
    handle: "bayonne-bees-hoops-jersey",
    name: "Hoops Jersey",
    blurb: "Blackout mesh, garnet trim, crest left. Name and number on the back.",
    category: "sideline",
    price: 52,
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    /** Blackout mesh tank — no collar, spine sits right of frame center */
    lettering: LETTERING_HOOPS,
    thumb: thumbFor("hoops-jersey"),
    previews: { ...PLATES["hoops-jersey"] },
  },
  {
    id: "jersey-dress",
    handle: "bayonne-bees-jersey-dress",
    name: "Jersey Dress",
    blurb: "One piece. Same back print as the Match jersey — your name, your number.",
    category: "sideline",
    price: 72,
    customizable: true,
    nameNumber: true,
    typography: true,
    previewPair: "front-back",
    sizeChart: "apparel",
    lettering: LETTERING_DRESS,
    thumb: thumbFor("jersey-dress"),
    previews: { ...PLATES["jersey-dress"] },
  },
  {
    id: "aop-hat",
    handle: "bayonne-bees-aop-hat",
    name: "AOP Hat",
    blurb: "All-over print on the crown. Crest up front. S/M or L/XL.",
    category: "sideline",
    price: 36,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "hat",
    thumb: thumbFor("aop-hat"),
    previews: { ...PLATES["aop-hat"] },
  },
  {
    id: "crewneck",
    handle: "bayonne-bees-crewneck",
    name: "1936 Crewneck",
    blurb: "Garnet crew. The year on the sleeve. Soft, no lettering.",
    category: "alumni",
    price: 64,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: thumbFor("crewneck"),
    previews: { ...PLATES.crewneck },
  },
  {
    id: "sweatpants",
    handle: "bayonne-bees-sweatpants",
    name: "Base Layer Sweats",
    blurb: "Black base. Garnet geometric side panel. Crest on the left thigh. Motif only.",
    category: "warmups",
    price: 58,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: thumbFor("sweatpants"),
    previews: { ...PLATES.sweatpants },
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
    lettering: LETTERING_LS,
    thumb: thumbFor("ls-jersey"),
    previews: { ...PLATES["ls-jersey"] },
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
    thumb: thumbFor("quarter-zip"),
    previews: { ...PLATES["quarter-zip"] },
  },
  {
    id: "geo-shorts",
    handle: "bayonne-bees-geo-shorts",
    name: "Alumni Shorts",
    blurb:
      "Same garnet as the match strip. Single 18mm bone outseam tape — never three stripes. Off the field.",
    category: "alumni",
    price: 42,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: thumbFor("geo-shorts"),
    previews: { ...PLATES["geo-shorts"] },
  },
  {
    id: "heritage-tee-garnet",
    handle: "bayonne-heritage-tee-garnet",
    name: "Heritage Tee · Garnet",
    blurb: "Garnet body. Bone panels. Bayonne script and 1936 on the chest.",
    category: "alumni",
    price: 44,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-back",
    sizeChart: "apparel",
    thumb: thumbFor("heritage-tee-garnet"),
    previews: { ...PLATES["heritage-tee-garnet"] },
  },
  {
    id: "heritage-tee-black",
    handle: "bayonne-heritage-tee-black",
    name: "Heritage Tee · Black",
    blurb: "Black field. White Bayonne script. EST. 36 where it counts.",
    category: "alumni",
    price: 44,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-back",
    sizeChart: "apparel",
    thumb: thumbFor("heritage-tee-black"),
    previews: { ...PLATES["heritage-tee-black"] },
  },
  {
    id: "baggy-sweats-garnet",
    handle: "bayonne-baggy-sweats-garnet",
    name: "1936 Baggy Sweats · Garnet",
    blurb: "Wide garnet fleece. Crest on the thigh. 1936 down the leg.",
    category: "alumni",
    price: 72,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: thumbFor("baggy-sweats-garnet"),
    previews: { ...PLATES["baggy-sweats-garnet"] },
  },
  {
    id: "baggy-sweats-black",
    handle: "bayonne-baggy-sweats-black",
    name: "1936 Baggy Sweats · Black",
    blurb: "Black baggy fleece. Crest. 1936 vertical. Nothing loud.",
    category: "alumni",
    price: 72,
    customizable: true,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart: "apparel",
    thumb: thumbFor("baggy-sweats-black"),
    previews: { ...PLATES["baggy-sweats-black"] },
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
