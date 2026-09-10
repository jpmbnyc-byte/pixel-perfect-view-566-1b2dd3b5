import { Monogram } from "@/components/brand/BrandMarks";
import { ShareMark } from "@/components/ShareMark";
import { COLLECTION_COPY } from "@/copy/collection";
import { shareHome } from "@/copy/share";
import fluffiesBroadway from "@/assets/bayonne/places/fluffies-broadway.jpg";

export function LocalGround() {
  return (
    <section
      className="relative isolate min-h-[78dvh] overflow-hidden bg-black"
      aria-labelledby="local-ground-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        <img
          src={fluffiesBroadway}
          alt=""
          width={1600}
          height={1200}
          className="h-full w-full object-cover object-[18%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[78dvh] w-full max-w-[1280px] flex-col justify-between px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex h-24 w-24 items-center justify-center bg-bone sm:h-32 sm:w-32">
          <Monogram className="h-[4.4rem] w-[5rem] text-garnet sm:h-[5.6rem] sm:w-[6.4rem]" />
        </div>

        <div className="max-w-xl">
          <p className="place-line text-bone">{COLLECTION_COPY.localLine}</p>
          <h2
            id="local-ground-heading"
            className="type-editorial mt-4 text-[clamp(2rem,5.5vw,3.6rem)] text-bone"
          >
            {COLLECTION_COPY.localTitle}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/75">{COLLECTION_COPY.localBody}</p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <ShareMark payload={shareHome()} tone="bone" />
            <p className="place-line text-bone/55">{COLLECTION_COPY.lockup}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
