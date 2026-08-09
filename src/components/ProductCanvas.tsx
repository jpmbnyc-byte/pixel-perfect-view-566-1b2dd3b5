import { useEffect, useRef, useState } from "react";
import type { FontId, MotifId } from "@/lib/catalog";
import { fontById } from "@/lib/catalog";
import { LETTERING, type LetteringLayout } from "@/lib/kit";

export type CanvasView = "front" | "back" | "side";

type Props = {
  view: CanvasView;
  frontSrc: string;
  /** Back (tops) or side (shorts/sweats/hat) companion shot */
  secondarySrc: string;
  motif: MotifId;
  fontId: FontId;
  name: string;
  number: string;
  productLabel: string;
  showLettering?: boolean;
  /** Motif-first pieces (shorts / sweats / hat) — larger side-panel language */
  emphasizeMotif?: boolean;
  /** Per-product back lettering geometry (defaults to kit LETTERING) */
  lettering?: LetteringLayout;
};

/** Fallback right-ink bias (em) if canvas sampling fails — Forge has the worst bearings. */
const FONT_INK_BIAS_EM: Record<string, number> = {
  Forge: 0.06,
  "Rail Cut": 0.02,
  Beacon: 0.02,
  Whistle: 0.02,
};

function fontBiasFallback(fontFamily: string) {
  for (const [name, bias] of Object.entries(FONT_INK_BIAS_EM)) {
    if (fontFamily.includes(name)) return bias;
  }
  return 0.04;
}

/**
 * How far glyph *ink* sits to the right of the CSS layout box center, in em.
 * Positive → shift left so painted strokes hit the jersey spine.
 * Uses pixel sampling (reliable for outlined kit OTFs) with a per-font fallback.
 */
function useInkBiasEm(text: string, fontFamily: string, letterSpacing: string) {
  const [biasEm, setBiasEm] = useState(() => fontBiasFallback(fontFamily));

  useEffect(() => {
    let cancelled = false;
    const fallback = fontBiasFallback(fontFamily);

    const measure = () => {
      if (cancelled || typeof document === "undefined" || !text) {
        if (!cancelled) setBiasEm(fallback);
        return;
      }
      const fontSize = 180;
      const pad = 24;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setBiasEm(fallback);
        return;
      }
      ctx.font = `${fontSize}px ${fontFamily}`;
      const spacingEm = Number.parseFloat(letterSpacing) || 0;
      ctx.letterSpacing = `${spacingEm}em`;
      const layoutW = Math.ceil(ctx.measureText(text).width);
      if (layoutW < 2) {
        setBiasEm(fallback);
        return;
      }
      canvas.width = layoutW + pad * 2;
      canvas.height = fontSize * 1.4;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.letterSpacing = `${spacingEm}em`;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(text, pad, fontSize);
      const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let inkLeft = width;
      let inkRight = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[(y * width + x) * 4]! > 40) {
            if (x < inkLeft) inkLeft = x;
            if (x > inkRight) inkRight = x;
          }
        }
      }
      if (inkRight <= inkLeft) {
        setBiasEm(fallback);
        return;
      }
      const inkMid = (inkLeft + inkRight) / 2;
      const layoutMid = pad + layoutW / 2;
      const measured = (inkMid - layoutMid) / fontSize;
      // Use measured ink bias; only fall back when sampling failed upstream
      setBiasEm(Number.isFinite(measured) ? measured : fallback);
    };

    const run = () => {
      if (typeof document !== "undefined" && document.fonts?.ready) {
        void document.fonts.ready.then(measure);
      } else {
        measure();
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [text, fontFamily, letterSpacing]);

  return biasEm;
}

/**
 * Photoreal live preview — product detail photo + optional lettering.
 * When a geometric motif is selected, the preview is a single baked bitmap:
 * garment photo with ink sublimated into the panel pixels (not a floating layer).
 */
