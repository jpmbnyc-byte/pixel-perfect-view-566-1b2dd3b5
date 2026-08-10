import { Link, createFileRoute } from "@tanstack/react-router";

import queenCrest from "@/assets/bayonne/reveal/reveal-01-crest.jpg";
import boxingBee from "@/assets/bayonne/spirit/boxing-bee.png";
import { StoreCloseCountdown } from "@/components/StoreCloseCountdown";
import { PRODUCTS, productById } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

/** Selling-page plates — mockups labelled as such until real garment photos exist. */
const kitPlate = productById("full-set")!.thumb;
const jerseyFront = productById("jersey")!.thumb;

export const Route = createFileRoute("/team/")({
  head: () => {
    const title =
      "Bayonne Bees Team Customs — garnet specified right since 1936 | No Parade F.C.";
    const description =
      "Custom sublimated Bayonne Bees kits designed in Bayonne. Garnet since 1936 — not maroon, not burgundy, not cardinal. Match jersey $58. Names and numbers included.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TeamLanding,
});

const LOWEST = Math.min(...PRODUCTS.map((p) => p.price));
const jersey = productById("jersey")!;
const fullSet = productById("full-set")!;
const shorts = productById("shorts")!;

const CTA = `Personalize Match jersey · $${jersey.price}`;

/**
 * Team Customs selling page — Ogilvy long-copy register.
 * Light ground, dark type, image then headline then body. Not brand-world dark.
 */
function TeamLanding() {
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="bg-[var(--bone)] text-foreground">
      <header className="mx-auto flex w-full max-w-[640px] items-center gap-3 px-6 pt-8 pb-4">
        <img src={boxingBee} alt="" className="h-10 w-10 object-contain" />
        <div className="min-w-0">
          <p className="font-kit text-xl tracking-[0.04em] text-foreground">BAYONNE BEES</p>
          <p className="label-caps mt-0.5 text-muted-foreground">
            No Parade F.C. · Team Customs · 669 Avenue A
          </p>
        </div>
      </header>

      {/* 1 — Photograph (mockup) on top */}
      <figure className="mx-auto w-full max-w-[640px] px-6">
        <div className="overflow-hidden bg-[#e8e4e0]">
          <img
            src={kitPlate}
            alt="Bayonne Bees Match kit — garnet jersey and shorts, studio mockup of the Merchize blank"
            className="mx-auto h-auto w-full object-contain"
          />
        </div>
        <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">
          Bayonne Bees Match kit in school garnet (#5A1626). Studio mockup of the Merchize
          sublimation blank — not a photograph of a finished garment. No Parade Team Customs,
          Bayonne, NJ.
        </figcaption>
      </figure>

      {/* 2 — Headline beneath the photograph */}
      <div className="mx-auto w-full max-w-[640px] px-6 pt-8">
        <h1 className="font-serif text-[clamp(1.75rem,5.5vw,2.35rem)] font-normal leading-[1.2] tracking-tight text-foreground normal-case">
          Garnet since 1936. Most spirit wear gets the color wrong.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/85">
          Specified in Bayonne’s actual garnet — not maroon, not burgundy, not cardinal. Your
          kit is drawn by a person in Bayonne, not selected from a catalogue of layouts.
        </p>
        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: jersey.id }}
          className="label-caps mt-6 inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
        >
          {CTA}
        </Link>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Match jersey ${jersey.price} · Shorts ${shorts.price} · Full kit ${fullSet.price} ·
          From ${LOWEST}
        </p>
        <StoreCloseCountdown closesAt={kit.closesAt} className="mt-3 text-center" />
      </div>

      {/* 3 — The electric clock */}
      <section className="mx-auto w-full max-w-[640px] px-6 pt-14">
        <h2 className="font-serif text-2xl font-normal normal-case tracking-tight text-foreground">
          Garnet is not maroon
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          Garnet is a dark, slightly brown-toned red. Maroon is purple-toned. Burgundy is
          darker still. Put them side by side in a gym and you can see it from the top row.
          Most spirit wear is printed in whatever red the vendor already had loaded. It
          looks close on a screen and wrong in person, and it fades a shade further with
          every wash.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          The color on these kits is dyed into the fibre on a Merchize sublimation blank —
          not printed on top as a transfer that can crack or peel. One matched garnet
          (#5A1626) across the whole Bayonne store. A crew bought in October matches a
          jersey ordered in April.
        </p>
      </section>

      {/* 4 — What it is */}
      <section className="mx-auto w-full max-w-[640px] px-6 pt-12">
        <h2 className="font-serif text-2xl font-normal normal-case tracking-tight text-foreground">
          What you are ordering
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          No Parade Team Customs makes custom sublimated kits for schools and clubs that
          want a designed identity rather than a logo on a blank. This store is the Bayonne
          Bees program store: Match kits with name and number, Training and Sideline pieces,
          and Faithful wear for parents, alumni, and boosters — open year-round. The person
          who designs the kit works from Bayonne and answers the phone.
        </p>
      </section>

      {/* Product plate with caption */}
      <figure className="mx-auto mt-10 w-full max-w-[640px] px-6">
        <div className="overflow-hidden bg-[#e8e4e0]">
          <img
            src={jerseyFront}
            alt="Match Jersey front — black V-neck, garnet field, BAYONNE chest band, bee crest"
            className="mx-auto h-auto w-full object-contain"
          />
        </div>
        <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">
          Match Jersey, ${jersey.price}. Name and number on the back — printed with the
          garment, not heat-pressed after. Sizes adult 2XS–3XL. Studio mockup of the Merchize
          V-neck blank.
        </figcaption>
      </figure>

      {/* 5 — Process */}
      <section className="mx-auto w-full max-w-[640px] px-6 pt-14">
        <h2 className="font-serif text-2xl font-normal normal-case tracking-tight text-foreground">
          How an order works
        </h2>
        <ol className="mt-6 list-decimal space-y-5 pl-5 text-base leading-relaxed text-foreground/85">
          <li>
            <span className="font-semibold text-foreground">Design here.</span> Pick the
            piece, type the name and number, choose a size. The live preview updates as you
            type — about two minutes for a Match jersey.
          </li>
          <li>
            <span className="font-semibold text-foreground">Confirm spelling.</span> You
            check a box that the name, number, and size are final. Custom kits are not
            edited after checkout. That confirmation rides on the order.
          </li>
          <li>
            <span className="font-semibold text-foreground">Checkout on Shopify.</span>{" "}
            Payment runs on noparade-store.com. Nothing prints until the order is paid.
          </li>
          <li>
            <span className="font-semibold text-foreground">Print and ship.</span> Art
            follows the line properties on the order (name, number, size, font). Kits
            typically ship about three weeks from approval once the listing is live on
            Shopify.
          </li>
        </ol>
        <p className="mt-6 text-base leading-relaxed text-foreground/85">
          For new team programs outside this Bayonne store, a design proof is in your inbox
          within 48 hours from the person who draws it.
        </p>
      </section>

      {/* 6 — Prices */}
      <section className="mx-auto w-full max-w-[640px] px-6 pt-14">
        <h2 className="font-serif text-2xl font-normal normal-case tracking-tight text-foreground">
          Prices — stated openly
        </h2>
        <ul className="mt-6 space-y-2 text-base text-foreground/85">
          <li>Match Jersey — ${jersey.price} (name and number included)</li>
          <li>Match Shorts — ${shorts.price}</li>
          <li>Full Kit Set — ${fullSet.price}</li>
          <li>Other pieces from ${LOWEST} — listed on each product</li>
        </ul>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          Adult sizes 2XS to 3XL. Size chart gives chest and body length in inches. No
          “contact us for a quote” on this store — the price you see is the price.
        </p>
        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: jersey.id }}
          className="label-caps mt-6 inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
        >
          {CTA}
        </Link>
      </section>

      {/* 7 — Objections as body copy, not accordion */}
      <section className="mx-auto w-full max-w-[640px] px-6 pt-14">
        <h2 className="font-serif text-2xl font-normal normal-case tracking-tight text-foreground">
          Questions people ask before they spend the booster money
        </h2>

        <h3 className="mt-8 font-serif text-xl font-normal normal-case text-foreground">
          What if a name is misspelled?
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground/85">
          You confirm spelling before checkout. Personalized items cannot be returned or
          exchanged. If we print what you confirmed, that is the order. If we print something
          other than what you confirmed, we make it right.
        </p>

        <h3 className="mt-8 font-serif text-xl font-normal normal-case text-foreground">
          When does the store close?
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground/85">
          The Match roster window has a closing date so a team order actually finishes. The
          Faithful tier — parents, alumni, boosters — stays open year-round. Closing the
          whole program store when an alumnus finally clicks the link is the most expensive
          kind of tidiness.
        </p>

        <h3 className="mt-8 font-serif text-xl font-normal normal-case text-foreground">
          Is the preview a photograph of the finished shirt?
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground/85">
          No. You are looking at a studio mockup of the Merchize blank with Bayonne art
          applied. Once real delivered kits are photographed in Bayonne, those photographs
          replace the mockups on this page.
        </p>

        <h3 className="mt-8 font-serif text-xl font-normal normal-case text-foreground">
          Who am I dealing with?
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground/85">
          A person in Bayonne who designs the kit and answers a text at nine at night —
          not a national catalogue desk. That is the part a warehouse cannot copy.
        </p>
      </section>

      {/* 8 — Founding season + Queen Bees (no invented testimonials) */}
      <section className="mx-auto w-full max-w-[640px] px-6 pt-14 pb-4">
        <h2 className="font-serif text-2xl font-normal normal-case tracking-tight text-foreground">
          Founding season
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          This is the founding season of the Bayonne Bees Team Customs store. There are no
          invented testimonials. When coaches send real names and towns, those go here.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          In 2024 the Hudson County champions answered to a name that lived only in speech.
          Queen Bees. There was no mark. So we drew the crest. The files are theirs if they
          want them.
        </p>
        <figure className="mt-8 overflow-hidden bg-[var(--garnet)]">
          <img
            src={queenCrest}
            alt="Queen Bees crest drawn for Bayonne — boxing bee with crown"
            className="mx-auto h-auto w-full max-w-sm object-contain"
          />
          <figcaption className="bg-[var(--bone)] px-1 pt-3 text-sm leading-snug text-muted-foreground">
            Queen Bees crest, drawn in Bayonne for a name that already existed in speech.
            No Parade F.C.
          </figcaption>
        </figure>
      </section>

      {/* 9 — Single CTA, same words */}
      <section className="mx-auto w-full max-w-[640px] px-6 py-14">
        <Link
          to="/team/$slug/$product"
          params={{ slug: kit.slug, product: jersey.id }}
          className="label-caps inline-flex w-full items-center justify-center bg-garnet px-6 py-4 text-bone transition-opacity hover:opacity-90"
        >
          {CTA}
        </Link>
        <Link
          to="/team/$slug"
          params={{ slug: kit.slug }}
          className="label-caps mt-3 inline-flex w-full items-center justify-center border border-foreground/25 px-6 py-4 text-foreground transition-colors hover:border-foreground"
        >
          Browse the Bayonne store
        </Link>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          No Parade F.C. · Bayonne, NJ · 669 Avenue A since 1936
        </p>
      </section>
    </main>
  );
}
