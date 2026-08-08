import type { KitConfig } from "../kit";

/**
 * Bayonne Bees — Team Customs kit.
 *
 * Launch checklist (Merchize → Shopify → configurator):
 * 1. In Merchize: Jersey / Shorts / Full Set (Garnet/Black), Name + Number personalization ON
 * 2. Sync those products to Shopify into collection "Team Customs"
 * 3. Publish with handles below (or paste static variant IDs into shopify.*Variants)
 * 4. Keep this configurator as the only ATC path for customizable Team Customs SKUs
 * 5. Ops: each paid order → Merchize → apply Name/Number from Shopify properties → fulfill
 *
 * Full listing map + placement guide: docs/MERCHIZE_LISTING_MAP.md
 * Until Merchize sync is live, variant maps stay empty and checkout stays locked.
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
    id: "match_day",
    label: "Match Day",
    cssFamily: "'Bebas Neue', sans-serif",
    name: { fill: "#F4F1F0", outline: "#5A1626", outlineWidth: 2 },
  },
  rules: { nameMaxChars: 12, numberMin: 0, numberMax: 99 },
  pricing: { top: 58, bottom: 34, set: 89, currency: "USD" },
  mode: "both",
  shopify: {
    domain: "https://noparade-store.com",
    /** Merchize→Shopify product handles. Size maps resolve from these at load time. */
    productHandles: {
      top: "bayonne-bees-jersey",
      bottom: "bayonne-bees-shorts",
      set: "bayonne-bees-full-set",
    },
    /**
     * Optional hardcoded Shopify variant IDs (size → id).
     * When non-empty, these win over handle resolve.
     * Leave empty until Merchize sync; paste IDs here if handles differ.
     */
    topVariants: {},
    bottomVariants: {},
    setVariants: {},
  },
};
