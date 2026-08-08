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
  /** Stronger side-panel motif preview for bottoms / AOP pieces */
  emphasizeMotif?: boolean;
  /** Per-product back lettering geometry (defaults to kit LETTERING) */
  lettering?: LetteringLayout;
};

/**
 * Photoreal live preview — product detail photo + optional name/number overlay.
 * Name/number boxes follow reference print-zone % (Y / W / H) and scale with the
 * preview container so live preview matches production scale.
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
  const motifHeavy = emphasizeMotif || view === "side";
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
      style={{ containerType: "size" }}
    >
      <img
        src={src}
        alt={`${productLabel}, ${view} view`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {/* Motif accent — side panel language; heavier on side views */}
      {motifHeavy ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-[12%] left-[42%] w-[16%] opacity-55 mix-blend-soft-light"
            style={{ backgroundImage: motifCss(motif) }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-[18%] right-[10%] w-[10%] opacity-35 mix-blend-soft-light"
            style={{ backgroundImage: motifCss(motif) }}
            aria-hidden
          />
        </>
      ) : (
        view !== "back" && (
          <>
            <div
              className="pointer-events-none absolute inset-y-[18%] left-[8%] w-[6%] opacity-40 mix-blend-soft-light"
              style={{ backgroundImage: motifCss(motif) }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-[18%] right-[8%] w-[6%] opacity-40 mix-blend-soft-light"
              style={{ backgroundImage: motifCss(motif) }}
              aria-hidden
            />
          </>
        )
      )}

      {view === "back" && showLettering && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Name zone — reference: Y 18% · W 44% · H 8% · centered */}
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
          {/* Number zone — reference: Y 32% · W 28% · H 22% · centered */}
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
        {productLabel} · {view}
        {blackout && view === "back" ? " · blackout" : ""} · live preview
      </figcaption>
    </figure>
  );
}

function motifCss(motif: MotifId): string {
  switch (motif) {
    case "grid":
      return "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(244,241,240,0.35) 6px, rgba(244,241,240,0.35) 7px), repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(244,241,240,0.35) 6px, rgba(244,241,240,0.35) 7px)";
    case "arc":
      return "repeating-radial-gradient(circle at 50% 120%, transparent 0 10px, rgba(244,241,240,0.28) 10px 12px)";
    case "chevron":
    default:
      return "repeating-linear-gradient(-32deg, transparent, transparent 10px, rgba(244,241,240,0.4) 10px, rgba(244,241,240,0.4) 12px)";
  }
}
