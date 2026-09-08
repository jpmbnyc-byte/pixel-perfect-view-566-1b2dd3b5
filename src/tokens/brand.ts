/**
 * Bayonne Athletics color tokens.
 *
 * IDENTITY = digital storefront (brand sheet).
 * COLOR = kit / dye-sub manufacturing lock. Do not restyle print tests
 * onto identity hex — owayo still submits `#5A1626` as a Pantone.
 * See docs/OWAYO_F6_HERO.md.
 */

/** Site chrome — Represent × Dior Mens execution of the identity sheet. */
export const IDENTITY = {
  /** Strength, passion, heritage. Primary brand. */
  garnet: "#4B0F17",
  /** Discipline, focus, timeless. */
  black: "#0B0B0B",
  /** Balance, clarity, versatility. Ground of the site. */
  bone: "#EDE9E1",
  /** Resilience, movement, structure. */
  concrete: "#6B6B6B",
  /** Progress, elevation, detail. */
  silver: "#C0C0C0",
} as const;

export const COLOR = {
  /** Primary. Low-chroma dark red — hardest zone for dye-sub / owayo Pantone. */
  garnet: "#5A1626",
  /** Gradient terminal only. */
  garnetDeep: "#3E0F1A",
  /** SUBLIMATED black. Not trim black — see validateSublimation. */
  inkBlack: "#1C1A1B",
  /**
   * PRE-DYED / ringer / cuff / waistband black.
   * F6 Hero collar = flat ringer band of this + bone inner line (not knit rib polo).
   */
  trimBlack: "#0A0A0A",
  /** Piping, lettering, paper field accents, shorts outseam tape. */
  bone: "#F4F1F0",
  /** Print / campaign paper — not the storefront bone field. */
  paper: "#EDEAE7",
} as const;

export type ColorToken = keyof typeof COLOR;

/** Hard-blocked manufacturer / foreign club hues (ΔE00 neighbors handled in lint/validate). */
export const BLOCKED_HEX = {
  veneziaOrange: "#F26522",
  veneziaGreen: "#00A94F",
} as const;

export const SCALE = {
  xs: 12.8,
  sm: 16,
  md: 20,
  lg: 25,
  xl: 31.25,
  "2xl": 39,
  "3xl": 48.8,
  "4xl": 61,
} as const;

export const GRID = {
  columns: 12,
  gutter: 24,
  maxWidth: 1440,
  hairline: 1,
  radius: 0,
} as const;
