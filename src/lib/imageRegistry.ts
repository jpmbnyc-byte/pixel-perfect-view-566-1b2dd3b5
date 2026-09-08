/**
 * Canonical Fall 001 image registry.
 *
 * Every live product has four possible roles:
 *   product-front, product-back/detail, model-front, model-secondary.
 * Heroes are a fifth, separate role. Filenames are human-readable.
 *
 * Do not import GUID hashes, retired Bees garments, the stadium mascot
 * plate, the boxing-kit match-set mockup, or the corrupt local-issue webp.
 * Those files live under src/assets/bayonne/archive/ and are not storefront plates.
 */

import comingSoon from "@/assets/bayonne/fall001/coming-soon.svg";

import matchJerseyKitFront from "@/assets/bayonne/fall001/match-jersey-kit-front.png";
import matchJerseyBackBlank from "@/assets/bayonne/fall001/match-jersey-back-blank.jpg";
import matchJerseyStadium from "@/assets/bayonne/fall001/match-jersey-stadium.png";
import matchJerseyStudioFront from "@/assets/bayonne/fall001/match-jersey-studio-front.png";
import matchJerseyChest from "@/assets/bayonne/fall001/match-jersey-chest.png";
import matchJerseyStudioBall from "@/assets/bayonne/fall001/match-jersey-studio-ball.png";
import matchJerseyStudioBack from "@/assets/bayonne/fall001/match-jersey-studio-back.png";

import matchShortFront from "@/assets/bayonne/fall001/match-short-front.jpg";
import matchShortThreeQuarter from "@/assets/bayonne/fall001/match-short-three-quarter.png";
import matchShortBack from "@/assets/bayonne/fall001/match-short-back.png";

import performanceHero from "@/assets/bayonne/fall001/performance-hero.jpg";
import performanceLsModel from "@/assets/bayonne/fall001/performance-ls-model.jpg";
import performanceLsFront from "@/assets/bayonne/fall001/performance-ls-front.jpg";
import performanceLsBack from "@/assets/bayonne/fall001/performance-ls-back.jpg";
import performanceShortFront from "@/assets/bayonne/fall001/performance-short-front.jpg";

import maxHeavyFullZipFront from "@/assets/bayonne/fall001/max-heavy-full-zip-front.png";
import maxHeavySweatpantBack from "@/assets/bayonne/fall001/max-heavy-sweatpant-back.png";
import travelSetModelFront from "@/assets/bayonne/fall001/travel-set-model-front.png";
import travelSetThreeQuarter from "@/assets/bayonne/fall001/travel-set-three-quarter.png";

import harborCoachFront from "@/assets/bayonne/fall001/harbor-coach-front.png";

import clubGoodsHero from "@/assets/bayonne/fall001/club-goods-hero.png";
import gothicBBeanieBack from "@/assets/bayonne/fall001/gothic-b-beanie-back.png";
import gothicBBeanieModelBack from "@/assets/bayonne/fall001/gothic-b-beanie-model-back.png";
import clubSockFront from "@/assets/bayonne/fall001/club-sock-front.png";
import clubSockDetail from "@/assets/bayonne/fall001/club-sock-detail.png";

import nbAcRunnerLateral from "@/assets/bayonne/fall001/nb-ac-runner-lateral.jpg";
import nbAcRunnerAngle from "@/assets/bayonne/fall001/nb-ac-runner-medial.jpg";
import nbAcRunnerTop from "@/assets/bayonne/fall001/nb-ac-runner-top.jpg";
import nbAcRunnerOutsole from "@/assets/bayonne/fall001/nb-ac-runner-detail.jpg";
import nbAcHeatLateral from "@/assets/bayonne/fall001/nb-ac-heat-lateral.jpg";
import nbAcHeatAngle from "@/assets/bayonne/fall001/nb-ac-heat-angle.jpg";
import nbAcHeatHeel from "@/assets/bayonne/fall001/nb-ac-heat-heel.jpg";
import nbAcHeatTop from "@/assets/bayonne/fall001/nb-ac-heat-top.jpg";
import nbAcCardinalLateral from "@/assets/bayonne/fall001/nb-ac-cardinal-lateral.jpg";
import nbAcCardinalAngle from "@/assets/bayonne/fall001/nb-ac-cardinal-angle.jpg";
import nbAcCardinalHeel from "@/assets/bayonne/fall001/nb-ac-cardinal-heel.jpg";
import nbAcCardinalTop from "@/assets/bayonne/fall001/nb-ac-cardinal-top.jpg";
import nbP400Lateral from "@/assets/bayonne/fall001/nb-p400-lateral.jpg";
import nbP400ThreeQuarter from "@/assets/bayonne/fall001/nb-p400-three-quarter.jpg";
import nbP400Top from "@/assets/bayonne/fall001/nb-p400-pair.jpg";
import nbP400Outsole from "@/assets/bayonne/fall001/nb-p400-outsole.jpg";
import nbP400VoltLateral from "@/assets/bayonne/fall001/nb-p400-volt-lateral.jpg";
import nbP400VoltAngle from "@/assets/bayonne/fall001/nb-p400-volt-angle.jpg";
import nbP400VoltTop from "@/assets/bayonne/fall001/nb-p400-volt-top.jpg";
import nbP400VoltPair from "@/assets/bayonne/fall001/nb-p400-volt-pair.jpg";

