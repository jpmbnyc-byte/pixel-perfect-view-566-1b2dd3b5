import { TYPE } from "@/tokens/type";
import { MOTIF } from "@/tokens/motif";

export const PERSONALIZATION_MATRIX = {
  "name-number": {
    name: true,
    number: true,
    font: TYPE.kit,
    motif: false as const,
    size: false as const,
  },
  motif: {
    name: false,
    number: false,
    font: null,
    motif: MOTIF,
    size: false as const,
  },
  "motif-size": {
    name: false,
    number: false,
    font: null,
    motif: MOTIF,
    size: ["S/M", "L/XL"] as const,
  },
  none: {
    name: false,
    number: false,
    font: null,
    motif: false as const,
    size: false as const,
  },
} as const;

export const NAME_MAX = 12;
export const NUMBER_MIN = 0;
export const NUMBER_MAX = 99;
export const INPUT_DEBOUNCE_MS = 400;
