/**
 * Bayonne Athletics active storefront catalog.
 *
 * Fall 001 rule: keep the existing storefront hierarchy, but only surface the
 * currently approved collection. The 1936 Heritage Jersey is the single
 * personalized product; every other product is fixed artwork.
 */

import type { Item, LetteringLayout } from "./kit";
import { LETTERING } from "./kit";
import { PLATES, SURFACES } from "./brandAssets";
import { CAMPAIGN_SHOTS } from "./campaignAssets";

function thumbFor(plateId: keyof typeof PLATES): string {
  return CAMPAIGN_SHOTS[plateId]?.front ?? PLATES[plateId].front;
}

export type CategoryId = "match" | "sideline" | "warmups" | "alumni";
export type MotifId = "chevron" | "grid" | "arc";
export type FontId = "rail" | "beacon" | "whistle" | "forge";
export type PreviewPair = "front-back" | "front-side";
export type SizeChartKind = "apparel" | "hat" | "shoe" | "sock";

export type ProductPreviews = { front: string; secondary: string };

export type CatalogProduct = {
  id: string;
  handle: string;
  name: string;
  blurb: string;
  category: CategoryId;
  price: number;
  /** Used only by the Heritage Jersey when the name/number engine is active. */
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
};

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  hero: string;
};

export const CATEGORIES: Category[] = [
  { id: "match", label: "1936 Match", description: "The club jersey and match short. Heritage made wearable.", hero: SURFACES.categoryHero.match },
  { id: "sideline", label: "Performance", description: "Technical layers for training, running and everyday movement.", hero: SURFACES.categoryHero.sideline },
  { id: "warmups", label: "Travel + Core", description: "Heavyweight travel pieces, everyday uniform and utility.", hero: SURFACES.categoryHero.warmups },
  { id: "alumni", label: "Club Goods", description: "Caps, knit, socks and the New Balance footwear rotation.", hero: SURFACES.categoryHero.alumni },
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

function fixed(
  id: keyof typeof PLATES,
  handle: string,
  name: string,
  blurb: string,
  category: CategoryId,
  price: number,
  sizeChart: SizeChartKind = "apparel",
): CatalogProduct {
  return {
    id,
    handle,
    name,
    blurb,
    category,
    price,
    customizable: false,
    nameNumber: false,
    typography: false,
    previewPair: "front-side",
    sizeChart,
    thumb: thumbFor(id),
    previews: { ...PLATES[id] },
  };
}

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "jersey",
    handle: "bayonne-1936-heritage-jersey",
    name: "1936 Heritage Jersey",
    blurb: "Black and garnet club jersey built from the Bayonne 1936 language. Wear it clean or add your name and number.",
    category: "match",
    price: 78,
    personalizedPrice: 98,
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
  fixed("shorts", "bayonne-match-short", "Match Short", "Black match short with restrained garnet club marks and a clean athletic cut.", "match", 48),
  fixed("full-set", "bayonne-1936-match-set", "1936 Match Set", "The complete club look: Heritage Jersey and Match Short.", "match", 118),

  fixed("ls-jersey", "bayonne-performance-long-sleeve", "Performance Long Sleeve", "Lightweight moisture-managing long sleeve made for training, running and cool-weather movement.", "sideline", 64),
  fixed("geo-shorts", "bayonne-performance-short", "7\" Performance Short", "Technical seven-inch training short with clean movement, zip-pocket utility and minimal Bayonne marking.", "sideline", 58),
  fixed("quarter-zip", "bayonne-mens-tech-tee", "Men's Raglan Tech Tee", "Lightweight raglan performance tee with a clean athletic fit and Bayonne chest mark.", "sideline", 58),
  fixed("crewneck", "bayonne-womens-tech-tee", "Women's Raglan Tech Tee", "Women's technical raglan tee designed for movement, breathability and an easy athletic fit.", "sideline", 52),
  fixed("baggy-sweats-black", "bayonne-performance-set", "Performance Set", "Performance Long Sleeve and 7-inch short paired as one training uniform.", "sideline", 112),

  fixed("heritage-tee-black", "bayonne-max-heavy-full-zip", "Max Heavy Full Zip", "Washed heavyweight full-zip layer with relaxed proportions and quiet Bayonne branding.", "warmups", 98),
  fixed("sweatpants", "bayonne-max-heavy-sweatpant", "Max Heavy Sweatpant", "Heavyweight relaxed sweatpant built to pair with the full zip and stand alone as a daily uniform.", "warmups", 88),
  fixed("baggy-sweats-garnet", "bayonne-travel-set", "Travel Set", "The heavyweight full zip and sweatpant together. Built for transit, recovery and everyday wear.", "warmups", 168),
  fixed("heritage-tee-garnet", "bayonne-stretch-pique-polo", "Stretch Pique Polo", "A refined heavyweight stretch polo that carries the club identity without looking like teamwear.", "warmups", 78),
  fixed("hoops-jersey", "bayonne-pocket-long-sleeve", "Pocket Long Sleeve", "Substantial cotton jersey, relaxed fit and a restrained left-pocket Bayonne mark.", "warmups", 62),
  fixed("jersey-dress", "bayonne-field-cargo", "Field Cargo", "Relaxed cotton-twill utility cargo with practical storage and a restrained Bayonne detail.", "warmups", 90),

  fixed("aop-hat", "bayonne-two-tone-club-cap", "Two-Tone Club Cap", "Bone crown, black bill and the garnet Gothic B. An everyday Bayonne club cap.", "alumni", 36, "hat"),
  fixed("beanie", "bayonne-gothic-b-beanie", "Gothic B Beanie", "Textured knit beanie with a single garnet Gothic B and an understated all-season profile.", "alumni", 34, "hat"),
  fixed("club-sock", "bayonne-club-sock", "Club Sock", "White club sock with a garnet Gothic B at the ankle. Clean enough for the kit, easy enough for every day.", "alumni", 18, "sock"),
  fixed("nb-bbp400", "new-balance-bb-p400", "New Balance BB P400", "Curated New Balance court/lifestyle shoe offered in the Bayonne Athletics footwear rotation.", "alumni", 140, "shoe"),
  fixed("nb-runner", "new-balance-fresh-foam-runner", "New Balance Fresh Foam Runner", "A cushioned everyday New Balance runner selected to sit naturally with the collection.", "alumni", 150, "shoe"),
];

export function categoryById(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id);
}

export function productsInCategory(id: CategoryId) {
  return PRODUCTS.filter((p) => p.category === id);
}

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id || p.handle === id);
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
  return "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600&family=Oswald:wght@600;700&display=swap";
}
