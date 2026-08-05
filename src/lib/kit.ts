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

/** Back-panel lettering zones, as % of the mockup image. */
export const LETTERING = {
  centerX: 48.8,
  name: { y: 29.5, heightPct: 3.2, maxWidthPct: 34 },
  number: { y: 44.5, heightPct: 13.5 },
} as const;

export type KitConfig = {
  slug: string;
  teamName: string;
  sport: string;
  status: "draft" | "live" | "closed";
  closesAt: string;
  family: { id: string; label: string; version: number; doctrine: string };
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
    topVariants: Partial<Record<Size, string>>;
    bottomVariants: Partial<Record<Size, string>>;
    setVariants: Partial<Record<Size, string>>;
  };
};

/**
 * Demo kit. Phase 2 replaces this with a Cloud read on `team_kits.slug`.
 * Note 3XL intentionally has no variant id — it must render as unavailable
 * rather than submitting a broken order (§10).
 */
export const DEMO_KIT: KitConfig = {
  slug: "bayonne-bees",
  teamName: "Bayonne Bees",
  sport: "soccer",
  status: "live",
  closesAt: new Date(Date.now() + 6 * 864e5).toISOString(),
  family: {
    id: "vespers",
    label: "VESPERS",
    version: 26,
    doctrine: "One line, held.",
  },
  colorway: {
    base: "#1F2A44",
    gesture: "#C9A96A",
    trim: "#EFE8DA",
    name: "Navy / Gold",
  },
  font: {
    id: "match_day",
    label: "Match Day",
    cssFamily: "'Bebas Neue', sans-serif",
    name: { fill: "#EFE8DA", outline: "#C9A96A", outlineWidth: 2 },
  },
  rules: { nameMaxChars: 12, numberMin: 0, numberMax: 99 },
  pricing: { top: 58, bottom: 34, set: 89, currency: "USD" },
  mode: "both",
  shopify: {
    domain: "https://noparade-store.com",
    topVariants: {
      "2XS": "44100000000001",
      XS: "44100000000002",
      S: "44100000000003",
      M: "44100000000004",
      L: "44100000000005",
      XL: "44100000000006",
      "2XL": "44100000000007",
    },
    bottomVariants: {
      "2XS": "44200000000001",
      XS: "44200000000002",
      S: "44200000000003",
      M: "44200000000004",
      L: "44200000000005",
      XL: "44200000000006",
      "2XL": "44200000000007",
    },
    setVariants: {
      "2XS": "44300000000001",
      XS: "44300000000002",
      S: "44300000000003",
      M: "44300000000004",
      L: "44300000000005",
      XL: "44300000000006",
      "2XL": "44300000000007",
    },
  },
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
    .replace(/[^A-Z \-]/g, "")
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
    family: `${kit.family.id}-${kit.family.version}`,
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
