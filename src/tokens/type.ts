/** Type stacks — storefront identity vs kit personalization. */

export const TYPE = {
  wordmark: "Bodoni Moda",
  story: "Cormorant Garamond",
  ui: "Barlow",
  numeric: "Oswald",
  script: "Great Vibes",
  kit: {
    railCut: "Rail Cut",
    beacon: "Beacon",
    whistle: "Whistle",
    forge: "Forge",
  },
} as const;

export type KitFontId = keyof typeof TYPE.kit;
