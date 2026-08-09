type Props = {
  /** full = hero immersion; soft = store/PDP atmosphere */
  intensity?: "full" | "soft";
  className?: string;
};

/**
 * Kill van Kull–inspired liquid field: garnet oil-slick on dark harbor water.
 * Decorative only — never carries content or CTAs.
 */
export function LiquidBackdrop({ intensity = "full", className = "" }: Props) {
  const soft = intensity === "soft";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 ${
          soft
            ? "bg-[radial-gradient(ellipse_at_20%_0%,rgba(90,22,38,0.35)_0%,transparent_55%),radial-gradient(ellipse_at_90%_80%,rgba(42,72,88,0.22)_0%,transparent_50%),linear-gradient(180deg,#070608_0%,#12090c_55%,#0a0708_100%)]"
            : "bg-[radial-gradient(ellipse_at_30%_10%,rgba(90,22,38,0.55)_0%,transparent_50%),radial-gradient(ellipse_at_85%_70%,rgba(42,72,88,0.38)_0%,transparent_45%),linear-gradient(165deg,#050406_0%,#1a0a10_42%,#0b1218_78%,#050608_100%)]"
        }`}
      />

      <div
        className={`liquid-blob liquid-blob-a absolute rounded-full blur-3xl motion-safe:animate-liquid-drift-a ${
          soft
            ? "left-[-20%] top-[-10%] h-[55%] w-[70%] opacity-40"
            : "left-[-25%] top-[-15%] h-[70%] w-[85%] opacity-70"
        }`}
      />
      <div
        className={`liquid-blob liquid-blob-b absolute rounded-full blur-3xl motion-safe:animate-liquid-drift-b ${
          soft
            ? "right-[-25%] top-[25%] h-[50%] w-[65%] opacity-30"
            : "right-[-30%] top-[20%] h-[65%] w-[80%] opacity-55"
        }`}
      />
      <div
        className={`liquid-blob liquid-blob-c absolute rounded-full blur-3xl motion-safe:animate-liquid-drift-c ${
          soft
            ? "bottom-[-20%] left-[10%] h-[45%] w-[75%] opacity-25"
            : "bottom-[-25%] left-[5%] h-[55%] w-[90%] opacity-45"
        }`}
      />

      {/* Surface sheen — water skim */}
      <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light motion-safe:animate-liquid-sheen bg-[linear-gradient(115deg,transparent_20%,rgba(244,241,240,0.14)_42%,transparent_58%,rgba(42,72,88,0.2)_72%,transparent_88%)] bg-[length:220%_220%]" />

      {/* Fine grain so it feels printed, not flat UI */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
