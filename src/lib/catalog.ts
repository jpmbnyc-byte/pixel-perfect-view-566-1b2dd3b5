/**
 * Bayonne Athletics Fall 001 storefront catalog.
 *
 * 20 live listings. Canonical product IDs only — old garment aliases
 * (heritage tee, quarter zip, jersey dress, hoops, crest cap) resolve
 * through productById for existing URLs, but never define identity.
 */

import { LETTERING, type Item, type LetteringLayout } from "./kit";
import {
  HEROES,
  HERO_CROP,
  campaignViews,
  imagesFor,
  platePair,
  type CanonicalProductId,
} from "./imageRegistry";
import { PRODUCT_COPY } from "@/copy/collection";

export type CategoryId = "match" | "performance" | "travel" | "harbor" | "club";
export type MotifId = "chevron" | "grid" | "arc";
export type FontId = "rail" | "beacon" | "whistle" | "forge";
export type PreviewPair = "front-back" | "front-side";
export type SizeChartKind = "apparel" | "hat" | "shoe" | "sock";

export type ProductPreviews = { front: string; secondary: string };

export type CatalogProduct = {
  id: CanonicalProductId;
  handle: string;
  name: string;
  blurb: string;
  /** Lookbook caption: material · color. */
  line: string;
  category: CategoryId;
  price: number;
  personalizedPrice?: number;
  shopifyItem?: Item;
  customizable: boolean;
  nameNumber: boolean;
  typography: boolean;
  previewPair: PreviewPair;
  sizeChart: SizeChartKind;
  lettering?: LetteringLayout;
  thumb: string;
  previews: ProductPreviews;
  imageryPending?: boolean;
};

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  hero: string;
  heroFit: "cover" | "contain";
  heroPosition: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "match",
    label: "1936 Match",
    description: "The club jersey and match short. Heritage made wearable.",
    hero: HEROES.match,
    heroFit: HERO_CROP.match.fit,
    heroPosition: HERO_CROP.match.position,
  },
  {
    id: "performance",
    label: "Performance",
    description: "Technical layers for training, running and the hours before and after both.",
    hero: HEROES.performance,
    heroFit: HERO_CROP.performance.fit,
    heroPosition: HERO_CROP.performance.position,
  },
  {
    id: "travel",
    label: "Travel + Core",
    description: "Heavyweight layers, refined basics and utility pieces made for transit, recovery and repeat wear.",
    hero: HEROES.travel,
    heroFit: HERO_CROP.travel.fit,
    heroPosition: HERO_CROP.travel.position,
  },
  {
    id: "harbor",
    label: "Harbor Division",
    description: "Outerwear shaped by the industrial edge of the city: black shell, quiet front, bridge at the back.",
    hero: HEROES.harbor,
    heroFit: HERO_CROP.harbor.fit,
    heroPosition: HERO_CROP.harbor.position,
  },
  {
    id: "club",
    label: "Club Goods",
    description: "Caps, knit, socks and footwear that carry the club without requiring the full uniform.",
    hero: HEROES.club,
    heroFit: HERO_CROP.club.fit,
    heroPosition: HERO_CROP.club.position,
  },
];

export const MOTIFS: { id: MotifId; label: string; description: string }[] = [
  { id: "chevron", label: "Chevron", description: "Diagonal club geometry." },
  { id: "grid", label: "Grid", description: "Quiet technical grid." },
  { id: "arc", label: "Arc Panel", description: "Curved modern kit geometry." },
];

export const FONTS: { id: FontId; label: string; cssFamily: string; file: string; sample: string }[] = [
  { id: "rail", label: "Rail Cut", cssFamily: "'Rail Cut', sans-serif", file: "france-away.otf", sample: "BAYONNE" },
  { id: "beacon", label: "Beacon", cssFamily: "'Beacon', sans-serif", file: "haiti.otf", sample: "BAYONNE" },
  { id: "whistle", label: "Whistle", cssFamily: "'Whistle', sans-serif", file: "jamaica-away.otf", sample: "BAYONNE" },
  { id: "forge", label: "Forge", cssFamily: "'Forge', sans-serif", file: "usa-away.otf", sample: "BAYONNE" },
];

export const HAT_SIZES = ["ONE SIZE"] as const;
export type HatSize = (typeof HAT_SIZES)[number];
export const HAT_SIZE_CHART: { size: HatSize; note: string }[] = [
  { size: "ONE SIZE", note: "Adjustable / stretch-fit by style" },
];

/** Old storefront IDs → canonical Fall 001 IDs. */
export const PRODUCT_ID_ALIASES: Record<string, CanonicalProductId> = {
  jersey: "heritage-jersey",
  shorts: "match-short",
  "full-set": "match-set",
  "ls-jersey": "performance-ls",
  "geo-shorts": "performance-short",
  "quarter-zip": "mens-raglan",
  crewneck: "womens-raglan",
  "baggy-sweats-black": "performance-set",
  "heritage-tee-black": "max-heavy-full-zip",
  sweatpants: "max-heavy-sweatpant",
  "baggy-sweats-garnet": "travel-set",
  "heritage-tee-garnet": "pique-polo",
  "hoops-jersey": "pocket-ls",
  "jersey-dress": "field-cargo",
  "aop-hat": "two-tone-cap",
  beanie: "gothic-b-beanie",
};

