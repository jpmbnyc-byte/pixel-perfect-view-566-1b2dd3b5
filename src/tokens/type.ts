/** Type stacks — storefront identity vs kit personalization. */

export const TYPE = {
  /** High-contrast serif — Represent wordmark / Dior display. */
  wordmark: "Bodoni Moda",
  /** Editorial sentences on lookbook chapters. */
  story: "Cormorant Garamond",
  /** Extended grotesque for nav, meta, place-lines. */
  ui: "Barlow",
  /** Athletic condensed numerals — 201 lockup. */
  numeric: "Oswald",
  /** Script mark on the identity sheet. */
  script: "Great Vibes",
  kit: {
    railCut: "Rail Cut",
    beacon: "Beacon",
    whistle: "Whistle",
    forge: "Forge",
  },
} as const;

export type KitFontId = keyof typeof TYPE.kit;
