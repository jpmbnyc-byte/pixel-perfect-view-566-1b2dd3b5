/**
 * Bayonne Athletics brand asset manifest — single source of truth.
 * Active Fall 001 products may intentionally reuse an approved studio module
 * until a dedicated ecommerce still is committed. The catalog never reaches
 * into the asset folders directly.
 */

import hoopsFront from "@/assets/bayonne/previews/hoops-front.jpg";
import hoopsBack from "@/assets/bayonne/previews/hoops-back.jpg";
import dressFront from "@/assets/bayonne/previews/dress-front.jpg";
import dressBack from "@/assets/bayonne/previews/dress-back.jpg";
import crewFront from "@/assets/bayonne/previews/crew-front.jpg";
import crewSide from "@/assets/bayonne/previews/crew-side.jpg";
import qzipFront from "@/assets/bayonne/previews/qzip-front.jpg";
import qzipBack from "@/assets/bayonne/previews/qzip-back.jpg";
import hatFront from "@/assets/bayonne/previews/hat-front.jpg";
import hatSide from "@/assets/bayonne/previews/hat-side.jpg";
import heritageTeeGarnetFront from "@/assets/bayonne/previews/heritage-tee-garnet-front.jpg";
import heritageTeeGarnetBack from "@/assets/bayonne/previews/heritage-tee-garnet-back.jpg";

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

// Raw Fall 001 uploads currently committed at repository root. These are wired
// directly until the asset-normalization pass moves/renames them under fall001/.
import matchShortThreeQuarter from "../../150B6F30-4B4E-4E50-9DE3-0440E34D62CC.png";
import matchShortBack from "../../F3CE5C8D-ADD1-4B11-8542-264657F64B7B.png";
import matchSetFront from "../../DC99A72C-51A8-4F37-A174-EC910C2EE304.png";
import maxHeavyFullZipFront from "../../90601A5E-C860-48B4-BB6D-6E8F9033625D.png";
import maxHeavySweatpantBack from "../../B730F329-73AF-4F5D-855A-6FF7B245EDA1.png";
import travelSetFront from "../../C81A5372-0FDE-4597-A509-175ED7F1D3F3.png";
import travelSetThreeQuarter from "../../C6A95763-3C76-46DE-AA97-72119A2D17E4.png";
import clubSockFront from "../../76382080-65F1-4D92-B21A-9035E56F3D3F.png";
import clubSockDetail from "../../656799C3-1F5B-4130-A834-7C0F1F8F2BFA.png";
import gothicBBeanieBack from "../../0C045F07-B350-469F-B9A5-F9159A21415F.png";

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
  // 1936 Match
  jersey: { front: heritageJerseyModelFront, secondary: heritageJerseyModelBack },
  shorts: { front: matchShortThreeQuarter, secondary: matchShortBack },
  "full-set": { front: matchSetFront, secondary: heritageJerseyModelBack },

  // Performance
  "ls-jersey": { front: performanceMaleHero, secondary: performanceMaleBack },
  "geo-shorts": { front: performanceMaleHero, secondary: performanceMaleBack },
  "baggy-sweats-black": { front: performanceMaleHero, secondary: performanceMaleBack },
  crewneck: { front: crewFront, secondary: crewSide },
  "quarter-zip": { front: qzipFront, secondary: qzipBack },

  // Travel + Core
  "heritage-tee-black": { front: maxHeavyFullZipFront, secondary: maxHeavyFullZipFront },
  sweatpants: { front: travelSetFront, secondary: maxHeavySweatpantBack },
  "baggy-sweats-garnet": { front: travelSetFront, secondary: travelSetThreeQuarter },
  "heritage-tee-garnet": { front: heritageTeeGarnetFront, secondary: heritageTeeGarnetBack },
  "hoops-jersey": { front: hoopsFront, secondary: hoopsBack },
  "jersey-dress": { front: dressFront, secondary: dressBack },

  // Club Goods
  "aop-hat": { front: hatFront, secondary: hatSide },
  beanie: { front: gothicBBeanieBack, secondary: gothicBBeanieBack },
  "club-sock": { front: clubSockFront, secondary: clubSockDetail },
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
    match: PLATES["full-set"].front,
    sideline: performanceMaleHero,
    warmups: PLATES["heritage-tee-black"].front,
    alumni: PLATES["club-sock"].front,
  },
  landingHeritage: PLATES.jersey.front,
} as const;

export function plateFor(productId: PlateProductId): PlatePair {
  return PLATES[productId];
}
