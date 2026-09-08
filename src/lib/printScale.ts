/**
 * Apparel size → lettering print scale for live preview.
 * Fall 001 active apparel runs S through 2XL.
 */
import type { Size } from "./kit";

const PRINT_SCALE: Record<Size, number> = {
  S: 0.97,
  M: 1,
  L: 1.03,
  XL: 1.06,
  "2XL": 1.09,
};

export function printScaleForSize(size: Size | "" | string): number {
  if (size && size in PRINT_SCALE) return PRINT_SCALE[size as Size];
  return 1;
}
