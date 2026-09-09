import { Link } from "@tanstack/react-router";

import { COLLECTION_COPY } from "@/copy/collection";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { PEOPLE_PLACES, type PlacePlate } from "@/lib/peoplePlaces";

const SLUG = BAYONNE_BEES_KIT.slug;

function spanClass(span: PlacePlate["span"]) {
  if (span === "feature") return "lg:col-span-7";
  if (span === "tall") return "lg:col-span-5";
  return "lg:col-span-4";
}

function aspectClass(span: PlacePlate["span"]) {
  if (span === "feature") return "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]";
  if (span === "tall") return "aspect-[3/4]";
  return "aspect-[3/4]";
}

export function PeoplePlaces() {
  const feature = PEOPLE_PLACES.filter((p) => p.span !== "standard");
  const rest = PEOPLE_PLACES.filter((p) => p.span === "standard");

  return (
    <section className="studio-field overflow-x-clip border-t border-ink/10" aria-labelledby="people-places-heading">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="place-line">{COLLECTION_COPY.peopleLine}</p>
            <h2
              id="people-places-heading"
              className="type-editorial mt-3 text-[clamp(1.8rem,4vw,2.8rem)] text-ink"
            >
              {COLLECTION_COPY.peopleTitle}
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
              {COLLECTION_COPY.peopleBody}
            </p>
          </div>
          <Link
            to="/team/$slug/match"
            params={{ slug: SLUG }}
            className="place-line shrink-0 text-ink/55 transition-opacity hover:opacity-100"
          >
            {COLLECTION_COPY.shopCta} →
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          {feature.map((plate) => (
            <PlaceTile key={plate.id} plate={plate} spanned />
          ))}
        </ul>

        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
          {rest.map((plate) => (
            <PlaceTile key={plate.id} plate={plate} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlaceTile({ plate, spanned = false }: { plate: PlacePlate; spanned?: boolean }) {
  return (
    <li className={`min-w-0 ${spanned ? spanClass(plate.span) : ""}`}>
      <Link
        to="/team/$slug/$product"
        params={{ slug: SLUG, product: plate.productId }}
        className="group block focus-ring"
      >
        <div className={`relative overflow-hidden bg-ink/5 ${aspectClass(plate.span)}`}>
          <img
            src={plate.src}
            alt={plate.alt}
            width={1400}
            height={1867}
            decoding="async"
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="h-full w-full object-cover object-[center_18%] transition-transform duration-500 ease-standard group-hover:scale-[1.03]"
          />
        </div>
        <p className="place-line mt-4 text-ink/55">{plate.place}</p>
        <p className="type-editorial mt-2 text-xl text-ink sm:text-2xl">{plate.caption}</p>
      </Link>
    </li>
  );
}
