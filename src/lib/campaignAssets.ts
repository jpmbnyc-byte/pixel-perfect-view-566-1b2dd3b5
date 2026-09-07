/**
 * Tier 1 campaign shot modules — imported once, resolved via media/campaignAssets.
 * Do not import these image paths from routes directly.
 */

import hoopsFront from "@/assets/bayonne/campaign/hoops-front.jpg";
import hoopsTq from "@/assets/bayonne/campaign/hoops-three-quarter.jpg";
import hoopsBack from "@/assets/bayonne/campaign/hoops-back.jpg";
import dressFront from "@/assets/bayonne/campaign/dress-front.jpg";
import dressTq from "@/assets/bayonne/campaign/dress-three-quarter.jpg";
import dressBack from "@/assets/bayonne/campaign/dress-back.jpg";
import shortsFront from "@/assets/bayonne/campaign/shorts-front.jpg";
import shortsTq from "@/assets/bayonne/campaign/shorts-three-quarter.jpg";
import shortsBack from "@/assets/bayonne/campaign/shorts-back.jpg";
import crewFront from "@/assets/bayonne/campaign/crew-front.jpg";
import qzipFront from "@/assets/bayonne/campaign/qzip-front.jpg";
import heritageTeeGarnetFront from "@/assets/bayonne/campaign/heritage-tee-garnet-front.jpg";
import heritageTeeGarnetBack from "@/assets/bayonne/campaign/heritage-tee-garnet-back.jpg";
import heritageTeeBlackFront from "@/assets/bayonne/campaign/heritage-tee-black-front.jpg";
import heritageTeeBlackBack from "@/assets/bayonne/campaign/heritage-tee-black-back.jpg";
import baggySweatsGarnetFront from "@/assets/bayonne/campaign/baggy-sweats-garnet-front.jpg";
import crestCapFront from "@/assets/bayonne/campaign/crest-cap-front.jpg";

// Fall 001 uploaded source-of-truth imagery.
import performanceMaleHero from "@/assets/bayonne/fall001/performance-male-hero.webp";
import performanceMaleBack from "@/assets/bayonne/fall001/performance-male-back.webp";
import heritageJerseyModelFront from "@/assets/bayonne/fall001/heritage-jersey-model-front.webp";
import heritageJerseyModelBack from "@/assets/bayonne/fall001/heritage-jersey-model-back.webp";

import type { CampaignView } from "@/tokens/campaign";

export type CampaignViewMap = Partial<Record<CampaignView, string>> & {
  /** Optional single-view products (motif / alumni) */
  front?: string;
};

/** Storefront product id → campaign views */
export const CAMPAIGN_SHOTS: Record<string, CampaignViewMap> = {
  // 1936 Match — uploaded custom jersey presentation is the visual source of truth.
  // Until the remaining exact angle is committed, the approved front frame fills
  // the front and 3/4 slots so the custom-lettering view contract stays intact.
  jersey: {
    front: heritageJerseyModelFront,
    "three-quarter": heritageJerseyModelFront,
    back: heritageJerseyModelBack,
  },
  "full-set": {
    front: heritageJerseyModelFront,
    "three-quarter": heritageJerseyModelFront,
    back: heritageJerseyModelBack,
  },

  // Performance capsule — uploaded male fit imagery replaces legacy stand-ins.
  // The back frame also documents the ST485 horizontal rear zip pocket.
  "ls-jersey": {
    front: performanceMaleHero,
    back: performanceMaleBack,
  },
  "geo-shorts": {
    front: performanceMaleHero,
    back: performanceMaleBack,
  },
  "baggy-sweats-black": {
    front: performanceMaleHero,
    back: performanceMaleBack,
  },

  "hoops-jersey": {
    front: hoopsFront,
    "three-quarter": hoopsTq,
    back: hoopsBack,
  },
  "jersey-dress": {
    front: dressFront,
    "three-quarter": dressTq,
    back: dressBack,
  },
  shorts: {
    front: shortsFront,
    "three-quarter": shortsTq,
    back: shortsBack,
  },
  crewneck: { front: crewFront },
  "quarter-zip": { front: qzipFront },
  "heritage-tee-garnet": {
    front: heritageTeeGarnetFront,
    back: heritageTeeGarnetBack,
  },
  "heritage-tee-black": {
    front: heritageTeeBlackFront,
    back: heritageTeeBlackBack,
  },
  "baggy-sweats-garnet": { front: baggySweatsGarnetFront },
  "aop-hat": { front: crestCapFront },
};

/** Build-map SKU → campaign views (lettered sets share storefront modules). */
export const CAMPAIGN_BY_SKU: Record<string, CampaignViewMap> = {
  "BB-MJ-REP": CAMPAIGN_SHOTS["jersey"]!,
  "BB-MJ-AUT": CAMPAIGN_SHOTS["jersey"]!,
  "BB-LSJ": CAMPAIGN_SHOTS["ls-jersey"]!,
  "BB-HOOPS": CAMPAIGN_SHOTS["hoops-jersey"]!,
  "BB-DRESS": CAMPAIGN_SHOTS["jersey-dress"]!,
  "BB-CLASS": CAMPAIGN_SHOTS["jersey"]!,
};
