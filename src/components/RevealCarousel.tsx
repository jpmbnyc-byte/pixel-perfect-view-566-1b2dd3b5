import { useEffect, useEffectEvent, useState } from "react";

import frame1 from "@/assets/bayonne/reveal/reveal-01-crest.jpg";
import frame2 from "@/assets/bayonne/reveal/reveal-02-wordmark.jpg";
import frame3 from "@/assets/bayonne/reveal/reveal-03-crest-on-kit.jpg";
import frame4 from "@/assets/bayonne/reveal/reveal-04-copy.jpg";
import frame5 from "@/assets/bayonne/reveal/reveal-05-credit.jpg";

const FRAMES = [
  { src: frame1, alt: "Queen Bees crest on a garnet field" },
  { src: frame2, alt: "QUEEN BEES wordmark in white on garnet" },
  { src: frame3, alt: "Queen Bees crest on the kit, chest left" },
  {
    src: frame4,
    alt: "They've been calling themselves this for years. Nobody ever drew it.",
  },
  { src: frame5, alt: "No Parade F.C. — Bayonne, NJ" },
] as const;

const HOLD_MS = 3200;
const FADE_MS = 700;

/**
 * Silent five-frame reveal. No music. No CTA.
 * Copy only lands on frame 4; frame 5 credits the studio.
 */
export function RevealCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const advance = useEffectEvent(() => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % FRAMES.length);
      setVisible(true);
    }, FADE_MS);
  });

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(advance, HOLD_MS + FADE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const frame = FRAMES[index];

  return (
    <section
      className="relative h-dvh w-full overflow-hidden bg-[var(--garnet)]"
      aria-roledescription="carousel"
      aria-label="Queen Bees crest reveal"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <img
        key={frame.src}
        src={frame.src}
        alt={frame.alt}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Progress ticks — silent UI, not a CTA */}
      <div
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2 px-6"
        aria-hidden
      >
        {FRAMES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setVisible(false);
              window.setTimeout(() => {
                setIndex(i);
                setVisible(true);
              }, FADE_MS / 2);
            }}
            className={`h-0.5 w-8 transition-colors duration-500 ${
              i === index ? "bg-bone" : "bg-bone/30"
            }`}
            aria-label={`Show frame ${i + 1}`}
          />
        ))}
      </div>

      <p className="sr-only">
        Frame {index + 1} of {FRAMES.length}. Silent reveal — no music.
      </p>
    </section>
  );
}
