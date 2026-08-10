/**
 * Tier 1 parity — colorway check only.
 * Sample garnet body probes vs COLOR.garnet. Fail the asset, not the build.
 */

import { COLOR } from "@/tokens/brand";
import { CAMPAIGN_TOLERANCE } from "@/tokens/campaign";
import { hexToRgb, rgbDeltaE00, type Rgb } from "@/render/color";

export type CampaignProbe = { id: string; x: number; y: number };

/** Three body-field probes on the campaign front shot. */
export const CAMPAIGN_BODY_PROBES: CampaignProbe[] = [
  { id: "body-left", x: 0.38, y: 0.48 },
  { id: "body-center", x: 0.5, y: 0.52 },
  { id: "body-right", x: 0.62, y: 0.48 },
];

export type CampaignColorwayFailure = {
  code: "CAMPAIGN_COLORWAY_DRIFT";
  probe: string;
  dE: number;
  expected: string;
};

export type CampaignColorwayResult = {
  pass: boolean;
  failures: CampaignColorwayFailure[];
};

type ImageLike = {
  width: number;
  height: number;
  data: Uint8ClampedArray;
};

function samplePatch(img: ImageLike, nx: number, ny: number, patch: number): Rgb {
  const half = Math.floor(patch / 2);
  const cx = Math.round(nx * (img.width - 1));
  const cy = Math.round(ny * (img.height - 1));
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  for (let dy = -half; dy <= half; dy++) {
    for (let dx = -half; dx <= half; dx++) {
      const x = Math.min(img.width - 1, Math.max(0, cx + dx));
      const y = Math.min(img.height - 1, Math.max(0, cy + dy));
      const i = (y * img.width + x) * 4;
      rs.push(img.data[i]!);
      gs.push(img.data[i + 1]!);
      bs.push(img.data[i + 2]!);
    }
  }
  rs.sort((a, b) => a - b);
  gs.sort((a, b) => a - b);
  bs.sort((a, b) => a - b);
  const mid = Math.floor(rs.length / 2);
  return { r: rs[mid]!, g: gs[mid]!, b: bs[mid]! };
}

/**
 * Compare campaign front shot body samples to COLOR.garnet.
 * Grade to the Tier 2 render / token — not to taste.
 */
export function campaignColorwayGate(
  frontShot: ImageLike,
  expectedHex: string = COLOR.garnet,
): CampaignColorwayResult {
  const failures: CampaignColorwayFailure[] = [];
  const expected = hexToRgb(expectedHex);
  for (const probe of CAMPAIGN_BODY_PROBES) {
    const sampled = samplePatch(frontShot, probe.x, probe.y, 9);
    const dE = rgbDeltaE00(sampled, expected);
    if (dE > CAMPAIGN_TOLERANCE.colorDeltaE00) {
      failures.push({
        code: "CAMPAIGN_COLORWAY_DRIFT",
        probe: probe.id,
        dE,
        expected: expectedHex,
      });
    }
  }
  return { pass: failures.length === 0, failures };
}
