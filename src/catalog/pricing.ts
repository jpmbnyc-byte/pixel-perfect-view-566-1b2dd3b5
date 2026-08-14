/**
 * Retail prices — owayo 10-unit tier at ~48% gross margin (cost ÷ 0.52).
 * Excludes freight from Germany, payment processing, and possible one-time
 * design setup ($60–180). Realized margin nearer 42–44%.
 * See docs/OWAYO_F6_HERO.md.
 */

export const PRICE_BAND = { min: 14, max: 204, currency: "USD" } as const;

/** Match strip retail (owayo F6 / FP6 Hero). */
export const OWAYO_MATCH_RETAIL = {
  jersey: 115,
  shorts: 73,
  socks: 15,
  /** Jersey + shorts */
  fullKit: 188,
  /** Jersey + shorts + socks */
  fullKitWithSocks: 204,
} as const;
