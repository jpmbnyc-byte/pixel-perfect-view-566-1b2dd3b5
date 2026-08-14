/**
 * Alumni heritage lifestyle copy — customer-facing.
 * BOE-safe: Bayonne / 1936 / Avenue A only (no school nickname marks).
 */

export type HeritageProductCopy = {
  tagline: string;
  body: string;
  card: string;
  cta: string;
  confirm: string;
};

export const HERITAGE_PRODUCT_COPY = {
  "heritage-tee-garnet": {
    tagline: "Garnet that remembers.",
    body: "Bayonne in script across the chest. The year where it belongs.\n\nA heavyweight short-sleeve cut with bone raglan panels — the same garnet the gym has known since 1936, cleaned up for Avenue A after dark. Back graphic carries the building, the wreath, and the line we keep: hard work builds great families.\n\nNo name field. The art is finished.",
    card: "Garnet body. Bone panels. Bayonne script and 1936 on the chest.",
    cta: "Choose your size →",
    confirm:
      "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "heritage-tee-black": {
    tagline: "Blackout. Still Bayonne.",
    body: "Same script. Same year. Night-shift black.\n\nA heavyweight short-sleeve with white Bayonne lettering and a garnet shadow — quiet enough for the street, loud enough that you know where it’s from. The back keeps the building, the wreath, and 1936.\n\nNo personalization. Wear it as drawn.",
    card: "Black field. White Bayonne script. EST. 36 where it counts.",
    cta: "Choose your size →",
    confirm:
      "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "baggy-sweats-garnet": {
    tagline: "1936, worn wide.",
    body: "Baggy garnet fleece cut to pool at the shoe — not a track pant, not a compromise.\n\nBB crest on the thigh. Vertical 1936 down the leg with the boxing-bee mark at the hem. Built to sit under the Heritage Tee or stand alone on Avenue A.\n\nNo name. No number. Just the year.",
    card: "Wide garnet fleece. Crest on the thigh. 1936 down the leg.",
    cta: "Find your fit →",
    confirm:
      "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "baggy-sweats-black": {
    tagline: "Same year. Darker room.",
    body: "Black baggy fleece with the same restraint as the garnet pair — crest on the thigh, 1936 stacked down the leg, boxing-bee at the cuff.\n\nMade to move with the black Heritage Tee or over anything you’d wear after the whistle.\n\nNothing extra printed. Nothing missing.",
    card: "Black baggy fleece. Crest. 1936 vertical. Nothing loud.",
    cta: "Find your fit →",
    confirm:
      "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
} as const satisfies Record<string, HeritageProductCopy>;

export const ALUMNI_DEPARTMENT_COPY = {
  line: "1936 — kept close.",
  title: "Heritage. Off the field.",
  body: "Heavyweight tees and baggy sweats in Bayonne garnet and blackout black — the year on the leg, the script on the chest, Avenue A in the cut.",
  cta: "Shop Alumni →",
} as const;

export type HeritageProductId = keyof typeof HERITAGE_PRODUCT_COPY;

export function heritageCopyFor(productId: string): HeritageProductCopy | null {
  if (productId in HERITAGE_PRODUCT_COPY) {
    return HERITAGE_PRODUCT_COPY[productId as HeritageProductId];
  }
  return null;
}
