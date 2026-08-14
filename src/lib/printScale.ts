/**
 * Apparel size → lettering print scale for live preview.
 * Larger blanks carry slightly larger name/number ink.
 */
import type { Size } from "./kit";

const PRINT_SCALE: Record<Size, number> = {
  "2XS": 0.92,
  XS: 0.95,
  S: 0.97,
  M: 1,
  L: 1.03,
  XL: 1.06,
  "2XL": 1.09,
  "3XL": 1.12,
};

export function printScaleForSize(size: Size | "" | string): number {
  if (size && size in PRINT_SCALE) return PRINT_SCALE[size as Size];
  return 1;
}
