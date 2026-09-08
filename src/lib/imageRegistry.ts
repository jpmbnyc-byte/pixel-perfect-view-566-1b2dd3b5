/**
 * Canonical Fall 001 image registry.
 *
 * Every live product has four possible roles:
 *   product-front, product-back/detail, model-front, model-secondary.
 * Heroes are a fifth, separate role. Filenames are human-readable.
 * Do not import GUID hashes or retired garment aliases from routes.
 */

import comingSoon from "@/assets/bayonne/fall001/coming-soon.svg";

import matchHeroStadium from "@/assets/bayonne/fall001/match-hero-stadium.png";
import heritageJerseyProductFront from "@/assets/bayonne/fall001/heritage-jersey-product-front.jpg";
import heritageJerseyProductBack from "@/assets/bayonne/fall001/heritage-jersey-product-back.png";
import heritageJerseyModelFront from "@/assets/bayonne/fall001/heritage-jersey-model-front.jpg";
import heritageJerseyModelBack from "@/assets/bayonne/fall001/heritage-jersey-model-back.png";

import matchShortFront from "@/assets/bayonne/fall001/match-short-front.jpg";
import matchShortThreeQuarter from "@/assets/bayonne/fall001/match-short-three-quarter.png";
import matchShortBack from "@/assets/bayonne/fall001/match-short-back.png";
import matchSetFront from "@/assets/bayonne/fall001/match-set-front.png";

import performanceHero from "@/assets/bayonne/fall001/performance-male-hero.webp";
import performanceHeroBack from "@/assets/bayonne/fall001/performance-male-back.webp";
import performanceLsFront from "@/assets/bayonne/fall001/performance-ls-front.jpg";
import performanceLsBack from "@/assets/bayonne/fall001/performance-ls-back.jpg";
import performanceShortFront from "@/assets/bayonne/fall001/performance-short-front.jpg";
import mensRaglanBack from "@/assets/bayonne/fall001/local-issue-tee-back.webp";

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
  | "nb-runner";

export const IMAGE_REGISTRY: Record<CanonicalProductId, ProductImageSet> = {
  "heritage-jersey": {
    productFront: heritageJerseyProductFront,
    productBack: heritageJerseyProductBack,
    modelFront: heritageJerseyModelFront,
    modelSecondary: heritageJerseyModelBack,
  },
  "match-short": {
    productFront: matchShortFront,
    productBack: matchShortBack,
    modelFront: matchShortThreeQuarter,
    modelSecondary: matchShortBack,
  },
  "match-set": {
    productFront: matchSetFront,
    productBack: heritageJerseyProductBack,
    modelFront: matchHeroStadium,
    modelSecondary: heritageJerseyModelBack,
  },
  "performance-ls": {
    productFront: performanceLsFront,
    productBack: performanceLsBack,
    modelFront: performanceHero,
    modelSecondary: performanceHeroBack,
  },
  "performance-short": {
    productFront: performanceShortFront,
    productBack: performanceShortFront,
    modelFront: performanceHero,
    modelSecondary: performanceHeroBack,
  },
  "mens-raglan": {
    productFront: mensRaglanBack,
    productBack: mensRaglanBack,
    modelFront: mensRaglanBack,
    modelSecondary: mensRaglanBack,
  },
  "womens-raglan": { pending: true },
  "performance-set": {
    productFront: performanceLsFront,
    productBack: performanceShortFront,
    modelFront: performanceHero,
    modelSecondary: performanceHeroBack,
  },
  "max-heavy-full-zip": {
    productFront: maxHeavyFullZipFront,
    productBack: maxHeavyFullZipFront,
    modelFront: travelSetThreeQuarter,
    modelSecondary: maxHeavyFullZipFront,
  },
  "max-heavy-sweatpant": {
    productFront: maxHeavySweatpantBack,
    productBack: maxHeavySweatpantBack,
    modelFront: travelSetModelFront,
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
    productFront: clubGoodsHero,
    productBack: clubGoodsHero,
    modelFront: clubGoodsHero,
  },
  "nb-runner": { pending: true },
};

export const HEROES = {
  landing: matchHeroStadium,
  match: matchHeroStadium,
  performance: performanceHero,
  travel: travelSetModelFront,
  harbor: harborCoachFront,
  club: clubGoodsHero,
  og: matchHeroStadium,
} as const;

export const HERO_CROP: Record<
  keyof typeof HEROES,
  { fit: "cover" | "contain"; position: string }
> = {
  landing: { fit: "cover", position: "center 28%" },
  match: { fit: "cover", position: "center 32%" },
  performance: { fit: "cover", position: "center 12%" },
  travel: { fit: "cover", position: "center 18%" },
  harbor: { fit: "contain", position: "center" },
  club: { fit: "cover", position: "center 22%" },
  og: { fit: "cover", position: "center 28%" },
};

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
  return {
    ...(front ? { front } : {}),
    ...(back ? { back } : {}),
    ...(front && front !== back ? { "three-quarter": front } : {}),
  };
}

export { matchHeroStadium };
