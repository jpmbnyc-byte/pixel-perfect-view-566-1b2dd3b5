import { Link, createFileRoute } from "@tanstack/react-router";

import { CRESTS } from "@/lib/brandAssets";
import { formatUsd } from "@/lib/checkout";
import { loadOrderSummary } from "@/lib/checkout.functions";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";

const asSearchString = (value: unknown) => {
  if (typeof value === "string" && value.length > 0) return value;
  return undefined;
};

const searchFrom = (search: Record<string, unknown>) => ({
  session_id: asSearchString(search["session_id"]),
  mock: search["mock"] === true || search["mock"] === 1 || search["mock"] === "1",
  product: asSearchString(search["product"]),
  size: asSearchString(search["size"]),
  amount:
    typeof search["amount"] === "number"
      ? search["amount"]
      : typeof search["amount"] === "string" && search["amount"] !== ""
        ? Number(search["amount"])
        : undefined,
  description: asSearchString(search["description"]),
});

export const Route = createFileRoute("/order/complete")({
  validateSearch: searchFrom,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const summary = await loadOrderSummary({
      data: {
        ...(deps.session_id ? { sessionId: deps.session_id } : {}),
        ...(deps.mock ? { mock: "1" } : {}),
        ...(deps.product ? { product: deps.product } : {}),
        ...(deps.size ? { size: deps.size } : {}),
        ...(deps.amount != null ? { amount: String(deps.amount) } : {}),
        ...(deps.description ? { description: deps.description } : {}),
      },
    });
    return { summary };
  },
  head: () => ({
    meta: [{ title: "Order confirmed — Bayonne Athletics" }],
  }),
  component: OrderComplete,
});

function OrderComplete() {
  const { summary } = Route.useLoaderData();
  const kit = BAYONNE_BEES_KIT;

  return (
    <main className="studio-field mx-auto min-h-screen w-full max-w-[560px] px-6 py-16 text-ink sm:px-10">
      <img src={CRESTS.primary} alt="" className="h-12 w-12 object-contain" />
      <p className="place-line mt-8">Fall 001 · 07002</p>
      <h1 className="type-editorial mt-4 text-[clamp(1.8rem,6vw,2.4rem)]">
        {summary?.paid ? "You’re confirmed." : summary?.mode === "mock" ? "Checkout preview." : "Order received."}
      </h1>
      <div className="tip-asymmetric mt-7">
        <span className="tip-asymmetric-a" />
        <span className="tip-asymmetric-b" />
      </div>

      {!summary ? (
        <p className="mt-8 text-sm leading-relaxed text-ink/60">
          We couldn’t find that checkout session. If you were charged, the confirmation email from Stripe still stands.
        </p>
      ) : (
        <section className="mt-10 space-y-4 border-y border-ink/10 py-8">
          <p className="type-campaign text-xl">{summary.productName}</p>
          {summary.description && <p className="place-line text-ink/50">{summary.description}</p>}
          {summary.amountTotal != null && (
            <p className="font-sans text-lg tabular-nums">{formatUsd(summary.amountTotal)}</p>
          )}
          {summary.shippingCents != null && (
            <p className="text-sm text-ink/55">Shipping {formatUsd(summary.shippingCents)}</p>
          )}
          {summary.email && <p className="text-sm text-ink/55">Receipt to {summary.email}</p>}
          {summary.note && <p className="text-sm leading-relaxed text-ink/50">{summary.note}</p>}
        </section>
      )}

      <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink/60">
        Made to order. Production follows the Fall 001 window. Personalized lettering cannot be changed.
      </p>

      <Link
        to="/team/$slug/match"
        params={{ slug: kit.slug }}
        className="place-line mt-10 inline-flex items-center gap-3 border-b border-ink/30 pb-2"
      >
        Back to Fall 001
        <span aria-hidden>→</span>
      </Link>
    </main>
  );
}
