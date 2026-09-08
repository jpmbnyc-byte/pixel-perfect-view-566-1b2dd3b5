/**
 * Fun budget — spend fun in named places; keep everything else quiet.
 * SPEC PATCH 03 §4.
 */

export const FUN_BUDGET = {
  maxAnimatedElementsPerViewport: 2,
  maxPunsPerPage: 1,
  /** Site-wide total. */
  maxEasterEggs: 2,
  prefersReducedMotion: "all motion disabled, no exceptions",
  bannedForever: [
    "confetti",
    "emoji in nav",
    "bouncing cart icon",
    "auto-playing sound",
    "cursor trails",
  ],
  /** Named fun surfaces — everything else stays quiet. */
  allowedSurfaces: [
    "configurator",
    "copy-r1-r3",
    "drop-counter",
    "hover-load-micro",
    "easter-eggs",
  ],
  bannedSurfaces: [
    "checkout",
    "size-guide",
    "shipping-returns",
    "error-states",
    "r4-copy",
    "school-district-procurement",
  ],
} as const;

/** Easter egg slots — undocumented, discoverable, never explained. Cap = maxEasterEggs. */
export const EASTER_EGGS = {
  number1936: { id: "number-1936", trigger: "type 1936 into the number field" },
  konamiBee: { id: "konami-homepage", trigger: "Konami on the homepage" },
} as const;