import { isFootwearId } from "./footwear";

export const COMING_SOON = comingSoon;

export type ImageRole =
  | "productFront"
  | "productBack"
  | "modelFront"
  | "modelSecondary";

export type ProductImageSet = {
  productFront?: string;
  productBack?: string;
  modelFront?: string;
  modelSecondary?: string;
  /** True when the garment still needs dedicated photography. */
  pending?: boolean;
};

export type CanonicalProductId =
  | "heritage-jersey"
  | "match-short"
  | "match-set"
  | "performance-ls"
  | "performance-short"
  | "mens-raglan"
  | "womens-raglan"
  | "performance-set"
  | "max-heavy-full-zip"
  | "max-heavy-sweatpant"
  | "travel-set"
  | "pique-polo"
  | "pocket-ls"
  | "field-cargo"
  | "harbor-coach"
  | "two-tone-cap"
  | "gothic-b-beanie"
  | "club-sock"
  | "nb-bbp400"
  | "nb-p400-chalk"
  | "nb-p400-volt"
  | "nb-runner"
  | "nb-runner-heat"
  | "nb-runner-cardinal";

export const IMAGE_REGISTRY: Record<CanonicalProductId, ProductImageSet> = {
  "heritage-jersey": {
    productFront: matchJerseyKitFront,
    productBack: matchJerseyBackBlank,
    modelFront: matchJerseyStudioFront,
    modelSecondary: matchJerseyStudioBack,
  },
  "match-short": {
    productFront: matchShortFront,
    productBack: matchShortBack,
    modelFront: matchShortThreeQuarter,
    modelSecondary: matchShortBack,
  },
  "match-set": {
    productFront: matchJerseyKitFront,
    productBack: matchShortFront,
    modelFront: matchJerseyKitFront,
    modelSecondary: matchJerseyStudioBall,
  },
  "performance-ls": {
    productFront: performanceLsFront,
    productBack: performanceLsBack,
    modelFront: performanceLsModel,
    modelSecondary: performanceLsBack,
  },
  "performance-short": {
    productFront: performanceShortFront,
    productBack: performanceShortFront,
    modelFront: performanceShortFront,
    modelSecondary: performanceShortFront,
  },
  "mens-raglan": { pending: true },
  "womens-raglan": { pending: true },
  "performance-set": {
    productFront: performanceLsFront,
    productBack: performanceShortFront,
    modelFront: performanceHero,
    modelSecondary: performanceLsBack,
  },
  "max-heavy-full-zip": {
    productFront: maxHeavyFullZipFront,
    productBack: maxHeavyFullZipFront,
    modelFront: maxHeavyFullZipFront,
    modelSecondary: maxHeavyFullZipFront,
  },
  "max-heavy-sweatpant": {
    productFront: maxHeavySweatpantBack,
    productBack: maxHeavySweatpantBack,
    modelFront: maxHeavySweatpantBack,
    modelSecondary: maxHeavySweatpantBack,
  },
  "travel-set": {
    productFront: travelSetModelFront,
    productBack: maxHeavySweatpantBack,
    modelFront: travelSetModelFront,
    modelSecondary: travelSetThreeQuarter,
  },
  "pique-polo": { pending: true },
  "pocket-ls": { pending: true },
  "field-cargo": { pending: true },
  "harbor-coach": {
    productFront: harborCoachFront,
    productBack: harborCoachFront,
    modelFront: harborCoachFront,
  },
  "two-tone-cap": {
    productFront: clubGoodsHero,
    productBack: clubGoodsHero,
    modelFront: clubGoodsHero,
    modelSecondary: clubGoodsHero,
  },
  "gothic-b-beanie": {
    productFront: gothicBBeanieBack,
    productBack: gothicBBeanieBack,
    modelFront: gothicBBeanieModelBack,
    modelSecondary: gothicBBeanieBack,
  },
  "club-sock": {
    productFront: clubSockFront,
    productBack: clubSockDetail,
    modelFront: clubSockFront,
    modelSecondary: clubSockDetail,
  },
  "nb-bbp400": {
    productFront: nbP400Lateral,
    productBack: nbP400Outsole,
    modelFront: nbP400ThreeQuarter,
    modelSecondary: nbP400Top,
  },
  "nb-p400-chalk": { pending: true },
  "nb-p400-volt": {
    productFront: nbP400VoltLateral,
    productBack: nbP400VoltPair,
    modelFront: nbP400VoltAngle,
    modelSecondary: nbP400VoltTop,
  },
  "nb-runner": {
    productFront: nbAcRunnerLateral,
    productBack: nbAcRunnerOutsole,
    modelFront: nbAcRunnerAngle,
    modelSecondary: nbAcRunnerTop,
  },
  "nb-runner-heat": {
    productFront: nbAcHeatLateral,
    productBack: nbAcHeatHeel,
    modelFront: nbAcHeatAngle,
    modelSecondary: nbAcHeatTop,
  },
  "nb-runner-cardinal": {
    productFront: nbAcCardinalLateral,
    productBack: nbAcCardinalHeel,
    modelFront: nbAcCardinalAngle,
    modelSecondary: nbAcCardinalTop,
  },
};

