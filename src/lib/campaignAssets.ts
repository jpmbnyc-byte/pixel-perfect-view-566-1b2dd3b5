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
import crewFront from "@/assets/bayonne/campaign/crew-front.jpg";
import qzipFront from "@/assets/bayonne/campaign/qzip-front.jpg";
import heritageTeeGarnetFront from "@/assets/bayonne/campaign/heritage-tee-garnet-front.jpg";
import heritageTeeGarnetBack from "@/assets/bayonne/campaign/heritage-tee-garnet-back.jpg";
import crestCapFront from "@/assets/bayonne/campaign/crest-cap-front.jpg";

// Fall 001 committed source-of-truth imagery.
import performanceMaleHero from "@/assets/bayonne/fall001/performance-male-hero.webp";
import performanceMaleBack from "@/assets/bayonne/fall001/performance-male-back.webp";
import heritageJerseyModelFront from "@/assets/bayonne/fall001/heritage-jersey-model-front.webp";
import heritageJerseyModelBack from "@/assets/bayonne/fall001/heritage-jersey-model-back.webp";

// Raw Fall 001 uploads currently committed at repository root.
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

import type { CampaignView } from "@/tokens/campaign";

export type CampaignViewMap = Partial<Record<CampaignView, string>> & {
  /** Optional single-view products (motif / alumni) */
  front?: string;
};

/** Storefront product id → campaign views */
export const CAMPAIGN_SHOTS: Record<string, CampaignViewMap> = {
  // 1936 Match
  jersey: {
    front: heritageJerseyModelFront,
    "three-quarter": heritageJerseyModelFront,
    back: heritageJerseyModelBack,
  },
  shorts: {
    front: matchShortThreeQuarter,
    "three-quarter": matchShortThreeQuarter,
    back: matchShortBack,
  },
  "full-set": {
    front: matchSetFront,
    "three-quarter": matchSetFront,
    back: heritageJerseyModelBack,
  },

  // Performance capsule
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
  crewneck: { front: crewFront },
  "quarter-zip": { front: qzipFront },

  // Travel + Core
  "heritage-tee-black": {
    front: maxHeavyFullZipFront,
    "three-quarter": maxHeavyFullZipFront,
    back: maxHeavyFullZipFront,
  },
  sweatpants: {
    front: travelSetFront,
    back: maxHeavySweatpantBack,
  },
  "baggy-sweats-garnet": {
    front: travelSetFront,
    "three-quarter": travelSetThreeQuarter,
  },
  "heritage-tee-garnet": {
    front: heritageTeeGarnetFront,
    back: heritageTeeGarnetBack,
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

  // Club Goods
  "aop-hat": { front: crestCapFront },
  beanie: {
    front: gothicBBeanieBack,
    back: gothicBBeanieBack,
  },
  "club-sock": {
    front: clubSockFront,
    back: clubSockDetail,
  },
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
