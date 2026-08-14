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
import heritageTeeGarnetFront from "@/assets/bayonne/previews/heritage-tee-garnet-front.jpg";
import heritageTeeGarnetBack from "@/assets/bayonne/previews/heritage-tee-garnet-back.jpg";
import heritageTeeBlackFront from "@/assets/bayonne/previews/heritage-tee-black-front.jpg";
import heritageTeeBlackBack from "@/assets/bayonne/previews/heritage-tee-black-back.jpg";
import baggySweatsGarnetFront from "@/assets/bayonne/previews/baggy-sweats-garnet-front.jpg";
import baggySweatsGarnetSide from "@/assets/bayonne/previews/baggy-sweats-garnet-side.jpg";
import baggySweatsBlackFront from "@/assets/bayonne/previews/baggy-sweats-black-front.jpg";
import baggySweatsBlackSide from "@/assets/bayonne/previews/baggy-sweats-black-side.jpg";

import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import queenCrest from "@/assets/bayonne/reveal/reveal-01-crest.jpg";

import lifestyleFocus from "@/assets/bayonne/lifestyle/lifestyle-focus.jpg";
import lifestyleSideline from "@/assets/bayonne/lifestyle/lifestyle-sideline.jpg";
import lifestyleQueen from "@/assets/bayonne/lifestyle/lifestyle-queen.jpg";

/** Crest / logo masters — never swap in alternate bee PNGs. */
export const CRESTS = {
  /** Match kit + site chrome (landing header, store header, category aside). */
  primary: boxingBee,
  /** Queen Bees crest mark — story proof, not Match garment art. */
  queen: queenCrest,
} as const;

/**
 * Lifestyle campaign stills for the /team story.
 * Product commerce uses Venezia-studio PLATES (high-key luxury) — not these.
 * Zero manufacturer logos (no Adidas / Nike / NOCTA marks).
 */
export const LIFESTYLE = {
  focus: lifestyleFocus,
  sideline: lifestyleSideline,
  queen: lifestyleQueen,
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
  "heritage-tee-garnet": { front: heritageTeeGarnetFront, secondary: heritageTeeGarnetBack },
  "heritage-tee-black": { front: heritageTeeBlackFront, secondary: heritageTeeBlackBack },
  "baggy-sweats-garnet": { front: baggySweatsGarnetFront, secondary: baggySweatsGarnetSide },
  "baggy-sweats-black": { front: baggySweatsBlackFront, secondary: baggySweatsBlackSide },
} as const satisfies Record<string, PlatePair>;

export type PlateProductId = keyof typeof PLATES;

/**
 * Named surfaces — each points at a plate, crest, or lifestyle still.
 * Story surfaces use LIFESTYLE; product commerce uses PLATES.
 */
export const SURFACES = {
  /** First-viewport lifestyle — full-bleed athlete story */
  landingHero: LIFESTYLE.focus,
  /** Match lookbook / offering block — same module as Match Jersey PDP */
  landingMatchJersey: PLATES.jersey.front,
  /** Queen Bees / All-State lifestyle story */
  landingQueenStory: LIFESTYLE.queen,
  /** Sideline energy lifestyle */
  landingSideline: LIFESTYLE.sideline,
  /** Place / Bee Country atmospheric */
  landingPlace: LIFESTYLE.sideline,
  /** Open Graph / Twitter large image */
  ogImage: LIFESTYLE.focus,
  /** Category campaign heroes — same module as that category’s lead front */
  categoryHero: {
    match: PLATES.jersey.front,
    sideline: PLATES["hoops-jersey"].front,
    warmups: PLATES.crewneck.front,
    alumni: PLATES["heritage-tee-garnet"].front,
  },
  /** Alumni heritage feature — on-body still */
  landingHeritage: PLATES["heritage-tee-garnet"].front,
} as const;

export function plateFor(productId: PlateProductId): PlatePair {
  return PLATES[productId];
}
