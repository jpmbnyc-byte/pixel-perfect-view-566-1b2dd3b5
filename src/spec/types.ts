import type { COLOR } from "@/tokens/brand";
import type { KitFontId } from "@/tokens/type";
import type { MotifId } from "@/tokens/motif";

export type View = "front" | "side" | "back";

export type CategoryId = "match" | "training" | "sideline" | "alumni";

export type ProcessId = "sublimation-cutsew" | "embroidery-predyed" | "knit";

export type FabricId =
  | "poly-interlock-matte"
  | "poly-mesh-engineered"
  | "micro-poly"
  | "bonded-double-knit"
  | "cotton-poly-fleece"
  | "knit-jacquard";

export type PanelId = string;

export type Placement = {
  /** Normalized 0–1 from left of garment bbox */
  x: number;
  /** Normalized 0–1 from top of garment bbox */
  y: number;
  /** Crest diameter in mm */
  sizeMm: number;
};

export type TrimSpec = {
  id: string;
  finish: "pre-dyed" | "sublimated";
};

export type PersonalizationMode = "name-number" | "motif" | "motif-size" | "none";

export type ColorwayHex = (typeof COLOR)[keyof typeof COLOR] | string;

export interface KitSpec {
  sku: string;
  category: CategoryId;
  process: ProcessId;
  /** Required before production publish when body is garnet. */
  strikeOffApproved?: boolean;

  garment: {
    block: string;
    panels: PanelId[];
    trims: TrimSpec[];
    gsm: number;
    fabric: FabricId;
  };

  colorway: {
    body: ColorwayHex;
    panel: ColorwayHex;
    piping: ColorwayHex;
    /** Must be a pre-dyed token (trimBlack). */
    trim: ColorwayHex;
  };

  graphics: {
    /** ONLY value permitted on a purchasable SKU */
    crest: "boxing-bee";
    crestPlacement: Placement;
    chestBand?: {
      text: "BAYONNE";
      continuous: boolean;
      height: number;
    };
    motif?: MotifId;
    tonalTexture?: {
      mark: "boxing-bee";
      luminanceShift: number;
      repeatMm: number;
      rotationDeg: number;
    };
    interiorPrint?: string;
  };

  personalization: {
    mode: PersonalizationMode;
    name?: string;
    number?: string;
    font?: KitFontId;
  };

  /** Plate ids resolved via brandAssets → PLATES (one pair per SKU family). */
  plates: { front: string; secondary: string };

  /** Pattern meaning for PDP (Saville deviation). */
  patternCopy?: string;

  price: number;
  name: string;
  blurb: string;
}

export type Violation = {
  code: string;
  fix?: string;
  part?: string;
  severity?: "error" | "warn";
};