export function ProductCanvas({
  view,
  frontSrc,
  secondarySrc,
  motif,
  fontId,
  name,
  number,
  productLabel,
  showLettering = true,
  emphasizeMotif = false,
  lettering = LETTERING,
}: Props) {
  const font = fontById(fontId)!;
  const src = view === "front" ? frontSrc : secondarySrc;
  const displayName = (name || "CARTER").slice(0, 12).toUpperCase();
  const displayNumber = number || "00";
  const blackout = lettering.surface === "blackout";
  const nameShadow = blackout
    ? "0 0 2px #000, 0 1px 0 #000, 0 0 12px rgba(0,0,0,0.85)"
    : "0 1px 0 #0a0a0a, 0 0 8px rgba(0,0,0,0.45)";
  const numberShadow = blackout
    ? "0 0 3px #000, 0 2px 0 #000, 0 0 18px rgba(0,0,0,0.9)"
    : "0 2px 0 #0a0a0a, 0 0 14px rgba(0,0,0,0.4)";
  // Single-line name bar: shrink long names to fit width (never wrap to two rows)
  const nameChars = Math.max(displayName.replace(/\s/g, "").length, 1);
  const nameFit = Math.min(1, 6.5 / nameChars);
  const nameTracking = nameChars >= 10 ? "0.04em" : nameChars >= 7 ? "0.08em" : "0.12em";
  // Kit OTFs (esp. Forge) have right-biased ink vs advance — nudge so glyph ink hits the spine
  const nameInkBiasEm = useInkBiasEm(displayName, font.cssFamily, nameTracking);
  const numberInkBiasEm =
    useInkBiasEm(displayNumber, font.cssFamily, "0") +
    // Narrow single digits (1, 7) still read right-heavy after ink correction
    (displayNumber.length === 1 ? 0.05 : 0);
  return (
    <figure
      className="relative aspect-[3/4] overflow-hidden bg-black"
      style={{ containerType: "size" }}
    >
      <SublimatedPreview
        key={`${motif}-${view}-${src}`}
        motif={motif}
        view={view}
        emphasize={emphasizeMotif}
        garmentSrc={src}
        label={`${productLabel}, ${view} view`}
      />

      {view === "back" && showLettering && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <p
            className="absolute flex items-center justify-center whitespace-nowrap text-center uppercase text-white"
            style={{
              top: `${lettering.name.y}%`,
              left: `${lettering.centerX}%`,
              transform: `translateX(calc(-50% - ${nameInkBiasEm}em)) scale(${nameFit})`,
              transformOrigin: "center center",
              width: `${lettering.name.maxWidthPct}%`,
              height: `${lettering.name.heightPct}%`,
              fontFamily: font.cssFamily,
              fontSize: `calc(${lettering.name.heightPct} * 0.9cqh)`,
              letterSpacing: nameTracking,
              lineHeight: 1,
              overflow: "hidden",
              textShadow: nameShadow,
              WebkitTextStroke: blackout ? "0.4px rgba(0,0,0,0.55)" : undefined,
            }}
          >
            {displayName}
          </p>
          <p
            className="absolute flex items-center justify-center whitespace-nowrap text-center leading-none text-white"
            style={{
              top: `${lettering.number.y}%`,
              left: `${lettering.centerX}%`,
              // Fit box to glyphs (not a wide % slot) so -50% lands on the digit cluster
              transform: `translateX(calc(-50% - ${numberInkBiasEm}em))`,
              width: "max-content",
              maxWidth: `${lettering.number.maxWidthPct}%`,
              height: `${lettering.number.heightPct}%`,
              fontFamily: font.cssFamily,
              fontSize: `calc(${lettering.number.heightPct} * 0.88cqh)`,
              textShadow: numberShadow,
              WebkitTextStroke: blackout ? "0.6px rgba(0,0,0,0.65)" : undefined,
            }}
          >
            {displayNumber}
          </p>
        </div>
      )}

      <figcaption className="label-caps absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-center text-[0.6rem] tracking-[0.14em] text-bone/80">
        {productLabel} · {view}
        {blackout && view === "back" ? " · blackout" : ""} · live preview
      </figcaption>
    </figure>
  );
}

/**
 * Single opaque bitmap: product photo with geometric ink baked into panel pixels.
 * No second stacked layer — the print is the fabric in the output image.
 */
