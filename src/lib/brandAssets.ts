/**
 * Bayonne Bees brand asset manifest — single source of truth.
 *
 * Rules:
 * 1. Site chrome + Match crest master = `crests.primary` only.
 * 2. Every SKU view is one plate module; thumbs, category heroes, landing,
 *    OG, and PDP all resolve through this file (or catalog fields built from it).
 * 3. No parallel `heroes/` fork of garment art — campaign stills that duplicate
 *    plates are forbidden. Delete duplicates; do not reintroduce them.
 * 4. Front/back (or front/side) for a SKU must be that SKU’s own pair — never
 *    borrow another product’s secondary when a dedicated plate exists.
 * 5. Queen Bees crest is Faithful/story only — not the Match kit crest.
 */

import jerseyFront from "@/assets/bayonne/previews/jersey-front.jpg";
import jerseyBack from "@/assets/bayonne/previews/jersey-back.jpg";
import shortsFront from "@/assets/bayonne/previews/shorts-front.jpg";
import shortsSide from "@/assets/bayonne/previews/shorts-side.jpg";
import setFront from "@/assets/bayonne/previews/set-front.jpg";
import setBack from "@/assets/bayonne/previews/set-back.jpg";
import hoopsFront from "@/assets/bayonne/previews/hoops-front.jpg";
import hoopsBack from "@/assets/bayonne/previews/hoops-back.jpg";
import dressFront from "@/assets/bayonne/previews/dress-front.jpg";
import dressBack from "@/assets/bayonne/previews/dress-back.jpg";
import crewFront from "@/assets/bayonne/previews/crew-front.jpg";
import crewSide from "@/assets/bayonne/previews/crew-side.jpg";
import lsFront from "@/assets/bayonne/previews/ls-front.jpg";
import lsBack from "@/assets/bayonne/previews/ls-back.jpg";
import qzipFront from "@/assets/bayonne/previews/qzip-front.jpg";
import qzipBack from "@/assets/bayonne/previews/qzip-back.jpg";
import geoShortsFront from "@/assets/bayonne/previews/geo-shorts-front.jpg";
import geoShortsSide from "@/assets/bayonne/previews/geo-shorts-side.jpg";
import hatFront from "@/assets/bayonne/previews/hat-front.jpg";
import hatSide from "@/assets/bayonne/previews/hat-side.jpg";
import sweatsFront from "@/assets/bayonne/previews/sweats-front.jpg";
import sweatsSide from "@/assets/bayonne/previews/sweats-side.jpg";

import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import queenCrest from "@/assets/bayonne/reveal/reveal-01-crest.jpg";

/** Crest / logo masters — never swap in alternate bee PNGs. */
export const CRESTS = {
  /** Match kit + site chrome (landing header, store header, category aside). */
  primary: boxingBee,
  /** Queen Bees story block only — not Match garment art. */
  queen: queenCrest,
} as const;

export type PlatePair = {
  front: string;
  /** Back (lettered tops / kit) or side (motif bottoms / hat). */
  secondary: string;
};

/**
 * One plate pair per catalog product id.
 * Import these modules everywhere — do not re-import the jpg paths elsewhere.
 */
export const PLATES = {
  jersey: { front: jerseyFront, secondary: jerseyBack },
  shorts: { front: shortsFront, secondary: shortsSide },
  "full-set": { front: setFront, secondary: setBack },
  "hoops-jersey": { front: hoopsFront, secondary: hoopsBack },
  "jersey-dress": { front: dressFront, secondary: dressBack },
  "aop-hat": { front: hatFront, secondary: hatSide },
  crewneck: { front: crewFront, secondary: crewSide },
  sweatpants: { front: sweatsFront, secondary: sweatsSide },
  "ls-jersey": { front: lsFront, secondary: lsBack },
  "quarter-zip": { front: qzipFront, secondary: qzipBack },
  "geo-shorts": { front: geoShortsFront, secondary: geoShortsSide },
} as const satisfies Record<string, PlatePair>;

export type PlateProductId = keyof typeof PLATES;

/**
 * Named surfaces — each points at a plate or crest from this manifest.
 * Landing hero = Match Jersey front so hero crest matches the primary CTA PDP.
 */
export const SURFACES = {
  /** First-viewport garment plate on /team */
  landingHero: PLATES.jersey.front,
  /** Match lookbook / offering block on landing */
  landingMatchJersey: PLATES.jersey.front,
  /** Place / Bee Country atmospheric plate */
  landingPlace: PLATES["geo-shorts"].front,
  /** Open Graph / Twitter large image */
  ogImage: PLATES.jersey.front,
  /** Category campaign heroes — same module as that category’s lead front */
  categoryHero: {
    match: PLATES.jersey.front,
    sideline: PLATES["hoops-jersey"].front,
    warmups: PLATES.crewneck.front,
    alumni: PLATES["geo-shorts"].front,
  },
} as const;

export function plateFor(productId: PlateProductId): PlatePair {
  return PLATES[productId];
}
