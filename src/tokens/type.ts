/** Type stacks — story / wordmark / kit personalization. */

export const TYPE = {
  story: "Instrument Serif",
  wordmark: "Forge",
  kit: {
    railCut: "Rail Cut",
    beacon: "Beacon",
    whistle: "Whistle",
    forge: "Forge",
  },
} as const;

export type KitFontId = keyof typeof TYPE.kit;