function SublimatedPreview({
  motif,
  view,
  emphasize,
  garmentSrc,
  label,
}: {
  motif: MotifId;
  view: CanvasView;
  emphasize: boolean;
  garmentSrc: string;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sideHeavy = emphasize || view === "side";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    const img = new Image();

    const paint = () => {
      if (cancelled || !canvasRef.current) return;
      const el = canvasRef.current;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
      }

      const ctx = el.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Contain-fit so full garment length stays visible (no bust/waist crop)
      const fit = containRect(img.naturalWidth, img.naturalHeight, w, h);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, fit.dx, fit.dy, fit.dw, fit.dh);
      const frame = ctx.getImageData(0, 0, w, h);

      // Ink plate (offscreen)
      const plateCanvas = document.createElement("canvas");
      plateCanvas.width = w;
      plateCanvas.height = h;
      const pctx = plateCanvas.getContext("2d")!;
      paintMotifPlate(pctx, motif, w, h);
      const plate = pctx.getImageData(0, 0, w, h);

      const gd = frame.data;
      const pd = plate.data;
      const bg = sampleCornerBackground(gd, w, h);

      let lumMin = 1;
      let lumMax = 0;
      for (let i = 0; i < gd.length; i += 4) {
        const px = (i / 4) % w;
        const py = ((i / 4) / w) | 0;
        const zone = panelZone(px / w, py / h, sideHeavy);
        if (zone < 0.35) continue;
        const gr = gd[i]!;
        const gg = gd[i + 1]!;
        const gb = gd[i + 2]!;
        const lum = (0.2126 * gr + 0.7152 * gg + 0.0722 * gb) / 255;
        if (fabricMatte(gr, gg, gb, bg, sideHeavy, zone, lum) < 0.35) continue;
        if (lum < lumMin) lumMin = lum;
        if (lum > lumMax) lumMax = lum;
      }
      const lumRange = Math.max(0.035, lumMax - lumMin);

      for (let i = 0; i < gd.length; i += 4) {
        const px = (i / 4) % w;
        const py = ((i / 4) / w) | 0;
        const nx = px / w;
        const ny = py / h;

        const gr = gd[i]!;
        const gg = gd[i + 1]!;
        const gb = gd[i + 2]!;
        const lum = (0.2126 * gr + 0.7152 * gg + 0.0722 * gb) / 255;

        const zone = panelZone(nx, ny, sideHeavy);
        const fabric = fabricMatte(gr, gg, gb, bg, sideHeavy, zone, lum);
        const mask = fabric * zone;
        if (mask < 0.02) continue;

        const local = Math.min(1, Math.max(0, (lum - lumMin) / lumRange));
        const wrapX = Math.round((0.5 - local) * (sideHeavy ? 8 : 5) * dpr);
        const wrapY = Math.round((local - 0.5) * 2.5 * dpr);
        const sx = Math.min(w - 1, Math.max(0, px + wrapX));
        const sy = Math.min(h - 1, Math.max(0, py + wrapY));
        const si = (sy * w + sx) * 4;

        const pr = pd[si]!;
        const pg = pd[si + 1]!;
        const pb = pd[si + 2]!;
        const pa = pd[si + 3]! / 255;
        if (pa < 0.01) continue;

        // Ink amount follows set light — shadow sleeps, highlight shows dye
        const light = Math.pow(local, 0.5);
        const mix = mask * pa * (sideHeavy ? 0.78 : 0.6) * (0.4 + 0.6 * light);

        // Soft-light-ish bake into the same pixels (preserves mesh in the photo)
        gd[i] = clamp8(softLightBake(gr, pr, mix, light));
        gd[i + 1] = clamp8(softLightBake(gg, pg, mix, light));
        gd[i + 2] = clamp8(softLightBake(gb, pb, mix, light));
        gd[i + 3] = 255;
      }

      ctx.putImageData(frame, 0, 0);
    };

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) paint();
    });
    ro.observe(canvas);

    img.onload = () => paint();
    img.src = garmentSrc;
    if (img.complete && img.naturalWidth) paint();

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [motif, sideHeavy, garmentSrc]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className="absolute inset-0 h-full w-full"
    />
  );
}

/** Soft-light dye into a base channel; `mix` is ink coverage 0–1 */
function softLightBake(base: number, ink: number, mix: number, light: number) {
  const a = base / 255;
  const b = (ink / 255) * (0.35 + 0.65 * light);
  const soft =
    b < 0.5 ? 2 * a * b + a * a * (1 - 2 * b) : 2 * a * (1 - b) + Math.sqrt(Math.max(0, a)) * (2 * b - 1);
  const dyed = soft * 255;
  return base * (1 - mix) + dyed * mix;
}

