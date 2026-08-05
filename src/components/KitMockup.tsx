import { LETTERING, type KitConfig } from "@/lib/kit";

import frontImg from "@/assets/model-soccer-front.jpg";
import backImg from "@/assets/model-soccer-back.jpg";

export const MOCKUPS = {
  front: frontImg,
  back: backImg,
} as const;

export type View = keyof typeof MOCKUPS;

type Props = {
  kit: KitConfig;
  view: View;
  name: string;
  number: string;
  priority?: boolean;
};

/**
 * Live mockup. The back view draws lettering from the shared geometry module
 * (§9.1) as SVG in a 100x137.5 viewBox matching the photograph's aspect, so the
 * same percentages drive the canvas export and, later, the print file.
 */
export function KitMockup({ kit, view, name, number, priority }: Props) {
  const { font } = kit;

  return (
    <figure className="relative overflow-hidden bg-secondary">
      <img
        src={MOCKUPS[view]}
        alt={`${kit.teamName} ${kit.family.label} kit, ${view} view`}
        width={1024}
        height={1408}
        loading={priority ? "eager" : "lazy"}
        className="block w-full"
      />

      {view === "back" && (
        <svg
          viewBox="0 0 100 137.5"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <text
            x={LETTERING.centerX}
            y={LETTERING.name.y * 1.375}
            textAnchor="middle"
            fontFamily={font.cssFamily}
            fontSize={LETTERING.name.heightPct * 1.375}
            letterSpacing="0.12"
            fill={font.name.fill}
            stroke={font.name.outline}
            strokeWidth={font.name.outlineWidth * 0.12}
            style={{ paintOrder: "stroke fill", opacity: 0.94 }}
          >
            {name}
          </text>
          <text
            x={LETTERING.centerX}
            y={LETTERING.number.y * 1.375}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily={font.cssFamily}
            fontSize={LETTERING.number.heightPct * 1.375}
            fill={font.name.fill}
            stroke={font.name.outline}
            strokeWidth={font.name.outlineWidth * 0.32}
            style={{ paintOrder: "stroke fill", opacity: 0.94 }}
          >
            {number}
          </text>
        </svg>
      )}

      <figcaption className="label-caps absolute bottom-0 left-0 right-0 bg-primary/85 px-3 py-2 text-center text-primary-foreground">
        Concept mockup — not a photograph of the finished product
      </figcaption>
    </figure>
  );
}

/** Portrait PNG export of the current view, drawn from the same geometry. */
export async function exportMockupPng(args: {
  kit: KitConfig;
  view: View;
  name: string;
  number: string;
  storeUrl: string;
}) {
  const { kit, view, name, number, storeUrl } = args;

  await document.fonts.ready;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = MOCKUPS[view];
  await img.decode();

  const W = 1024;
  const IMG_H = Math.round((img.naturalHeight / img.naturalWidth) * W);
  const FOOTER = 180;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = IMG_H + FOOTER;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.fillStyle = "#F4F1EA";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, W, IMG_H);

  if (view === "back") {
    const { font } = kit;
    const drawLetter = (
      text: string,
      xPct: number,
      yPct: number,
      heightPct: number,
      strokeScale: number,
      baseline: CanvasTextBaseline,
    ) => {
      ctx.font = `${(heightPct / 100) * IMG_H}px ${font.cssFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = baseline;
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.94;
      ctx.lineWidth = font.name.outlineWidth * strokeScale;
      ctx.strokeStyle = font.name.outline;
      ctx.strokeText(text, (xPct / 100) * W, (yPct / 100) * IMG_H);
      ctx.fillStyle = font.name.fill;
      ctx.fillText(text, (xPct / 100) * W, (yPct / 100) * IMG_H);
      ctx.globalAlpha = 1;
    };

    drawLetter(name, LETTERING.centerX, LETTERING.name.y, LETTERING.name.heightPct, 1.4, "alphabetic");
    drawLetter(number, LETTERING.centerX, LETTERING.number.y, LETTERING.number.heightPct, 4, "middle");
  }

  ctx.fillStyle = "#1F2A44";
  ctx.fillRect(0, IMG_H, W, FOOTER);
  ctx.fillStyle = "#C9A96A";
  ctx.fillRect(0, IMG_H, W, 4);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#EFE8DA";
  ctx.font = "56px 'Instrument Serif', Georgia, serif";
  ctx.fillText(kit.teamName.toUpperCase(), W / 2, IMG_H + 72);
  ctx.fillStyle = "#C9A96A";
  ctx.font = "26px 'Barlow Condensed', sans-serif";
  ctx.fillText(storeUrl, W / 2, IMG_H + 112);
  ctx.fillStyle = "rgba(239,232,218,0.6)";
  ctx.font = "20px 'Barlow Condensed', sans-serif";
  ctx.fillText("Concept mockup — not a photograph of the finished product", W / 2, IMG_H + 150);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("Export failed");

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${kit.slug}-${(name || "kit").toLowerCase()}-${number || "0"}.png`;
  a.click();
  URL.revokeObjectURL(url);
}
