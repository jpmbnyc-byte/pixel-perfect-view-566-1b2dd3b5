import type { View } from "@/spec/types";

export type Probe = {
  id: string;
  x: number;
  y: number;
  expect: string; // path into KitSpec, e.g. colorway.body
};

export const PROBES: Record<View, Probe[]> = {
  front: [
    { id: "body-field", x: 0.5, y: 0.55, expect: "colorway.body" },
    { id: "chest-band", x: 0.5, y: 0.3, expect: "colorway.panel" },
    { id: "crest-ground", x: 0.34, y: 0.29, expect: "colorway.body" },
    { id: "piping-edge", x: 0.22, y: 0.62, expect: "colorway.piping" },
    { id: "collar-trim", x: 0.5, y: 0.16, expect: "colorway.trim" },
  ],
  side: [
    { id: "body-field", x: 0.48, y: 0.55, expect: "colorway.body" },
    { id: "chest-band", x: 0.48, y: 0.3, expect: "colorway.panel" },
    { id: "piping-edge", x: 0.31, y: 0.62, expect: "colorway.piping" },
    { id: "collar-trim", x: 0.5, y: 0.16, expect: "colorway.trim" },
  ],
  back: [
    { id: "body-field", x: 0.5, y: 0.62, expect: "colorway.body" },
    { id: "chest-band", x: 0.5, y: 0.3, expect: "colorway.panel" },
    { id: "number-ground", x: 0.5, y: 0.48, expect: "colorway.body" },
    { id: "collar-trim", x: 0.5, y: 0.16, expect: "colorway.trim" },
  ],
};

export const TOLERANCE = {
  colorDeltaE00: 2.0,
  placementMm: 1.5,
  bandContinuity: 0.5,
} as const;
