import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  title?: string;
};

/** Primary lockup: serif BAYONNE + tracked ATHLETICS + BAYONNE, NJ. */
export function Wordmark({
  className,
  variant = "primary",
  align = "center",
}: {
  className?: string;
  variant?: "primary" | "compact" | "stacked";
  align?: "center" | "left";
}) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center text-current", className)}>
        <span className="font-display text-[1.05rem] font-medium uppercase leading-[0.95] tracking-[0.42em]">
          BAYONNE
        </span>
        <span
          className="mt-3 font-display text-[2.4rem] font-medium uppercase leading-[0.82] tracking-[0.08em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          BAYONNE
        </span>
        <span className="mt-3 font-sans text-[0.58rem] font-medium tracking-[0.48em]">ATHLETICS</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-col text-current", alignClass, className)}>
      <span className="font-display text-[1.55rem] font-medium uppercase leading-none tracking-[0.14em] sm:text-[1.85rem]">
        BAYONNE
      </span>
      <span className="mt-[0.38rem] font-sans text-[0.58rem] font-medium tracking-[0.55em]">ATHLETICS</span>
      {variant === "primary" ? (
        <span className="mt-[0.32rem] font-sans text-[0.48rem] font-medium tracking-[0.42em] opacity-50">
          BAYONNE, NJ
        </span>
      ) : null}
    </span>
  );
}

/** Interlocking BA monogram. */
export function Monogram({ className, title = "Bayonne Athletics" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 72 64"
      className={cn("text-current", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <text
        x="2"
        y="54"
        fill="currentColor"
        fontFamily="Bodoni Moda, Times New Roman, serif"
        fontSize="58"
        fontWeight="600"
        letterSpacing="-8"
      >
        B
      </text>
      <text
        x="22"
        y="54"
        fill="currentColor"
        fontFamily="Bodoni Moda, Times New Roman, serif"
        fontSize="58"
        fontWeight="600"
        letterSpacing="-8"
      >
        A
      </text>
    </svg>
  );
}

/** Circular seal: BA, NJ, TRAIN · COMPETE · REPRESENT. */
export function Crest({ className, title = "Bayonne Athletics crest" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("text-current", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <path id="crest-top" d="M28,100 A72,72 0 0 1 172,100" fill="none" />
      <path id="crest-bot" d="M172,100 A72,72 0 0 1 28,100" fill="none" />
      <text
        fill="currentColor"
        fontFamily="Barlow, Helvetica, sans-serif"
        fontSize="11.5"
        fontWeight="500"
        letterSpacing="3.2"
      >
        <textPath href="#crest-top" startOffset="50%" textAnchor="middle">
          BAYONNE ATHLETICS
        </textPath>
      </text>
      <text
        fill="currentColor"
        fontFamily="Barlow, Helvetica, sans-serif"
        fontSize="9.5"
        fontWeight="500"
        letterSpacing="2.4"
      >
        <textPath href="#crest-bot" startOffset="50%" textAnchor="middle">
          TRAIN · COMPETE · REPRESENT
        </textPath>
      </text>
      <text
        x="100"
        y="118"
        fill="currentColor"
        fontFamily="Bodoni Moda, Times New Roman, serif"
        fontSize="52"
        fontWeight="600"
        letterSpacing="-4"
        textAnchor="middle"
      >
        BA
      </text>
      <text
        x="38"
        y="106"
        fill="currentColor"
        fontFamily="Barlow, Helvetica, sans-serif"
        fontSize="9"
        fontWeight="600"
        letterSpacing="2"
        textAnchor="middle"
      >
        NJ
      </text>
      <text
        x="162"
        y="106"
        fill="currentColor"
        fontFamily="Barlow, Helvetica, sans-serif"
        fontSize="9"
        fontWeight="600"
        letterSpacing="2"
        textAnchor="middle"
      >
        NJ
      </text>
    </svg>
  );
}

/** Four-point compass star with B / A. */
export function StarMark({ className, title = "Bayonne Athletics" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={cn("text-current", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <text
        x="8"
        y="32"
        fill="currentColor"
        fontFamily="Bodoni Moda, Times New Roman, serif"
        fontSize="22"
        fontWeight="600"
      >
        B
      </text>
      <path
        d="M60 4 L66 20 L82 24 L66 28 L60 44 L54 28 L38 24 L54 20 Z"
        fill="currentColor"
      />
      <text
        x="96"
        y="32"
        fill="currentColor"
        fontFamily="Bodoni Moda, Times New Roman, serif"
        fontSize="22"
        fontWeight="600"
        textAnchor="middle"
      >
        A
      </text>
    </svg>
  );
}

/** Athletic condensed 201. */
export function Numeric201({ className }: { className?: string }) {
  return (
    <span className={cn("type-numeric inline-block text-current", className)} aria-label="201">
      201
    </span>
  );
}

/** Script Bayonne + ATHLETICS. */
export function ScriptMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center text-current", className)}>
      <span className="type-script text-[2.4rem] leading-none">Bayonne</span>
      <span className="mt-1 font-sans text-[0.58rem] font-medium tracking-[0.5em]">ATHLETICS</span>
    </span>
  );
}

/** Triple slash motion mark from the identity sheet. */
export function MotionMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex font-sans text-[0.72rem] font-medium tracking-[0.22em] text-current",
        className,
      )}
      aria-hidden
    >
      ///
    </span>
  );
}

export function TaglineLockup({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center gap-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.42em] text-current",
        className,
      )}
    >
      <span>Built different.</span>
      <span className="opacity-70">Bayonne. Athletics.</span>
    </span>
  );
}

/** Wireframe globe — global mindset, local roots. */
export function GlobeMark({ className, title = "Global mindset, local roots" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("text-current", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 24 H42" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M9 14 H39" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <path d="M9 34 H39" fill="none" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

/** New Jersey silhouette — training club. */
export function NewJerseyMark({ className, title = "Bayonne, New Jersey" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 80 140"
      className={cn("text-current", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M34 6c8 1 16 8 22 16 6 8 16 16 20 22 3 5 2 12-4 15-6 4-8 10-7 18 1 16 0 32-4 48-3 14-8 28-16 36-6 6-14 5-18-2-6-12-12-28-16-44-4-16-8-30-6-44 2-12 5-22 12-32C23 18 28 8 34 6z"
      />
    </svg>
  );
}
