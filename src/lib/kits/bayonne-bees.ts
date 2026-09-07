import type { KitConfig } from "../kit";

/**
 * Bayonne Athletics — Fall 001.
 *
 * Commerce rule:
 * - Heritage Jersey base: $78
 * - Heritage Jersey personalized: $98 (separate Shopify price/variant required)
 * - Match Short: $48
 * - Match Set: $118
 *
 * The storefront blocks personalized checkout until the $98 commerce variant is
 * synced, preventing a custom jersey from being charged at the $78 base price.
 */
export const BAYONNE_BEES_KIT: KitConfig = {
  slug: "bayonne-bees",
  teamName: "Bayonne Athletics",
  sport: "football",
  status: "live",
  closesAt: "2026-09-15T03:59:59.000Z",
  seasonYear: 2026,
  colorway: {
    base: "#5A1626",
    gesture: "#F4F1F0",
    trim: "#0A0A0A",
    name: "Garnet / Black",
  },
  font: {
    id: "forge",
    label: "Forge",
    cssFamily: "'Forge', sans-serif",
    name: { fill: "#F4F1F0", outline: "#5A1626", outlineWidth: 2 },
  },
  rules: { nameMaxChars: 12, numberMin: 0, numberMax: 99 },
  pricing: { top: 78, bottom: 48, set: 118, currency: "USD" },
  mode: "both",
  shopify: {
    domain: "https://noparade-store.com",
    productHandles: {
      top: "bayonne-1936-heritage-jersey",
      bottom: "bayonne-match-short",
      set: "bayonne-1936-match-set",
    },
    topVariants: {},
    bottomVariants: {},
    setVariants: {},
  },
};
