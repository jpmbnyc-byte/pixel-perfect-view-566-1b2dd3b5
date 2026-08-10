import { useEffect, useState } from "react";
import type { FontId } from "@/lib/catalog";
import { fontById } from "@/lib/catalog";
import { LETTERING, type LetteringLayout } from "@/lib/kit";
import { CAMPAIGN_NAME_BADGE, CAMPAIGN_SHOT } from "@/tokens/campaign";
import type { ImageTier } from "@/media/tiers";

export type CanvasView = "front" | "back" | "side" | "three-quarter";

type Props = {
  view: CanvasView;
  frontSrc: string;
  /** Back (tops) or side (shorts/sweats/hat) companion shot */
  secondarySrc: string;
  /** Tier 1 three-quarter campaign angle */
  threeQuarterSrc?: string;
  fontId: FontId;
  name: string;
  number: string;
  productLabel: string;
  showLettering?: boolean;
  /** Per-product back lettering geometry (defaults to kit LETTERING) */
  lettering?: LetteringLayout;
  /** Tier 1 campaign vs Tier 2 truth (default). */
  tier?: ImageTier;
  /** Persistent badge on campaign back — lettered SKUs. */
  showNameBadge?: boolean;
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

/** Slight upward arch across the name — matches AVENUE A · 36 ref. */
function ArchedName({ text, archDeg }: { text: string; archDeg: number }) {
  if (!archDeg || text.length < 2) return <>{text}</>;
  const chars = [...text];
  const mid = (chars.length - 1) / 2;
  return (
    <span className="inline-flex items-end justify-center">
      {chars.map((ch, i) => {
        const t = mid === 0 ? 0 : (i - mid) / mid;
        const rot = t * archDeg;
        const lift = -Math.abs(t) * 0.22;
        return (
          <span
            key={`${ch}-${i}`}
            className="inline-block"
            style={{
              transform: `rotate(${rot}deg) translateY(${lift}em)`,
              transformOrigin: "center bottom",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Photoreal live preview — garment photo only.
 * No geometric motif bake / overlay on front, back, or side.
 * Name + number lettering is personalization on the back view only.
 */
export function ProductCanvas({
  view,
  frontSrc,
  secondarySrc,
  threeQuarterSrc,
  fontId,
  name,
  number,
  productLabel,
  showLettering = true,
  lettering = LETTERING,
  tier = "truth",
  showNameBadge = false,
}: Props) {
  const font = fontById(fontId)!;
  const src =
    view === "front"
      ? frontSrc
      : view === "three-quarter"
        ? (threeQuarterSrc ?? frontSrc)
        : secondarySrc;
  const displayName = (name || "CARTER").slice(0, 12).toUpperCase();
  const displayNumber = number || "00";
  const blackout = lettering.surface === "blackout";
  const nameShadow = blackout
    ? "0 0 2px #000, 0 1px 0 #000, 0 0 12px rgba(0,0,0,0.85)"
    : "0 1px 0 #0a0a0a, 0 0 8px rgba(0,0,0,0.45)";
  const numberShadow = blackout
    ? "0 0 3px #000, 0 2px 0 #000, 0 0 18px rgba(0,0,0,0.9)"
    : "0 2px 0 #0a0a0a, 0 0 14px rgba(0,0,0,0.4)";
  const nameChars = Math.max(displayName.replace(/\s/g, "").length, 1);
  const nameFit = Math.min(1, 6.5 / nameChars);
  const nameTracking = nameChars >= 10 ? "0.04em" : nameChars >= 7 ? "0.08em" : "0.12em";
  const nameInkBiasEm = useInkBiasEm(displayName, font.cssFamily, nameTracking);
  const numberInkBiasEm =
    useInkBiasEm(displayNumber, font.cssFamily, "0") + (displayNumber.length === 1 ? 0.05 : 0);
  const campaign = tier === "campaign";
  const aspectClass = campaign ? "aspect-square" : "aspect-[3/4]";
  const stageBg = campaign ? CAMPAIGN_SHOT.background : "#0a0a0a";
  const caption = campaign
    ? `${productLabel} · ${view} · campaign`
    : `${productLabel} · ${view}${blackout && view === "back" ? " · blackout" : ""} · live preview`;

  return (
    <figure
      className={`relative overflow-hidden ${aspectClass}`}
      style={{ containerType: "size", background: stageBg }}
    >
      <img
        key={src}
        src={src}
        alt={`${productLabel}, ${view} view`}
        className="absolute inset-0 h-full w-full object-contain object-center"
        draggable={false}
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
              overflow: "visible",
              textShadow: nameShadow,
              WebkitTextStroke: blackout ? "0.4px rgba(0,0,0,0.55)" : undefined,
            }}
          >
            <ArchedName text={displayName} archDeg={lettering.name.archDeg ?? 0} />
          </p>
          <p
            className="absolute flex items-center justify-center whitespace-nowrap text-center leading-none text-white"
            style={{
              top: `${lettering.number.y}%`,
              left: `${lettering.centerX}%`,
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

      {view === "back" && showNameBadge && (
        <p className="pointer-events-none absolute bottom-10 left-3 z-10 bg-bone px-2.5 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-garnet">
          {CAMPAIGN_NAME_BADGE}
        </p>
      )}

      <figcaption className="label-caps absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-center text-[0.6rem] tracking-[0.14em] text-bone/80">
        {caption}
      </figcaption>
    </figure>
  );
}
