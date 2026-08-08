import { useEffect, useRef, type CSSProperties } from "react";
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

/**
 * Photoreal live preview — product detail photo + motif panel + optional lettering.
 * Geometric motifs are canvas-composited as ink sublimation: pattern is lit by the
 * garment photo’s set lighting / mesh, then locked to the silhouette — not a sticker.
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
  const displayName = (name || "NAME").slice(0, 12).toUpperCase();
  const displayNumber = number || "00";
  const blackout = lettering.surface === "blackout";
  const nameShadow = blackout
    ? "0 0 2px #000, 0 1px 0 #000, 0 0 12px rgba(0,0,0,0.85)"
    : "0 1px 0 #0a0a0a, 0 0 8px rgba(0,0,0,0.45)";
  const numberShadow = blackout
    ? "0 0 3px #000, 0 2px 0 #000, 0 0 18px rgba(0,0,0,0.9)"
    : "0 2px 0 #0a0a0a, 0 0 14px rgba(0,0,0,0.4)";

  return (
    <figure
      className="relative aspect-[3/4] overflow-hidden bg-black"
      style={{ containerType: "size", isolation: "isolate" }}
    >
      <img
        src={src}
        alt={`${productLabel}, ${view} view`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {motif !== "none" && (
        <MotifOverlay
          key={`${motif}-${view}-${src}`}
          motif={motif}
          view={view}
          emphasize={emphasizeMotif}
          garmentSrc={src}
        />
      )}

      {view === "back" && showLettering && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <p
            className="absolute flex items-center justify-center text-center uppercase tracking-[0.12em] text-white"
            style={{
              top: `${lettering.name.y}%`,
              left: `${lettering.centerX}%`,
              transform: "translateX(-50%)",
              width: `${lettering.name.maxWidthPct}%`,
              height: `${lettering.name.heightPct}%`,
              fontFamily: font.cssFamily,
              fontSize: `calc(${lettering.name.heightPct} * 0.72cqh)`,
              lineHeight: 1,
              textShadow: nameShadow,
              WebkitTextStroke: blackout ? "0.4px rgba(0,0,0,0.55)" : undefined,
            }}
          >
            {displayName}
          </p>
          <p
            className="absolute flex items-center justify-center text-center leading-none text-white"
            style={{
              top: `${lettering.number.y}%`,
              left: `${lettering.centerX}%`,
              transform: "translateX(-50%)",
              width: `${lettering.number.maxWidthPct}%`,
              height: `${lettering.number.heightPct}%`,
              fontFamily: font.cssFamily,
              fontSize: `calc(${lettering.number.heightPct} * 0.78cqh)`,
              textShadow: numberShadow,
              WebkitTextStroke: blackout ? "0.6px rgba(0,0,0,0.65)" : undefined,
            }}
          >
            {displayNumber}
          </p>
        </div>
      )}

      <figcaption className="label-caps absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-center text-[0.6rem] tracking-[0.14em] text-bone/80">
        {productLabel} · {view} · {motif === "none" ? "no motif" : motif}
        {blackout && view === "back" ? " · blackout" : ""} · live preview
      </figcaption>
    </figure>
  );
}

/**
 * Canvas ink-sublimation compositor.
 * Lights the geometric pattern with the garment photo so folds, speculars, and mesh
 * show through the print — instead of a flat CSS layer hovering over the jersey.
 */
