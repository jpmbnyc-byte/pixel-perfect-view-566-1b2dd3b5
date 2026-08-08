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
 * Motif overlay always remounts on selection so Chevron / Grid / Arc read clearly
 * on front, back, and side views.
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
      style={{ containerType: "size" }}
    >
      <img
        src={src}
        alt={`${productLabel}, ${view} view`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {/* Live motif panel — always on; changes with selection */}
      <MotifOverlay key={motif} motif={motif} view={view} emphasize={emphasizeMotif} />

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
        {productLabel} · {view} · {motif}
        {blackout && view === "back" ? " · blackout" : ""} · live preview
      </figcaption>
    </figure>
  );
}

/** Visible side-panel language that clearly switches with motif id */
function MotifOverlay({
  motif,
  view,
  emphasize,
}: {
  motif: MotifId;
  view: CanvasView;
  emphasize: boolean;
}) {
  const sideHeavy = emphasize || view === "side";
  const panelStyle = motifPanelStyle(motif);

  if (sideHeavy) {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-y-[10%] left-[38%] w-[22%] rounded-[2px] opacity-85 mix-blend-soft-light transition-all duration-300"
          style={{ ...panelStyle, boxShadow: "inset 0 0 0 1px rgba(244,241,240,0.25)" }}
        />
        <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-sm bg-black/55 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-bone/90">
          Motif · {motif}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute inset-y-[16%] left-[7%] w-[9%] opacity-75 mix-blend-soft-light transition-all duration-300"
        style={panelStyle}
      />
      <div
        className="absolute inset-y-[16%] right-[7%] w-[9%] opacity-75 mix-blend-soft-light transition-all duration-300"
        style={panelStyle}
      />
      <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-sm bg-black/55 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-bone/90">
        Motif · {motif}
      </div>
    </div>
  );
}

function motifPanelStyle(motif: MotifId): CSSProperties {
  switch (motif) {
    case "grid":
      return {
        backgroundImage: [
          "linear-gradient(#F4F1F0 1px, transparent 1px)",
          "linear-gradient(90deg, #F4F1F0 1px, transparent 1px)",
          "linear-gradient(180deg, #5A1626, #3a0e18)",
        ].join(", "),
        backgroundSize: "10px 10px, 10px 10px, auto",
      };
    case "arc":
      return {
        backgroundImage:
          "repeating-radial-gradient(circle at 50% 110%, #0A0A0A 0 8px, #5A1626 8px 16px, #F4F1F0 16px 18px)",
      };
    case "chevron":
    default:
      return {
        backgroundImage:
          "repeating-linear-gradient(-32deg, #5A1626 0 12px, #0A0A0A 12px 24px, #F4F1F0 24px 27px)",
      };
  }
}
