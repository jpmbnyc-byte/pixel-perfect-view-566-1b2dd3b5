/**
 * Bayonne Athletics brand asset manifest — single source of truth.
 * Active Fall 001 products may intentionally reuse an approved studio module
 * until a dedicated ecommerce still is committed. The catalog never reaches
 * into the asset folders directly.
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

// Fall 001 committed ecommerce / on-body source-of-truth imagery.
import performanceMaleHero from "@/assets/bayonne/fall001/performance-male-hero.webp";
import performanceMaleBack from "@/assets/bayonne/fall001/performance-male-back.webp";
import heritageJerseyModelFront from "@/assets/bayonne/fall001/heritage-jersey-model-front.webp";
import heritageJerseyModelBack from "@/assets/bayonne/fall001/heritage-jersey-model-back.webp";

export const CRESTS = {
  primary: boxingBee,
  queen: queenCrest,
} as const;

export const LIFESTYLE = {
  focus: lifestyleFocus,
  sideline: lifestyleSideline,
  queen: lifestyleQueen,
} as const;

export type PlatePair = {
  front: string;
  secondary: string;
};

export const PLATES = {
  // Fall 001 exact committed imagery. Keep these aligned with CAMPAIGN_SHOTS so
  // grid rollover/tap, PDP product mode, category surfaces and campaign mode do
  // not drift onto legacy preview aliases.
  jersey: { front: heritageJerseyModelFront, secondary: heritageJerseyModelBack },
  "full-set": { front: heritageJerseyModelFront, secondary: heritageJerseyModelBack },
  "ls-jersey": { front: performanceMaleHero, secondary: performanceMaleBack },
  "geo-shorts": { front: performanceMaleHero, secondary: performanceMaleBack },
  "baggy-sweats-black": { front: performanceMaleHero, secondary: performanceMaleBack },

  // Awaiting dedicated Fall 001 ecommerce stills.
  shorts: { front: shortsFront, secondary: shortsSide },
  "hoops-jersey": { front: hoopsFront, secondary: hoopsBack },
  "jersey-dress": { front: dressFront, secondary: dressBack },
  "aop-hat": { front: hatFront, secondary: hatSide },
  crewneck: { front: crewFront, secondary: crewSide },
  sweatpants: { front: sweatsFront, secondary: sweatsSide },
  "quarter-zip": { front: qzipFront, secondary: qzipBack },
  "heritage-tee-garnet": { front: heritageTeeGarnetFront, secondary: heritageTeeGarnetBack },
  "heritage-tee-black": { front: heritageTeeBlackFront, secondary: heritageTeeBlackBack },
  "baggy-sweats-garnet": { front: baggySweatsGarnetFront, secondary: baggySweatsGarnetSide },

  // Active Club Goods aliases. These keep every slot visually filled while the
  // dedicated product stills from the Bayonne image library are promoted into
  // the repository as their own assets.
  beanie: { front: hatFront, secondary: hatSide },
  "club-sock": { front: setFront, secondary: setBack },
  "nb-bbp400": { front: dressFront, secondary: dressBack },
  "nb-runner": { front: crewFront, secondary: crewSide },
} as const satisfies Record<string, PlatePair>;

export type PlateProductId = keyof typeof PLATES;

export const SURFACES = {
  landingHero: LIFESTYLE.focus,
  landingMatchJersey: PLATES.jersey.front,
  landingQueenStory: LIFESTYLE.queen,
  landingSideline: performanceMaleHero,
  landingPlace: LIFESTYLE.sideline,
  ogImage: LIFESTYLE.focus,
  categoryHero: {
    match: PLATES.jersey.front,
    sideline: performanceMaleHero,
    warmups: PLATES["heritage-tee-black"].front,
    alumni: PLATES["aop-hat"].front,
  },
  landingHeritage: PLATES.jersey.front,
} as const;

export function plateFor(productId: PlateProductId): PlatePair {
  return PLATES[productId];
}
