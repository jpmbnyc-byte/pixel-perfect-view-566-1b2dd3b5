type Props = {
  name: string;
  className?: string;
};

/** Neutral production placeholder — never a wrong garment. */
export function ComingSoonMedia({ name, className }: Props) {
  return (
    <div
      className={`relative flex aspect-[5/4] flex-col items-center justify-center overflow-hidden bg-[color-mix(in_oklab,var(--paper)_92%,white)] ${className ?? ""}`}
    >
      <p className="place-line text-ink/40">Fall 001 · 07002</p>
      <p className="type-editorial mt-4 max-w-[14rem] text-center text-lg text-ink">{name}</p>
      <p className="mt-3 max-w-[16rem] text-center text-sm leading-relaxed text-ink/45">
        Final photography in production.
      </p>
    </div>
  );
}
