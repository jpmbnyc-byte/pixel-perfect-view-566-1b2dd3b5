import { useEffect, useState } from "react";
import type { FontId } from "@/lib/catalog";
import { fontById } from "@/lib/catalog";
import { LETTERING, type LetteringLayout } from "@/lib/kit";
import { CAMPAIGN_NAME_BADGE, CAMPAIGN_SHOT } from "@/tokens/campaign";
import { COLOR } from "@/tokens/brand";
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
  /** Scales lettering with apparel size (print proportion preview). */
  printScale?: number;
  /** Brief confirmation flash when name+number committed. */
  confirmFlash?: boolean;
  className?: string;
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

/** Name sits on one straight baseline — never per-character rotate or lift. */
function PrintName({ text }: { text: string }) {
  return <span className="inline-block whitespace-nowrap align-baseline">{text}</span>;
}

/**
 * Photoreal storefront canvas — garment photo only.
 * Lettering is positioned as a percentage of the plate itself so the
 * on-screen name/number match print location, scale, and spacing.
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
  printScale = 1,
  confirmFlash = false,
  className,
}: Props) {
  const font = fontById(fontId)!;
  const src =
    view === "front"
      ? frontSrc
      : view === "three-quarter"
        ? (threeQuarterSrc ?? frontSrc)
        : secondarySrc;
  const displayName = name;
  const displayNumber = number;
  const blackout = lettering.surface === "blackout";
  const fill = COLOR.bone;
  const stroke = blackout ? COLOR.trimBlack : COLOR.garnet;
  const nameChars = Math.max(displayName.replace(/\s/g, "").length, 1);
  const nameFit = Math.min(1, 8 / nameChars) * printScale;
  const numberScale = printScale;
  const nameTracking = nameChars >= 10 ? "0.01em" : nameChars >= 7 ? "0.035em" : "0.055em";
  const nameInkBiasEm = useInkBiasEm(displayName || "A", font.cssFamily, nameTracking);
  const numberInkBiasEm =
    useInkBiasEm(displayNumber || "8", font.cssFamily, "0") + (displayNumber.length === 1 ? 0.04 : 0);
  const campaign = tier === "campaign";
  const aspectClass = campaign ? "aspect-square" : "aspect-[529/576]";
  const stageBg = campaign ? CAMPAIGN_SHOT.background : "color-mix(in oklab, var(--paper) 70%, white)";
  const [plate, setPlate] = useState<{ w: number; h: number } | null>(null);
  const showNameLayer = showLettering && view === "back" && Boolean(displayName);
  const showNumberLayer = showLettering && (view === "back" || view === "front") && Boolean(displayNumber);

  useEffect(() => {
    if (!showLettering || (view !== "back" && view !== "front")) return;
    performance.mark("lettering-paint-start");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        performance.mark("lettering-paint-end");
        try {
          performance.measure("lettering-keypress-to-paint", "lettering-paint-start", "lettering-paint-end");
        } catch {
          /* marks may collide across rapid keystrokes */
        }
      });
    });
  }, [name, number, fontId, showLettering, view, printScale]);

  const letterStyle = {
    color: fill,
    WebkitTextStroke: `0.045em ${stroke}`,
    paintOrder: "stroke fill" as const,
    textShadow: "none",
  };

  return (
    <figure
      className={`relative overflow-hidden ${className ?? aspectClass} transition-[box-shadow] duration-standard ease-standard ${
        confirmFlash ? "ring-2 ring-garnet ring-offset-2 ring-offset-background" : ""
      }`}
      style={{ background: stageBg }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative max-h-full max-w-full"
          style={{
            height: !plate || plate.h >= plate.w ? "100%" : undefined,
            width: plate && plate.w > plate.h ? "100%" : undefined,
            aspectRatio: plate ? `${plate.w} / ${plate.h}` : "529 / 576",
            containerType: "size",
          }}
        >
          <img
            key={src}
            src={src}
            alt={`${productLabel}, ${view} view`}
            className="absolute inset-0 h-full w-full object-contain object-center"
            draggable={false}
            onLoad={(event) => {
              const el = event.currentTarget;
              setPlate({ w: el.naturalWidth, h: el.naturalHeight });
            }}
          />

          {(showNameLayer || showNumberLayer) && (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {showNameLayer ? (
                <p
                  className="absolute flex items-end justify-center whitespace-nowrap text-center uppercase"
                  style={{
                    top: `${lettering.name.y}%`,
                    left: `${lettering.centerX}%`,
                    transform: `translateX(calc(-50% - ${nameInkBiasEm}em)) scale(${nameFit})`,
                    transformOrigin: "center bottom",
                    width: `${lettering.name.maxWidthPct}%`,
                    height: `${lettering.name.heightPct}%`,
                    fontFamily: font.cssFamily,
                    fontSize: `calc(${lettering.name.heightPct} * 1cqh)`,
                    letterSpacing: nameTracking,
                    lineHeight: 0.86,
                    overflow: "visible",
                    ...letterStyle,
                  }}
                >
                  <PrintName text={displayName} />
                </p>
              ) : null}
              {showNumberLayer ? (
                <p
                  className="absolute flex items-start justify-center whitespace-nowrap text-center leading-none"
                  style={{
                    top: `${lettering.number.y}%`,
                    left: `${lettering.centerX}%`,
                    transform: `translateX(calc(-50% - ${numberInkBiasEm}em)) scale(${numberScale})`,
                    transformOrigin: "center top",
                    width: "max-content",
                    maxWidth: `${lettering.number.maxWidthPct}%`,
                    height: `${lettering.number.heightPct}%`,
                    fontFamily: font.cssFamily,
                    fontSize: `calc(${lettering.number.heightPct} * 1cqh)`,
                    overflow: "visible",
                    ...letterStyle,
                  }}
                >
                  {displayNumber}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {view === "back" && showNameBadge && (
        <p className="pointer-events-none absolute bottom-10 left-3 z-10 bg-bone px-2.5 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-garnet">
          {CAMPAIGN_NAME_BADGE}
        </p>
      )}
    </figure>
  );
}
