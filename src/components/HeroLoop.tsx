import { AREA_CODE_STILLS, HERO_LOOP_SRC } from "@/lib/imageRegistry";

type Props = {
  className?: string;
};

/** Etnies-style autoplay loop. Falls back to the church still if motion is reduced. */
export function HeroLoop({ className }: Props) {
  return (
    <div className={className ?? "absolute inset-0"} aria-hidden>
      <img
        src={AREA_CODE_STILLS.church}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster={AREA_CODE_STILLS.church}
      >
        <source src={HERO_LOOP_SRC} type="video/mp4" />
      </video>
    </div>
  );
}

export const FILM_STILLS = [
  { src: AREA_CODE_STILLS.church, label: "Parish" },
  { src: AREA_CODE_STILLS.bridge, label: "Bridge" },
  { src: AREA_CODE_STILLS.portrait, label: "201" },
  { src: AREA_CODE_STILLS.hat, label: "Crown" },
] as const;