function paintMotifPlate(
  ctx: CanvasRenderingContext2D,
  motif: MotifId,
  w: number,
  h: number,
) {
  switch (motif) {
    case "grid": {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#4a1420");
      g.addColorStop(1, "#14060a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(200,185,180,0.4)";
      ctx.lineWidth = Math.max(1, w * 0.0015);
      const step = Math.max(9, w * 0.02);
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
      break;
    }
    case "arc": {
      const cx = w * 0.5;
      const cy = h * 1.12;
      const maxR = Math.hypot(w, h);
      const bandW = Math.max(10, w * 0.022);
      for (let r = maxR; r > 0; r -= bandW) {
        const band = Math.floor(r / bandW) % 3;
        ctx.fillStyle = band === 0 ? "#0A0A0A" : band === 1 ? "#5A1626" : "#2a0a12";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.arc(cx, cy, Math.max(0, r - bandW), 0, Math.PI * 2, true);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(220,200,195,0.35)";
      ctx.lineWidth = Math.max(1, w * 0.002);
      for (let r = maxR; r > 0; r -= Math.max(28, w * 0.05)) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
    }
    case "chevron":
    default: {
      const stripe = Math.max(12, w * 0.026);
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.rotate((-32 * Math.PI) / 180);
      ctx.translate(-w * 0.9, -h * 0.9);
      const span = Math.max(w, h) * 2.4;
      for (let x = 0; x < span; x += stripe * 3) {
        ctx.fillStyle = "#6e1c2e";
        ctx.fillRect(x, 0, stripe, span);
        ctx.fillStyle = "#1a0a0e";
        ctx.fillRect(x + stripe, 0, stripe, span);
        ctx.fillStyle = "rgba(220,200,195,0.4)";
        ctx.fillRect(x + stripe * 2, 0, Math.max(2, stripe * 0.18), span);
      }
      ctx.restore();
      break;
    }
  }
}

/** Contain-fit destination rect matching CSS object-fit: contain; object-position: center */
function containRect(iw: number, ih: number, cw: number, ch: number) {
  const scale = Math.min(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  return { dx: (cw - dw) / 2, dy: (ch - dh) / 2, dw, dh };
}

function panelZone(nx: number, ny: number, sideHeavy: boolean) {
  const yFeather = smoothstep(0.1, 0.2, ny) * (1 - smoothstep(0.8, 0.9, ny));
  if (sideHeavy) {
    const x = smoothstep(0.42, 0.455, nx) * (1 - smoothstep(0.545, 0.58, nx));
    return x * yFeather;
  }
  const left = smoothstep(0.15, 0.185, nx) * (1 - smoothstep(0.235, 0.27, nx));
  const right = smoothstep(0.73, 0.765, nx) * (1 - smoothstep(0.815, 0.85, nx));
  return Math.max(left, right) * yFeather;
}

function sampleCornerBackground(gd: Uint8ClampedArray, w: number, h: number) {
  const pts = [
    [4, 4],
    [w - 5, 4],
    [4, h - 5],
    [w - 5, h - 5],
    [(w / 2) | 0, 4],
    [(w / 2) | 0, h - 5],
  ];
  let r = 0;
  let g = 0;
  let b = 0;
  for (const [x, y] of pts) {
    const i = (y! * w + x!) * 4;
    r += gd[i]!;
    g += gd[i + 1]!;
    b += gd[i + 2]!;
  }
  const n = pts.length;
  return { r: r / n, g: g / n, b: b / n };
}

function fabricMatte(
  r: number,
  g: number,
  b: number,
  bg: { r: number; g: number; b: number },
  sideHeavy: boolean,
  zone: number,
  lum: number,
) {
  const dist = Math.hypot(r - bg.r, g - bg.g, b - bg.b);
  const garnet = smoothstep(10, 24, r - g) * smoothstep(10, 24, r - b);
  const fromBg = smoothstep(sideHeavy ? 8 : 18, sideHeavy ? 26 : 42, dist);
  const blackPanel =
    sideHeavy && lum < 0.22 ? smoothstep(0.5, 0.78, zone) * (1 - smoothstep(0.2, 0.35, lum)) : 0;
  return Math.max(garnet, fromBg, blackPanel);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clamp8(n: number) {
  return n < 0 ? 0 : n > 255 ? 255 : n | 0;
}
