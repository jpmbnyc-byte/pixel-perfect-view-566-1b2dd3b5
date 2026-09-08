/** CIE Lab / ΔE00 utilities for parity probes. */

export type Rgb = { r: number; g: number; b: number };
export type Lab = { L: number; a: number; b: number };

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function rgbToLab(rgb: Rgb): Lab {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  let y = (r * 0.2126729 + g * 0.7151522 + b * 0.072175) / 1.0;
  let z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  x = f(x);
  y = f(y);
  z = f(z);
  return { L: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

export function hexToLab(hex: string): Lab {
  return rgbToLab(hexToRgb(hex));
}

/** CIEDE2000 — Sharma et al. */
export function deltaE00(lab1: Lab, lab2: Lab): number {
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a2, b: b2 } = lab2;
  const kL = 1;
  const kC = 1;
  const kH = 1;
  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const Cab = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cab ** 7 / (Cab ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1);
  const C2p = Math.hypot(a2p, b2);
  const h1p = Math.abs(b1) + Math.abs(a1p) < 1e-10 ? 0 : (Math.atan2(b1, a1p) * 180) / Math.PI;
  const h2p = Math.abs(b2) + Math.abs(a2p) < 1e-10 ? 0 : (Math.atan2(b2, a2p) * 180) / Math.PI;
  const H1p = h1p >= 0 ? h1p : h1p + 360;
  const H2p = h2p >= 0 ? h2p : h2p + 360;
  const dLp = L2 - L1;
  const dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) {
    if (Math.abs(H2p - H1p) <= 180) dhp = H2p - H1p;
    else dhp = H2p <= H1p ? H2p - H1p + 360 : H2p - H1p - 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI) / 360);
  const Lp = (L1 + L2) / 2;
  const Cp = (C1p + C2p) / 2;
  let Hp = (H1p + H2p) / 2;
  if (Math.abs(H1p - H2p) > 180) Hp = H1p + H2p < 360 ? Hp + 180 : Hp - 180;
  if (C1p * C2p === 0) Hp = H1p + H2p;
  const T =
    1 -
    0.17 * Math.cos(((Hp - 30) * Math.PI) / 180) +
    0.24 * Math.cos((2 * Hp * Math.PI) / 180) +
    0.32 * Math.cos(((3 * Hp + 6) * Math.PI) / 180) -
    0.2 * Math.cos(((4 * Hp - 63) * Math.PI) / 180);
  const dRo = 30 * Math.exp(-(((Hp - 275) / 25) ** 2));
  const RC = 2 * Math.sqrt(Cp ** 7 / (Cp ** 7 + 25 ** 7));
  const SL = 1 + (0.015 * (Lp - 50) ** 2) / Math.sqrt(20 + (Lp - 50) ** 2);
  const SC = 1 + 0.045 * Cp;
  const SH = 1 + 0.015 * Cp * T;
  const RT = -Math.sin((2 * dRo * Math.PI) / 180) * RC;
  return Math.sqrt(
    (dLp / (kL * SL)) ** 2 +
      (dCp / (kC * SC)) ** 2 +
      (dHp / (kH * SH)) ** 2 +
      RT * (dCp / (kC * SC)) * (dHp / (kH * SH)),
  );
}

export function rgbDeltaE00(a: Rgb, b: Rgb): number {
  return deltaE00(rgbToLab(a), rgbToLab(b));
}
