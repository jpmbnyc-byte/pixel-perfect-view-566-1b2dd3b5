import type { FontId, MotifId } from "@/lib/catalog";
import { fontById } from "@/lib/catalog";
import { LETTERING } from "@/lib/kit";

export type CanvasView = "front" | "back";

type Props = {
  view: CanvasView;
  frontSrc: string;
  backSrc: string;
  motif: MotifId;
  fontId: FontId;
  name: string;
  number: string;
  productLabel: string;
  showLettering?: boolean;
};

/**
 * Photoreal live preview — product detail photo + live name/number overlay.
 * Motif choice is recorded on the order; preview shows a light panel accent only.
 */
export function ProductCanvas({
  view,
  frontSrc,
  backSrc,
  motif,
  fontId,
  name,
  number,
  productLabel,
  showLettering = true,
}: Props) {
  const font = fontById(fontId)!;
  const src = view === "front" ? frontSrc : backSrc;
  const displayName = (name || "NAME").slice(0, 12).toUpperCase();
  const displayNumber = number || "00";

  return (
    <figure className="relative aspect-[3/4] overflow-hidden bg-black">
      <img
        src={src}
        alt={`${productLabel}, ${view} view`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {/* Subtle motif accent — does not replace the photo */}
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

      {view === "back" && showLettering && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <p
            className="absolute left-1/2 -translate-x-1/2 text-center tracking-[0.18em] text-white"
            style={{
              top: `${LETTERING.name.y}%`,
              width: `${LETTERING.name.maxWidthPct}%`,
              fontFamily: font.cssFamily,
              fontSize: "clamp(0.85rem, 3.6vw, 1.15rem)",
              textShadow: "0 1px 0 #0a0a0a, 0 0 8px rgba(0,0,0,0.45)",
            }}
          >
            {displayName}
          </p>
          <p
            className="absolute left-1/2 -translate-x-1/2 text-center leading-none text-white"
            style={{
              top: `${LETTERING.number.y}%`,
              fontFamily: font.cssFamily,
              fontSize: "clamp(4.5rem, 22vw, 7rem)",
              textShadow: "0 2px 0 #0a0a0a, 0 0 14px rgba(0,0,0,0.4)",
            }}
          >
            {displayNumber}
          </p>
        </div>
      )}

      <figcaption className="label-caps absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-center text-[0.6rem] tracking-[0.14em] text-bone/80">
        {productLabel} · {view} · live preview
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
