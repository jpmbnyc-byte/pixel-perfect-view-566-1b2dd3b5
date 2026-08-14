import type { KitConfig } from "../kit";

/**
 * Bayonne Bees — Team Customs kit.
 *
 * Launch checklist (print partner → Shopify → configurator):
 * 1. Print partner: Jersey / Shorts / Full Set (Garnet/Black), Name + Number personalization ON
 * 2. Sync those products to Shopify into collection "Team Customs"
 * 3. Publish with handles below (or paste static variant IDs into shopify.*Variants)
 * 4. Keep this configurator as the only ATC path for customizable Team Customs SKUs
 * 5. Ops: each paid order → fulfillment → apply Name/Number from Shopify properties → fulfill
 *
 * Full listing map + placement guide: docs/LISTING_MAP.md
 * Until catalog sync is live, variant maps stay empty and checkout stays locked.
 */
export const BAYONNE_BEES_KIT: KitConfig = {
  slug: "bayonne-bees",
  teamName: "Bayonne Bees",
  sport: "football",
  status: "live",
  // Explicit ISO — do not use Date.now() here (build-time bake closes the store).
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
  /** owayo F6/FP6 Hero retail — see docs/OWAYO_F6_HERO.md / src/catalog/pricing.ts */
  pricing: { top: 115, bottom: 73, set: 188, currency: "USD" },
  mode: "both",
  shopify: {
    domain: "https://noparade-store.com",
    /** Shopify product handles. Size maps resolve from these at load time. */
    productHandles: {
      top: "bayonne-bees-jersey",
      bottom: "bayonne-bees-shorts",
      set: "bayonne-bees-full-set",
    },
    /**
     * Optional hardcoded Shopify variant IDs (size → id).
     * When non-empty, these win over handle resolve.
     * Leave empty until catalog sync; paste IDs here if handles differ.
     */
    topVariants: {},
    bottomVariants: {},
    setVariants: {},
  },
};
