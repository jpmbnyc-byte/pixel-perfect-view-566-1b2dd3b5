/**
 * SINGLE GEOMETRY SOURCE (§9.1)
 * Every consumer — the live preview, shared-image export and print file —
 * reads placement from here.
 */

export type Size = "S" | "M" | "L" | "XL" | "2XL";
export type Item = "top" | "bottom" | "set";

/** Bayonne Athletics active apparel size run. */
export const SIZES: Size[] = ["S", "M", "L", "XL", "2XL"];

export type LetteringLayout = {
  centerX: number;
  name: {
    y: number;
    heightPct: number;
    maxWidthPct: number;
    archDeg?: number;
  };
  number: { y: number; heightPct: number; maxWidthPct: number };
  surface: "garnet" | "blackout";
};

export const LETTERING: LetteringLayout = {
  centerX: 49.3,
  name: { y: 20.5, heightPct: 5, maxWidthPct: 46, archDeg: 0 },
  number: { y: 26.5, heightPct: 34, maxWidthPct: 44 },
  surface: "garnet",
};

/** Print overlay on the blank 1936 Match Jersey back plate. */
export const LETTERING_MATCH_JERSEY: LetteringLayout = {
  centerX: 50,
  name: { y: 13.8, heightPct: 6.8, maxWidthPct: 48, archDeg: 8 },
  number: { y: 27.2, heightPct: 30, maxWidthPct: 40 },
  surface: "blackout",
};

/** Chest number on the 1936 Match Jersey front plate, below the club marks. Name stays on the back. */
export const LETTERING_MATCH_JERSEY_FRONT: LetteringLayout = {
  centerX: 50,
  name: { y: 0, heightPct: 0, maxWidthPct: 0 },
  number: { y: 35.2, heightPct: 23, maxWidthPct: 34 },
  surface: "blackout",
};

export const LETTERING_SET: LetteringLayout = {
  centerX: 50,
  name: { y: 18.5, heightPct: 4.4, maxWidthPct: 42, archDeg: 0 },
  number: { y: 24, heightPct: 27, maxWidthPct: 38 },
  surface: "garnet",
};

export const LETTERING_HOOPS: LetteringLayout = {
  centerX: 51.2,
  name: { y: 18, heightPct: 5, maxWidthPct: 42, archDeg: 0 },
  number: { y: 24, heightPct: 33, maxWidthPct: 40 },
  surface: "blackout",
};

export const LETTERING_DRESS: LetteringLayout = {
  centerX: 49.5,
  name: { y: 16.5, heightPct: 4.2, maxWidthPct: 36, archDeg: 0 },
  number: { y: 21.5, heightPct: 30, maxWidthPct: 32 },
  surface: "garnet",
};

export const LETTERING_LS: LetteringLayout = {
  centerX: 50,
  name: { y: 24, heightPct: 5, maxWidthPct: 46, archDeg: 0 },
  number: { y: 30, heightPct: 32, maxWidthPct: 44 },
  surface: "garnet",
};

export type KitConfig = {
  slug: string;
  teamName: string;
  sport: string;
  status: "draft" | "live" | "closed";
  closesAt: string;
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
    productHandles?: Partial<Record<Item, string>>;
    topVariants: Partial<Record<Size, string>>;
    bottomVariants: Partial<Record<Size, string>>;
    setVariants: Partial<Record<Size, string>>;
  };
};

export const SIZE_CHART: { size: Size; chest: string; length: string }[] = [
  { size: "S", chest: '36–38"', length: '27"' },
  { size: "M", chest: '39–41"', length: '28"' },
  { size: "L", chest: '42–44"', length: '29"' },
  { size: "XL", chest: '45–47"', length: '30"' },
  { size: "2XL", chest: '48–50"', length: '31"' },
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
    .normalize("NFC")
    .toLocaleUpperCase("und")
    .replace(/[^\p{L} \-']/gu, "")
    .slice(0, maxChars);
}

export function sanitizeNumber(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 2);
}

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
