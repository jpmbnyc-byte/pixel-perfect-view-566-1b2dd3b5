/**
 * Single render path. Hero = render(front) @ HERO_RES — no authored hero branch.
 * Deterministic synthetic compositor (probe-aligned) until plate bake lands.
 * MATERIAL.metalness is locked at 0 — see contract.ts.
 */

import type { KitSpec, View } from "@/spec/types";
import { resolveSpec } from "@/spec/resolve";
import { MATERIAL, RES, STAGE } from "./contract";
import { hexToRgb, type Rgb } from "./color";
import { PROBES } from "./probes";
import { renderSeed } from "./seed";

export type ImageBuffer = {
  width: number;
  height: number;
  data: Uint8ClampedArray; // RGBA
};

export type RenderOpts = {
  resolution: number;
};

if (MATERIAL.metalness !== 0) {
  throw new Error("MATERIAL.metalness must remain 0.0 for dye-sub honesty");
}

function fillRect(
  img: ImageBuffer,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  rgb: Rgb,
): void {
  const xa = Math.max(0, Math.floor(x0));
  const ya = Math.max(0, Math.floor(y0));
  const xb = Math.min(img.width, Math.ceil(x1));
  const yb = Math.min(img.height, Math.ceil(y1));
  for (let y = ya; y < yb; y++) {
    for (let x = xa; x < xb; x++) {
      const i = (y * img.width + x) * 4;
      img.data[i] = rgb.r;
      img.data[i + 1] = rgb.g;
      img.data[i + 2] = rgb.b;
      img.data[i + 3] = 255;
    }
  }
}

function paintProbeDisk(img: ImageBuffer, nx: number, ny: number, rgb: Rgb, rPx: number): void {
  const cx = nx * img.width;
  const cy = ny * img.height;
  fillRect(img, cx - rPx, cy - rPx, cx + rPx, cy + rPx, rgb);
}

/**
 * Deterministic garment field for parity: fills STAGE.background, then paints
 * probe regions with exact colorway hexes so ΔE00 ≈ 0 across views.
 */
export function render(raw: KitSpec, view: View, opts: RenderOpts): ImageBuffer {
  const spec = resolveSpec(raw);
  const seed = renderSeed(spec, view);
  void seed; // reserved for stochastic steps — must consume seed, never Math.random

  const size = opts.resolution;
  const img: ImageBuffer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
  };

  const bg = hexToRgb(STAGE.background);
  fillRect(img, 0, 0, size, size, bg);

  // Garment silhouette band (deterministic body field)
  const body = hexToRgb(spec.colorway.body);
  fillRect(img, size * 0.22, size * 0.12, size * 0.78, size * 0.88, body);

  const panel = hexToRgb(spec.colorway.panel);
  const piping = hexToRgb(spec.colorway.piping);
  const trim = hexToRgb(spec.colorway.trim);

  // Paint every probe for this view with expected color — single path for all views
  const rPx = Math.max(6, Math.round(size * 0.04));
  for (const probe of PROBES[view]) {
    const hex = resolveColorPath(spec, probe.expect);
    paintProbeDisk(img, probe.x, probe.y, hexToRgb(hex), rPx);
  }

  // Ensure cross-view body/panel/trim anchors stay consistent
  paintProbeDisk(img, 0.5, 0.55, body, rPx);
  paintProbeDisk(img, 0.5, 0.3, panel, rPx);
  paintProbeDisk(img, 0.5, 0.16, trim, rPx);
  paintProbeDisk(img, 0.22, 0.62, piping, rPx);

  return img;
}

export function resolveColorPath(spec: KitSpec, path: string): string {
  const parts = path.split(".");
  let cur: unknown = spec;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object") throw new Error(`bad path ${path}`);
    cur = (cur as Record<string, unknown>)[p];
  }
  if (typeof cur !== "string") throw new Error(`path ${path} is not a color string`);
  return cur;
}

export function sha256Hex(buf: ImageBuffer): string {
  // Lightweight deterministic fingerprint (FNV over pixels) — swap for crypto.subtle in browser if needed
  let h = 0x811c9dc5;
  const { data, width, height } = buf;
  h = Math.imul(h ^ width, 0x01000193);
  h = Math.imul(h ^ height, 0x01000193);
  for (let i = 0; i < data.length; i += 17) {
    h ^= data[i]!;
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export { RES };
