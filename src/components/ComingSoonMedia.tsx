import { cn } from "@/lib/utils";
import { MotionMark } from "@/components/brand/BrandMarks";

type Props = {
  name: string;
  className?: string;
};

/** Neutral production placeholder — never a wrong garment. */
export function ComingSoonMedia({ name, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-[color-mix(in_oklab,var(--paper)_92%,white)]",
        className ?? "aspect-[5/4]",
      )}
    >
      <p className="place-line text-ink/40">Fall 001 · 07002</p>
      <MotionMark className="mt-5 text-garnet" />
      <p className="type-editorial mt-5 max-w-[14rem] text-center text-2xl text-ink">{name}</p>
      <p className="mt-3 max-w-[16rem] text-center text-sm leading-relaxed text-ink/45">
        Final photography in production.
      </p>
    </div>
  );
}
