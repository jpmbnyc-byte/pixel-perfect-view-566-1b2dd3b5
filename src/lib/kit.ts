/**
 * SINGLE GEOMETRY SOURCE (§9.1)
 * Every consumer — the live preview, the shared-image export, and (later) the
 * print file — reads placement from here. Nothing re-implements these numbers.
 * All placements are percentages of the mockup image, so they are resolution
 * invariant.
 */

export type Size = "2XS" | "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";
export type Item = "top" | "bottom" | "set";

export const SIZES: Size[] = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

/**
 * Back-panel lettering zones, as % of the mockup / print template.
 * Name is always a single line (preview shrinks to fit width).
 * centerX is the garment *spine* (clear panel midline), not always 50% of the photo.
 *   name  — X 47.5% · Y 16% · W 56% · H 7%
 *   number — X 47.5% · Y 28% · W 46% · H 36%  (prominent)
 * Products with different framing override via catalog.lettering.
 * Live preview also optically centers glyph ink (Forge and similar have right-biased bearings).
 */
export type LetteringLayout = {
  centerX: number;
  name: { y: number; heightPct: number; maxWidthPct: number };
  number: { y: number; heightPct: number; maxWidthPct: number };
  /** Black mesh / dark field — stronger white lettering contrast */
  surface: "garnet" | "blackout";
};

export const LETTERING: LetteringLayout = {
  /** Match jersey back clear-panel midline (side panels make geometric 50% look right) */
  centerX: 47.5,
  name: { y: 16, heightPct: 7, maxWidthPct: 56 },
  number: { y: 28, heightPct: 36, maxWidthPct: 46 },
  surface: "garnet",
};

export type KitConfig = {
  slug: string;
  teamName: string;
  sport: string;
  status: "draft" | "live" | "closed";
  closesAt: string;
  /** Calendar season stamped inside the collar and carried on the order. */
  seasonYear: number;
  colorway: { base: string; gesture: string; trim: string; name: string };
  font: {
    id: string;
    label: string;
    cssFamily: string;
    name: { fill: string; outline: string; outlineWidth: number };
  };
  rules: { nameMaxChars: number; numberMin: number; numberMax: number };
  pricing: { top: number; bottom: number; set: number; currency: string };
  mode: "both" | "top_only" | "bottom_only";
  shopify: {
    domain: string;
    /** Expected Shopify product handles used to auto-resolve size→variant IDs. */
    productHandles?: Partial<Record<Item, string>>;
    topVariants: Partial<Record<Size, string>>;
    bottomVariants: Partial<Record<Size, string>>;
    setVariants: Partial<Record<Size, string>>;
  };
};

export const SIZE_CHART: { size: Size; chest: string; length: string }[] = [
  { size: "2XS", chest: '30–32"', length: '25"' },
  { size: "XS", chest: '33–35"', length: '26"' },
  { size: "S", chest: '36–38"', length: '27"' },
  { size: "M", chest: '39–41"', length: '28"' },
  { size: "L", chest: '42–44"', length: '29"' },
  { size: "XL", chest: '45–47"', length: '30"' },
  { size: "2XL", chest: '48–50"', length: '31"' },
  { size: "3XL", chest: '51–53"', length: '32"' },
];

export function variantIdFor(kit: KitConfig, item: Item, size: Size) {
  const table =
    item === "top"
      ? kit.shopify.topVariants
      : item === "bottom"
        ? kit.shopify.bottomVariants
        : kit.shopify.setVariants;
  return table[size] ?? null;
}

export function priceFor(kit: KitConfig, item: Item) {
  return item === "top"
    ? kit.pricing.top
    : item === "bottom"
      ? kit.pricing.bottom
      : kit.pricing.set;
}

export function sanitizeName(raw: string, maxChars: number) {
  return raw
    .toUpperCase()
    .replace(/[^A-Z \-']/g, "")
    .slice(0, maxChars);
}

export function sanitizeNumber(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 2);
}

/** §6 — self-describing art spec carried on the Shopify order. */
export function buildArtSpec(args: {
  kit: KitConfig;
  item: Item;
  name: string;
  number: string;
  size: Size;
}) {
  const { kit, item, name, number, size } = args;
  return {
    v: 1,
    kit: kit.slug,
    sport: kit.sport,
    item,
    name,
    number,
    size,
    font: kit.font.id,
    season: kit.seasonYear,
    colors: {
      base: kit.colorway.base,
      gesture: kit.colorway.gesture,
      trim: kit.colorway.trim,
    },
  };
}

export function encodeArtSpec(spec: unknown) {
  const json = JSON.stringify(spec);
  if (typeof window === "undefined") return "";
  return window.btoa(unescape(encodeURIComponent(json)));
}

export function countdownParts(closesAt: string, now: number) {
  const ms = new Date(closesAt).getTime() - now;
  if (ms <= 0) return null;
  const days = Math.floor(ms / 864e5);
  const hours = Math.floor((ms % 864e5) / 36e5);
  const minutes = Math.floor((ms % 36e5) / 6e4);
  return { days, hours, minutes };
}