export const HEROES = {
  landing: matchJerseyStadium,
  match: matchJerseyKitFront,
  performance: performanceHero,
  travel: travelSetThreeQuarter,
  harbor: harborCoachFront,
  club: clubGoodsHero,
  og: matchJerseyKitFront,
} as const;

export const HERO_CROP: Record<
  keyof typeof HEROES,
  { fit: "cover" | "contain"; position: string }
> = {
  landing: { fit: "cover", position: "center 42%" },
  match: { fit: "contain", position: "center 12%" },
  performance: { fit: "cover", position: "center 58%" },
  travel: { fit: "cover", position: "center 16%" },
  harbor: { fit: "cover", position: "center 42%" },
  club: { fit: "cover", position: "center 10%" },
  og: { fit: "contain", position: "center" },
};

export type GalleryShot = { src: string; alt: string };

const MATCH_JERSEY_GALLERY: GalleryShot[] = [
  { src: matchJerseyKitFront, alt: "1936 Match Jersey and Match Short, front" },
  { src: matchJerseyStudioFront, alt: "1936 Match Jersey, worn" },
  { src: matchJerseyChest, alt: "1936 Match Jersey, chest detail" },
  { src: matchJerseyStudioBall, alt: "1936 Match Jersey with ball" },
  { src: matchJerseyStadium, alt: "1936 Match Jersey, stadium tunnel" },
  { src: matchJerseyStudioBack, alt: "1936 Match Jersey back with sample name and number" },
  { src: matchJerseyBackBlank, alt: "1936 Match Jersey, blank back for personalization" },
];

/** Ordered storefront gallery. Never the customizer overlay base except the dedicated blank back. */
export function galleryShots(id: CanonicalProductId): GalleryShot[] {
  if (id === "heritage-jersey") return MATCH_JERSEY_GALLERY;
  const set = IMAGE_REGISTRY[id];
  if (set.pending) return [];
  const views = campaignViews(id);
  const pair = platePair(id);
  const seen = new Set<string>();
  const shots: GalleryShot[] = [];
  for (const src of [views.front, views["three-quarter"], views.back, pair.front, pair.secondary]) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    shots.push({ src, alt: "" });
  }
  return shots;
}

export { matchJerseyBackBlank };

export function imagesFor(id: CanonicalProductId): ProductImageSet {
  return IMAGE_REGISTRY[id];
}

export function platePair(id: CanonicalProductId): { front: string; secondary: string } {
  const set = IMAGE_REGISTRY[id];
  if (set.pending) {
    return { front: COMING_SOON, secondary: COMING_SOON };
  }
  const front = set.productFront ?? set.modelFront ?? COMING_SOON;
  const secondary = set.productBack ?? set.modelSecondary ?? front;
  return { front, secondary };
}

export function campaignViews(id: CanonicalProductId): {
  front?: string;
  back?: string;
  "three-quarter"?: string;
} {
  const set = IMAGE_REGISTRY[id];
  if (set.pending) return {};
  const front = set.modelFront ?? set.productFront;
  const back = set.modelSecondary ?? set.productBack;
  const footwearThreeQuarter =
    isFootwearId(id) &&
    set.productFront &&
    set.productFront !== front &&
    set.productFront !== back
      ? set.productFront
      : undefined;
  return {
    ...(front ? { front } : {}),
    ...(back ? { back } : {}),
    ...(footwearThreeQuarter
      ? { "three-quarter": footwearThreeQuarter }
      : front && front !== back
        ? { "three-quarter": front }
        : {}),
  };
}