function listing(
  id: CanonicalProductId,
  handle: string,
  name: string,
  category: CategoryId,
  price: number,
  extra: Partial<CatalogProduct> = {},
): CatalogProduct {
  const copy = PRODUCT_COPY[id]!;
  const pending = imagesFor(id).pending === true;
  const previews = platePair(id);
  const campaign = campaignViews(id);
  return {
    id,
    handle,
    name,
    blurb: copy.card,
    line: copy.line,
    category,
    price,
    customizable: false,
    nameNumber: false,
    typography: false,
    previewPair: "front-back",
    sizeChart: "apparel",
    thumb: campaign.front ?? previews.front,
    previews,
    imageryPending: pending,
    ...extra,
  };
}

export const PRODUCTS: CatalogProduct[] = [
  listing("heritage-jersey", "bayonne-1936-heritage-jersey", "1936 Heritage Jersey", "match", 78, {
    personalizedPrice: 98,
    shopifyItem: "top",
    customizable: true,
    nameNumber: true,
    typography: true,
    lettering: LETTERING,
  }),
  listing("match-short", "bayonne-match-short", "Match Short", "match", 48, { shopifyItem: "bottom" }),
  listing("match-set", "bayonne-1936-match-set", "1936 Match Set", "match", 118, { shopifyItem: "set" }),

  listing("performance-ls", "bayonne-performance-long-sleeve", "Performance Long Sleeve", "performance", 64),
  listing("performance-short", "bayonne-performance-short", '7" Performance Short', "performance", 58),
  listing("mens-raglan", "bayonne-mens-tech-tee", "Men’s Raglan Tech Tee", "performance", 58),
  listing("womens-raglan", "bayonne-womens-tech-tee", "Women’s Raglan Tech Tee", "performance", 52),
  listing("performance-set", "bayonne-performance-set", "Performance Set", "performance", 112),

  listing("max-heavy-full-zip", "bayonne-max-heavy-full-zip", "Max Heavy Full Zip", "travel", 98),
  listing("max-heavy-sweatpant", "bayonne-max-heavy-sweatpant", "Max Heavy Sweatpant", "travel", 88),
  listing("travel-set", "bayonne-travel-set", "Travel Set", "travel", 168),
  listing("pique-polo", "bayonne-stretch-pique-polo", "Stretch Pique Polo", "travel", 78),
  listing("pocket-ls", "bayonne-pocket-long-sleeve", "Pocket Long Sleeve", "travel", 62),
  listing("field-cargo", "bayonne-field-cargo", "Field Cargo", "travel", 90),

  listing("harbor-coach", "bayonne-harbor-division-hooded-coach", "Harbor Division Hooded Coach Jacket", "harbor", 98),

  listing("two-tone-cap", "bayonne-two-tone-club-cap", "Two-Tone Club Cap", "club", 36, { sizeChart: "hat" }),
  listing("gothic-b-beanie", "bayonne-gothic-b-beanie", "Gothic B Beanie", "club", 34, { sizeChart: "hat" }),
  listing("club-sock", "bayonne-club-sock", "Club Sock", "club", 18, { sizeChart: "sock" }),
  listing("nb-bbp400", "new-balance-bb-p400", "New Balance BB P400", "club", 140, { sizeChart: "shoe" }),
  listing("nb-runner", "new-balance-fresh-foam-runner", "New Balance Fresh Foam Runner", "club", 150, { sizeChart: "shoe" }),
];

export function categoryById(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id);
}

export function productsInCategory(id: CategoryId) {
  return PRODUCTS.filter((p) => p.category === id);
}

/** Pieces with photography, for campaign lookbooks. */
export const LOOKBOOK_TEASER_IDS: CanonicalProductId[] = [
  "heritage-jersey",
  "match-short",
  "performance-ls",
  "mens-raglan",
  "travel-set",
  "harbor-coach",
  "two-tone-cap",
  "nb-bbp400",
];

export function productById(id: string) {
  const canonical = PRODUCT_ID_ALIASES[id] ?? id;
  return PRODUCTS.find((p) => p.id === canonical || p.handle === id);
}

export function fontById(id: FontId) {
  return FONTS.find((f) => f.id === id) ?? FONTS[0]!;
}

export function motifById(id: MotifId) {
  return MOTIFS.find((m) => m.id === id) ?? MOTIFS[0]!;
}

export function previewViewsFor(product: CatalogProduct): Array<"front" | "back" | "side"> {
  return product.previewPair === "front-side" ? ["front", "side"] : ["front", "back"];
}

export function letteringFor(product: CatalogProduct): LetteringLayout {
  return product.lettering ?? LETTERING;
}

export function fontsStylesheetHref() {
  return "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600&display=swap";
}