function MotifOverlay({
  motif,
  view,
  emphasize,
  garmentSrc,
}: {
  motif: MotifId;
  view: CanvasView;
  emphasize: boolean;
  garmentSrc: string;
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

      // Sample garment (cover-fit, same as <img object-cover>)
      const cover = coverRect(img.naturalWidth, img.naturalHeight, w, h);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, cover.sx, cover.sy, cover.sw, cover.sh, 0, 0, w, h);
      const garment = ctx.getImageData(0, 0, w, h);

      // Flat ink plate
      ctx.clearRect(0, 0, w, h);
      paintMotifPlate(ctx, motif, w, h);
      const plate = ctx.getImageData(0, 0, w, h);

      const out = ctx.createImageData(w, h);
      const gd = garment.data;
      const pd = plate.data;
      const od = out.data;

      for (let i = 0; i < gd.length; i += 4) {
        const px = (i / 4) % w;
        const py = ((i / 4) / w) | 0;
        const nx = px / w;
        const ny = py / h;

        const gr = gd[i]!;
        const gg = gd[i + 1]!;
        const gb = gd[i + 2]!;
        const lum = (0.2126 * gr + 0.7152 * gg + 0.0722 * gb) / 255;

        // Soft fabric presence — keep black panels (side stripes) while cutting studio void
        const fabric = smoothstep(0.012, 0.08, lum);
        const zone = panelZone(nx, ny, sideHeavy);
        const mask = fabric * zone;
        if (mask < 0.01) {
          od[i + 3] = 0;
          continue;
        }

        const pr = pd[i]!;
        const pg = pd[i + 1]!;
        const pb = pd[i + 2]!;
        const pa = pd[i + 3]! / 255;
        if (pa < 0.01) {
          od[i + 3] = 0;
          continue;
        }

        // Light the ink with set lighting: highlights wash the dye, shadows deepen it.
        // Floor keeps geometry visible on near-black side panels.
        const light = 0.28 + 0.72 * lum;
        // Fold garment RGB into the ink so mesh / specular grain is in the print itself
        const inkR = pr * light * 0.62 + gr * 0.38;
        const inkG = pg * light * 0.62 + gg * 0.38;
        const inkB = pb * light * 0.62 + gb * 0.38;

        const strength = mask * pa * (sideHeavy ? 0.78 : 0.62);

        // RGB = fabric-lit ink only; alpha = coverage. Drawn source-over (not multiply)
        // so lighting isn't applied twice against the photo underneath.
        od[i] = clamp8(inkR);
        od[i + 1] = clamp8(inkG);
        od[i + 2] = clamp8(inkB);
        od[i + 3] = clamp8(strength * 255);
      }

      ctx.putImageData(out, 0, 0);
    };

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) paint();
    });
    ro.observe(canvas);

    img.onload = () => paint();
    img.onerror = () => {
      /* leave canvas empty — photo still shows underneath */
    };
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
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: sideHeavy ? 0.94 : 0.85 } satisfies CSSProperties}
      aria-hidden
    />
  );
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
      g.addColorStop(0, "#5A1626");
      g.addColorStop(1, "#1a060c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(244,241,240,0.55)";
      ctx.lineWidth = Math.max(1, w * 0.0018);
      const step = Math.max(8, w * 0.018);
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
      for (let r = maxR; r > 0; r -= Math.max(10, w * 0.022)) {
        const band = Math.floor(r / Math.max(10, w * 0.022)) % 3;
        ctx.fillStyle = band === 0 ? "#0A0A0A" : band === 1 ? "#5A1626" : "#2a0a12";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.arc(cx, cy, Math.max(0, r - Math.max(10, w * 0.022)), 0, Math.PI * 2, true);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(244,241,240,0.4)";
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
      // Diagonal blocks — draw as thick stripes (canvas has no repeating-linear-gradient helper)
      const stripe = Math.max(14, w * 0.03);
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.rotate((-32 * Math.PI) / 180);
      ctx.translate(-w * 0.9, -h * 0.9);
      const span = Math.max(w, h) * 2.4;
      for (let x = 0; x < span; x += stripe * 3) {
        ctx.fillStyle = "#5A1626";
        ctx.fillRect(x, 0, stripe, span);
        ctx.fillStyle = "#0A0A0A";
        ctx.fillRect(x + stripe, 0, stripe, span);
        ctx.fillStyle = "rgba(244,241,240,0.7)";
        ctx.fillRect(x + stripe * 2, 0, Math.max(2, stripe * 0.22), span);
      }
      ctx.restore();
      break;
    }
  }
}

/** Cover-fit source crop matching CSS object-fit: cover; object-position: center */
function coverRect(iw: number, ih: number, cw: number, ch: number) {
  const ir = iw / ih;
  const cr = cw / ch;
  if (ir > cr) {
    const sw = ih * cr;
    return { sx: (iw - sw) / 2, sy: 0, sw, sh: ih };
  }
  const sh = iw / cr;
  return { sx: 0, sy: (ih - sh) / 2, sw: iw, sh };
}

function panelZone(nx: number, ny: number, sideHeavy: boolean) {
  const yFeather = smoothstep(0.04, 0.14, ny) * (1 - smoothstep(0.86, 0.96, ny));
  if (sideHeavy) {
    const x = smoothstep(0.3, 0.38, nx) * (1 - smoothstep(0.62, 0.7, nx));
    return x * yFeather;
  }
  const left = smoothstep(0.12, 0.17, nx) * (1 - smoothstep(0.27, 0.33, nx));
  const right = smoothstep(0.67, 0.73, nx) * (1 - smoothstep(0.83, 0.88, nx));
  return Math.max(left, right) * yFeather;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clamp8(n: number) {
  return n < 0 ? 0 : n > 255 ? 255 : n | 0;
}
