import type { FontId, MotifId } from "@/lib/catalog";
import { fontById } from "@/lib/catalog";
import { LETTERING } from "@/lib/kit";

export type CanvasView = "front" | "back";

type Props = {
  view: CanvasView;
  motif: MotifId;
  fontId: FontId;
  name: string;
  number: string;
  productLabel: string;
  showLettering?: boolean;
};

const FILL = "#5A1626";
const BONE = "#F4F1F0";
const BLACK = "#0A0A0A";

/** Live configurator canvas: maroon base + motif + premium lettering. */
export function ProductCanvas({
  view,
  motif,
  fontId,
  name,
  number,
  productLabel,
  showLettering = true,
}: Props) {
  const font = fontById(fontId)!;

  return (
    <figure className="relative aspect-[3/4] overflow-hidden bg-black">
      <svg
        viewBox="0 0 300 400"
        className="h-full w-full"
        role="img"
        aria-label={`${productLabel}, ${view} view`}
      >
        <defs>
          <MotifPatterns />
          <clipPath id="garment">
            <GarmentPath view={view} />
          </clipPath>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B1C2E" />
            <stop offset="100%" stopColor={FILL} />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Studio ground */}
        <rect width="300" height="400" fill="#141214" />
        <ellipse cx="150" cy="360" rx="110" ry="18" fill="#000" opacity="0.45" />

        <g filter="url(#softShadow)">
          <g clipPath="url(#garment)">
            {/* Base background layer */}
            <rect width="300" height="400" fill="url(#baseGrad)" />
            {/* Alternate geometric motif */}
            <rect width="300" height="400" fill={`url(#motif-${motif})`} opacity="0.92" />
            {/* Subtle fabric grain */}
            <rect width="300" height="400" fill="url(#motif-grain)" opacity="0.18" />
          </g>

          {/* Garment outline / seams */}
          <GarmentPath
            view={view}
            fill="none"
            stroke={BONE}
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <Collar view={view} />
        </g>

        {view === "front" && (
          <text
            x="150"
            y="168"
            textAnchor="middle"
            fill={BONE}
            stroke={BLACK}
            strokeWidth="0.6"
            style={{
              fontFamily: font.cssFamily,
              fontSize: 22,
              letterSpacing: "0.14em",
              paintOrder: "stroke fill",
            }}
          >
            BAYONNE
          </text>
        )}

        {view === "back" && showLettering && (
          <>
            <text
              x={LETTERING.centerX * 3}
              y={LETTERING.name.y * 4}
              textAnchor="middle"
              fill={BONE}
              stroke={FILL}
              strokeWidth="0.8"
              style={{
                fontFamily: font.cssFamily,
                fontSize: 14,
                letterSpacing: "0.16em",
                paintOrder: "stroke fill",
              }}
            >
              {(name || "NAME").slice(0, 12)}
            </text>
            <text
              x={LETTERING.centerX * 3}
              y={LETTERING.number.y * 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={BONE}
              stroke={BLACK}
              strokeWidth="1.4"
              style={{
                fontFamily: font.cssFamily,
                fontSize: 72,
                paintOrder: "stroke fill",
              }}
            >
              {number || "00"}
            </text>
          </>
        )}
      </svg>

      <figcaption className="label-caps absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-center text-[0.6rem] tracking-[0.14em] text-bone/80">
        {productLabel} · {view} · live preview
      </figcaption>
    </figure>
  );
}

function GarmentPath({
  view,
  fill,
  stroke,
  strokeWidth,
  strokeOpacity,
}: {
  view: CanvasView;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
  strokeOpacity?: string | number;
}) {
  // Minimal athletic jersey silhouette (front/back share body; neck differs slightly).
  const d =
    view === "front"
      ? "M95 78 C95 62 120 52 150 52 C180 52 205 62 205 78 L230 110 L268 128 L255 168 L220 155 L220 330 C220 348 200 360 150 360 C100 360 80 348 80 330 L80 155 L45 168 L32 128 L70 110 Z"
      : "M95 78 C95 62 120 52 150 52 C180 52 205 62 205 78 L230 110 L268 128 L255 168 L220 155 L220 330 C220 348 200 360 150 360 C100 360 80 348 80 330 L80 155 L45 168 L32 128 L70 110 Z";

  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={strokeOpacity}
    />
  );
}

function Collar({ view }: { view: CanvasView }) {
  if (view === "back") {
    return (
      <path
        d="M118 78 C130 70 170 70 182 78"
        fill="none"
        stroke="#F4F1F0"
        strokeWidth="3"
        strokeOpacity="0.35"
      />
    );
  }
  return (
    <path
      d="M118 78 L150 98 L182 78"
      fill="none"
      stroke="#F4F1F0"
      strokeWidth="3"
      strokeOpacity="0.4"
    />
  );
}

function MotifPatterns() {
  return (
    <>
      {/* Chevron — sharp diagonal blocks */}
      <pattern
        id="motif-chevron"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-28)"
      >
        <rect width="40" height="40" fill="#5A1626" />
        <rect width="20" height="40" fill="#0A0A0A" opacity="0.55" />
        <rect x="20" width="4" height="40" fill="#F4F1F0" opacity="0.35" />
      </pattern>

      {/* Grid — micro athletic grid */}
      <pattern id="motif-grid" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#5A1626" />
        <path
          d="M12 0 H0 V12"
          fill="none"
          stroke="#F4F1F0"
          strokeOpacity="0.14"
          strokeWidth="0.6"
        />
        <circle cx="0" cy="0" r="0.7" fill="#0A0A0A" opacity="0.35" />
      </pattern>

      {/* Arc panel — curved band geometry */}
      <pattern
        id="motif-arc"
        width="80"
        height="80"
        patternUnits="userSpaceOnUse"
        patternTransform="translate(-10 0)"
      >
        <rect width="80" height="80" fill="#5A1626" />
        <path
          d="M-10 80 Q40 20 90 80"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="22"
          opacity="0.5"
        />
        <path
          d="M-10 80 Q40 28 90 80"
          fill="none"
          stroke="#F4F1F0"
          strokeWidth="2"
          opacity="0.28"
        />
      </pattern>

      <pattern id="motif-grain" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill="transparent" />
        <circle cx="1" cy="2" r="0.4" fill="#000" opacity="0.35" />
      </pattern>
    </>
  );
}
