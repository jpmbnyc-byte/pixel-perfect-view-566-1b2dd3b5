import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { CRESTS } from "@/lib/brandAssets";
import setFront from "@/assets/bayonne/campaign/nylon-set-front.jpg";
import setBack from "@/assets/bayonne/campaign/nylon-set-back.jpg";
import setDetail from "@/assets/bayonne/campaign/nylon-set-detail.jpg";

export const Route = createFileRoute("/preorder")({
  head: () => {
    const title = "Avenue A Nylon Set — garnet/black pre-order | No Parade F.C.";
    const description =
      "Premium crinkle-nylon unisex tracksuit set in Bayonne garnet and black. Limited first run of 120. Reserve your size — $30 holds it, $148 at delivery.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PreorderPage,
});

const SIZES = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;
const PIECES = [
  { id: "set", label: "Full set", price: 300, note: "Jacket + pant" },
  { id: "jacket", label: "Half-zip only", price: 185, note: "Nylon shell" },
  { id: "pant", label: "Pant only", price: 145, note: "Elastic cuff" },
] as const;

const RUN_TOTAL = 120;
const RUN_TAKEN = 87;

function PreorderPage() {
  const [piece, setPiece] = useState<(typeof PIECES)[number]["id"]>("set");
  const [size, setSize] = useState<string>("M");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const active = PIECES.find((p) => p.id === piece)!;
  const left = RUN_TOTAL - RUN_TAKEN;
  const pct = Math.round((RUN_TAKEN / RUN_TOTAL) * 100);

  return (
    <main className="bg-black text-bone">
      {/* —— Hero —— */}
      <section className="relative isolate min-h-dvh overflow-hidden">
        <img
          src={setFront}
          alt="Garnet and black premium nylon unisex tracksuit set, front view"
          width={1024}
          height={1408}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[720px] flex-col px-6 pb-14 pt-8 sm:px-10">
          <header className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={CRESTS.primary} alt="" className="h-10 w-10 object-contain" />
              <p className="place-line text-bone">No Parade F.C. · Avenue A</p>
            </div>
            <Link to="/team" className="place-line text-bone transition-opacity hover:opacity-70">
              Store
            </Link>
          </header>

          <div className="mt-auto space-y-6 pt-24">
            <p className="place-line text-bone/70">Drop 01 · pre-order</p>
            <h1 className="type-campaign-tight text-[clamp(2.6rem,13vw,4.6rem)] leading-[0.86] text-bone">
              AVENUE A
              <br />
              NYLON SET
            </h1>
            <div className="tip-asymmetric">
              <span className="tip-asymmetric-a" />
              <span className="tip-asymmetric-bone" />
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-bone/75">
              Crinkle nylon. Garnet over black. Unisex block, bonded seams, matte hardware — cut
              once, made in one run of {RUN_TOTAL}.
            </p>
            <a
              href="#reserve"
              className="place-line inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-bone transition-colors hover:border-bone"
            >
              Reserve for $30 · ${PIECES[0].price} at delivery
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* —— Scarcity strip —— */}
      <section className="border-y border-bone/15 bg-black">
        <div className="mx-auto w-full max-w-[720px] px-6 py-8 sm:px-10">
          <div className="flex items-baseline justify-between gap-6">
            <p className="place-line text-bone/70">First run</p>
            <p className="type-campaign text-2xl text-bone">
              {left} <span className="text-bone/50">of {RUN_TOTAL} left</span>
            </p>
          </div>
          <div className="mt-4 h-[3px] w-full bg-bone/15">
            <div className="h-full bg-garnet" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-4 text-[0.8rem] leading-relaxed text-bone/50">
            Deposit is refundable until the cut sheet closes. Ships 6–8 weeks after close.
          </p>
        </div>
      </section>

      {/* —— Detail chapter —— */}
      <section className="studio-field">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="place-line">The fabric</p>
          <h2 className="type-editorial mt-6 max-w-lg text-[clamp(1.75rem,5vw,2.4rem)] text-ink">
            Nylon that sounds right when you move.
          </h2>
          <div className="tip-asymmetric mt-8">
            <span className="tip-asymmetric-a" />
            <span className="tip-asymmetric-b" />
          </div>

          <img
            src={setDetail}
            alt="Macro detail of garnet crinkle nylon meeting a black panel at a bonded seam with matte black zip"
            loading="lazy"
            width={1408}
            height={1008}
            className="mt-10 w-full object-cover"
          />

          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-ink/10 pt-8 sm:grid-cols-4">
            {[
              ["Shell", "70D crinkle nylon"],
              ["Colorway", "Garnet / Black"],
              ["Block", "Unisex, relaxed"],
              ["Trim", "Matte black rib"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="place-line">{k}</dt>
                <dd className="type-campaign mt-3 text-lg text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* —— Back view —— */}
      <section className="relative isolate overflow-hidden bg-black">
        <img
          src={setBack}
          alt="Garnet and black nylon tracksuit set, back view"
          loading="lazy"
          width={1024}
          height={1408}
          className="h-[78vh] w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6 pt-24 sm:p-10">
          <div className="mx-auto w-full max-w-[720px]">
            <p className="place-line text-bone/70">Back panel</p>
            <p className="type-editorial mt-3 max-w-sm text-[1.15rem] text-bone">
              Clean garnet field — leave it blank, or add a name and number at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* —— Reserve —— */}
      <section id="reserve" className="studio-field scroll-mt-8">
        <div className="mx-auto w-full max-w-[720px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="place-line">Reserve</p>
          <h2 className="type-editorial mt-6 text-[clamp(1.75rem,5vw,2.4rem)] text-ink">
            Hold your size for $30.
          </h2>

          {done ? (
            <div className="mt-10 border border-ink/15 bg-paper p-8">
              <p className="type-campaign text-xl text-ink">You’re on the sheet.</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">
                {active.label} · size {size}. We’ll email {email} with the deposit link before the
                cut sheet closes.
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="place-line mt-6 border-b border-ink/40 pb-1 text-ink transition-colors hover:border-ink"
              >
                Reserve another
              </button>
            </div>
          ) : (
            <form
              className="mt-10 space-y-10"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <fieldset>
                <legend className="place-line">Piece</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {PIECES.map((p) => {
                    const on = p.id === piece;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPiece(p.id)}
                        aria-pressed={on}
                        className={`border p-4 text-left transition-colors ${
                          on
                            ? "border-garnet bg-garnet text-bone"
                            : "border-ink/20 text-ink hover:border-ink/50"
                        }`}
                      >
                        <span className="type-campaign block text-base">{p.label}</span>
                        <span
                          className={`mt-2 block text-[0.8rem] ${on ? "text-bone/70" : "text-ink/55"}`}
                        >
                          ${p.price} · {p.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="place-line">Size · unisex</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SIZES.map((s) => {
                    const on = s === size;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        aria-pressed={on}
                        className={`min-w-14 border px-4 py-3 text-sm transition-colors ${
                          on
                            ? "border-garnet bg-garnet text-bone"
                            : "border-ink/20 text-ink hover:border-ink/50"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="email" className="place-line">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@bayonne.nj"
                  className="mt-4 w-full border border-ink/20 bg-transparent px-4 py-4 text-ink placeholder:text-ink/35 focus:border-garnet focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
                <p className="text-[0.85rem] text-ink/60">
                  ${active.price} total · $30 now, ${active.price - 30} at ship
                </p>
                <button
                  type="submit"
                  className="place-line bg-garnet px-8 py-4 text-bone transition-opacity hover:opacity-90"
                >
                  Reserve my size
                </button>
              </div>
            </form>
          )}

          <p className="mt-10 max-w-md text-[0.8rem] leading-relaxed text-ink/50">
            Pre-order only. Nothing is charged on this page — deposits run when the sheet closes and
            the run is confirmed.
          </p>
        </div>
      </section>
    </main>
  );
}
