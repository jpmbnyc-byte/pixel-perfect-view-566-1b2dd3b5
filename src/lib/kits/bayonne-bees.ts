import type { KitConfig } from "../kit";

/**
 * Bayonne Bees — VESPERS 26 Team Customs kit.
 *
 * Launch checklist (Printful → Shopify → configurator):
 * 1. In Printful: Jersey / Shorts / Full Set (Navy/Gold), Name + Number personalization ON
 * 2. Sync those 3 products to Shopify into collection "Team Customs"
 * 3. Publish with handles below (or paste static variant IDs into shopify.*Variants)
 * 4. Keep this configurator as the only add-to-cart path for Team Customs
 * 5. Ops: each paid order → Printful "Personalization required" → paste Name/Number → confirm
 *
 * Until Printful sync is live, variant maps stay empty and checkout stays locked.
 */
export const BAYONNE_BEES_KIT: KitConfig = {
  slug: "bayonne-bees",
  teamName: "Bayonne Bees",
  sport: "soccer",
  status: "live",
  // Explicit ISO — do not use Date.now() here (build-time bake closes the store).
  closesAt: "2026-09-15T03:59:59.000Z",
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
    /** Printful→Shopify product handles. Size maps resolve from these at load time. */
    productHandles: {
      top: "bayonne-bees-jersey",
      bottom: "bayonne-bees-shorts",
      set: "bayonne-bees-full-set",
    },
    /**
     * Optional hardcoded Shopify variant IDs (size → id).
     * When non-empty, these win over handle resolve.
     * Leave empty until Printful sync; paste IDs here if handles differ.
     */
    topVariants: {},
    bottomVariants: {},
    setVariants: {},
  },
};
