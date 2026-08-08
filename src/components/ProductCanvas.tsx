import type { CSSProperties } from "react";
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
 * Geometric motifs are composited as ink-sublimation into the garment (multiply dye +
 * set-lighting reproject), never as a floating sticker over the studio shot.
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
          key={`${motif}-${view}`}
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

type MotifInk = {
  /** Dark dye that multiplies into the fabric */
  dye: CSSProperties;
  /** Light piping / grid lines — soft-light only */
  accent: CSSProperties;
};

/**
 * Ink-sublimation composite:
 * 1) multiply dye into the garment color
 * 2) soft-light accents for piping
 * 3) re-project the product photo so set lighting + mesh texture own the ink
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
  const sideHeavy = emphasize || view === "side";
  const ink = motifInk(motif);

  // Feathered panel window — soft edges so the print falls off with the garment,
  // never hard floating side rails on empty studio backdrop.
  const zoneMask = sideHeavy
    ? "linear-gradient(90deg, transparent 30%, #000 38%, #000 62%, transparent 70%)"
    : "linear-gradient(90deg, transparent 12%, #000 17%, #000 27%, transparent 33%, transparent 67%, #000 73%, #000 83%, transparent 88%)";

  const clip: CSSProperties = {
    WebkitMaskImage: `url(${garmentSrc}), ${zoneMask}`,
    maskImage: `url(${garmentSrc}), ${zoneMask}`,
    WebkitMaskSize: "cover, 100% 100%",
    maskSize: "cover, 100% 100%",
    WebkitMaskPosition: "center, center",
    maskPosition: "center, center",
    WebkitMaskRepeat: "no-repeat, no-repeat",
    maskRepeat: "no-repeat, no-repeat",
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
    // JPEG mask: bright garment pixels keep ink; dark studio cuts out
    maskMode: "luminance, alpha",
  };

  const photoLock: CSSProperties = {
    backgroundImage: `url(${garmentSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      aria-hidden
    >
      {/* Dye — ink into fabric (follows shadows via multiply) */}
      <div
        className="absolute inset-0"
        style={{
          ...ink.dye,
          ...clip,
          mixBlendMode: "multiply",
          opacity: sideHeavy ? 0.9 : 0.72,
        }}
      />
      {/* Accent piping — low soft-light so bone lines sit in the highlight range */}
      <div
        className="absolute inset-0"
        style={{
          ...ink.accent,
          ...clip,
          mixBlendMode: "soft-light",
          opacity: sideHeavy ? 0.4 : 0.28,
        }}
      />
      {/* Re-project set lighting onto the ink so folds/speculars match the photo */}
      <div
        className="absolute inset-0"
        style={{
          ...photoLock,
          ...clip,
          mixBlendMode: "soft-light",
          opacity: 0.7,
        }}
      />
      {/* Mesh / fabric grain through the print */}
      <div
        className="absolute inset-0"
        style={{
          ...photoLock,
          ...clip,
          mixBlendMode: "overlay",
          opacity: 0.28,
        }}
      />
    </div>
  );
}

function motifInk(motif: MotifId): MotifInk {
  switch (motif) {
    case "none":
      return {
        dye: { backgroundImage: "none", backgroundColor: "transparent" },
        accent: { backgroundImage: "none", backgroundColor: "transparent" },
      };
    case "grid":
      return {
        dye: {
          backgroundImage: [
            "linear-gradient(#3a0e18 1px, transparent 1px)",
            "linear-gradient(90deg, #3a0e18 1px, transparent 1px)",
            "linear-gradient(180deg, #5A1626, #1a060c)",
          ].join(", "),
          backgroundSize: "11px 11px, 11px 11px, auto",
        },
        accent: {
          backgroundImage: [
            "linear-gradient(rgba(244,241,240,0.55) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(244,241,240,0.55) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "11px 11px, 11px 11px",
        },
      };
    case "arc":
      return {
        dye: {
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 110%, #0A0A0A 0 9px, #5A1626 9px 18px, #2a0a12 18px 20px)",
        },
        accent: {
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 110%, transparent 0 17px, rgba(244,241,240,0.5) 17px 19px, transparent 19px 28px)",
        },
      };
    case "chevron":
    default:
      return {
        dye: {
          backgroundImage:
            "repeating-linear-gradient(-32deg, #5A1626 0 13px, #0A0A0A 13px 26px, #3a0e18 26px 29px)",
        },
        accent: {
          backgroundImage:
            "repeating-linear-gradient(-32deg, transparent 0 26px, rgba(244,241,240,0.55) 26px 28px, transparent 28px 39px)",
        },
      };
  }
}
