import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { KitMockup, exportMockupPng, type View } from "@/components/KitMockup";
import {
  SIZES,
  SIZE_CHART,
  buildArtSpec,
  countdownParts,
  encodeArtSpec,
  priceFor,
  sanitizeName,
  sanitizeNumber,
  variantIdFor,
  type Item,
  type Size,
} from "@/lib/kit";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import {
  cartAddAction,
  itemSyncReady,
  resolveKitShopify,
  shopifySynced,
  type ShopifySyncStatus,
} from "@/lib/shopify";

export const Route = createFileRoute("/team/$slug")({
  loader: async ({ params }) => {
    if (params.slug !== BAYONNE_BEES_KIT.slug) throw notFound();
    const { kit, sync } = await resolveKitShopify(BAYONNE_BEES_KIT);
    return { kit, sync };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Team store unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.kit.teamName} Team Kit — No Parade F.C.`;
    const description = `Order your ${loaderData.kit.teamName} ${loaderData.kit.family.label} ${loaderData.kit.family.version} kit. Pick your name, number and size before the store closes.`;
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
  component: TeamOrderPage,
});

const ITEM_LABELS: Record<Item, string> = {
  top: "Jersey",
  bottom: "Shorts",
  set: "Full Set",
};

function TeamOrderPage() {
  const { kit, sync } = Route.useLoaderData();
  const formRef = useRef<HTMLFormElement>(null);

  const [view, setView] = useState<View>("back");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState<Size | "">("");
  const [item, setItem] = useState<Item>(() => {
    if (sync.set) return "set";
    if (sync.top) return "top";
    if (sync.bottom) return "bottom";
    return "set";
  });
  const [confirmed, setConfirmed] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Clear size when switching to an item/size that has no synced variant.
  useEffect(() => {
    if (size && !variantIdFor(kit, item, size)) setSize("");
  }, [kit, item, size]);

  const countdown = countdownParts(kit.closesAt, now);
  const closed = kit.status !== "live" || countdown === null;
  const catalogReady = shopifySynced(sync);
  const itemReady = itemSyncReady(sync, item);

  const itemOptions = useMemo<Item[]>(() => {
    if (kit.mode === "top_only") return ["top"];
    if (kit.mode === "bottom_only") return ["bottom"];
    return ["top", "bottom", "set"];
  }, [kit.mode]);

  const numberValue = Number(number);
  const numberValid =
    number !== "" &&
    Number.isFinite(numberValue) &&
    numberValue >= kit.rules.numberMin &&
    numberValue <= kit.rules.numberMax;

  const variantId = size ? variantIdFor(kit, item, size) : null;
  const ready = Boolean(
    name && numberValid && size && variantId && confirmed && !closed && itemReady,
  );

  const artSpec = size ? buildArtSpec({ kit, item, name, number, size }) : null;

  async function handleSave() {
    setExporting(true);
    try {
      await exportMockupPng({
        kit,
        view,
        name,
        number,
        storeUrl: `noparade.fc/team/${kit.slug}`,
      });
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[520px] bg-background pb-16">
      <header className="border-b border-border px-5 pb-5 pt-6">
        <Link
          to="/team"
          className="label-caps text-muted-foreground transition-colors hover:text-foreground"
        >
          No Parade F.C. · Team Customs
        </Link>
        <h1 className="mt-2 text-4xl leading-none tracking-tight">{kit.teamName}</h1>
        <p className="label-caps mt-3 text-accent-foreground">
          {kit.family.label} {kit.family.version} · {kit.colorway.name}
        </p>
        <p className="mt-1 font-display text-lg text-muted-foreground">“{kit.family.doctrine}”</p>

        <div className="mt-4 flex items-baseline gap-2 border-t border-border pt-4">
          {closed ? (
            <span className="label-caps text-destructive">Store closed</span>
          ) : (
            <>
              <span className="label-caps text-muted-foreground">Store closes in</span>
              <span className="font-kit text-2xl leading-none text-accent-foreground">
                {countdown.days}d {countdown.hours}h {countdown.minutes}m
              </span>
            </>
          )}
        </div>
      </header>

      {!catalogReady && (
        <div className="border-b border-border bg-secondary/60 px-5 py-3 text-sm leading-snug text-muted-foreground">
          Checkout unlocks after Printful syncs Jersey / Shorts / Full Set to{" "}
          <span className="text-foreground">noparade-store.com</span>. You can still preview your
          name and number.
        </div>
      )}

      <section className="px-5 pt-5">
        <div className="mb-3 grid grid-cols-2 gap-px overflow-hidden border border-border">
          {(["front", "back"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`label-caps py-2.5 transition-colors ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <KitMockup kit={kit} view={view} name={name} number={number} priority />

        <button
          type="button"
          onClick={handleSave}
          disabled={exporting}
          className="label-caps mt-3 w-full border border-border bg-card py-3 text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
        >
          {exporting ? "Preparing…" : "Save image"}
        </button>
      </section>

      <section className="mt-8 space-y-7 px-5">
        <Field label="Name on back" hint={`${kit.rules.nameMaxChars} characters max`}>
          <input
            value={name}
            onChange={(e) => setName(sanitizeName(e.target.value, kit.rules.nameMaxChars))}
            placeholder="SAINT-PIERRE"
            inputMode="text"
            autoComplete="off"
            className="w-full border-b border-input bg-transparent pb-2 font-kit text-3xl tracking-wide outline-none placeholder:text-muted-foreground/50 focus:border-ring"
          />
        </Field>

        <Field label="Number" hint={`${kit.rules.numberMin}–${kit.rules.numberMax}`}>
          <input
            value={number}
            onChange={(e) => setNumber(sanitizeNumber(e.target.value))}
            placeholder="7"
            inputMode="numeric"
            className="w-full border-b border-input bg-transparent pb-2 font-kit text-3xl tracking-wide outline-none placeholder:text-muted-foreground/50 focus:border-ring"
          />
        </Field>

        <Field
          label="Size"
          hint={
            <button
              type="button"
              onClick={() => setChartOpen((o) => !o)}
              className="label-caps underline underline-offset-4"
            >
              {chartOpen ? "Hide chart" : "Size chart"}
            </button>
          }
        >
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map((s) => {
              const available = Boolean(variantIdFor(kit, item, s));
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!available}
                  onClick={() => setSize(s)}
                  className={`label-caps border py-3 transition-colors ${
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary"
                  } disabled:cursor-not-allowed disabled:border-dashed disabled:bg-transparent disabled:text-muted-foreground/50`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {SIZES.some((s) => !variantIdFor(kit, item, s)) && (
            <p className="mt-2 text-sm text-muted-foreground">
              Dashed sizes are unavailable for this item.
            </p>
          )}
          {chartOpen && (
            <table className="mt-4 w-full border border-border text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="label-caps px-3 py-2 text-left">Size</th>
                  <th className="label-caps px-3 py-2 text-left">Chest</th>
                  <th className="label-caps px-3 py-2 text-left">Length</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-t border-border">
                    <td className="px-3 py-2 font-kit text-base">{row.size}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.chest}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Field>

        <Field label="Item">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${itemOptions.length}, minmax(0,1fr))` }}
          >
            {itemOptions.map((opt) => {
              const synced = itemSyncReady(sync, opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setItem(opt)}
                  className={`border px-2 py-3 transition-colors ${
                    item === opt
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="label-caps block">{ITEM_LABELS[opt]}</span>
                  <span className="mt-1 block font-kit text-xl">
                    {synced ? `$${priceFor(kit, opt)}` : "—"}
                  </span>
                </button>
              );
            })}
          </div>
        </Field>
      </section>

      <section className="mt-8 border-t border-border px-5 pt-6">
        <label className="flex items-start gap-3 text-base leading-snug">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 size-5 shrink-0 accent-[var(--primary)]"
          />
          <span>I've checked my spelling, number, and size — custom kits are final sale.</span>
        </label>

        <form
          ref={formRef}
          method="POST"
          action={cartAddAction(kit.shopify.domain)}
          target="_top"
          className="hidden"
          acceptCharset="UTF-8"
        >
          <input type="hidden" name="id" value={variantId ?? ""} />
          <input type="hidden" name="quantity" value="1" />
          {/* Land in Shopify Checkout after ATC (verified 302 → /checkout). */}
          <input type="hidden" name="return_to" value="/checkout" />
          <input type="hidden" name="properties[Team]" value={kit.teamName} />
          <input type="hidden" name="properties[Collection]" value="Team Customs" />
          <input type="hidden" name="properties[Name]" value={name} />
          <input type="hidden" name="properties[Number]" value={number} />
          <input type="hidden" name="properties[Size]" value={size} />
          <input
            type="hidden"
            name="properties[_ArtSpec]"
            value={artSpec ? encodeArtSpec(artSpec) : ""}
          />
          <input type="hidden" name="properties[_Confirmed]" value="yes" />
        </form>

        <button
          type="button"
          disabled={!ready}
          onClick={() => formRef.current?.submit()}
          className="label-caps mt-5 w-full bg-primary py-4 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {closed
            ? "Store closed"
            : !itemReady
              ? "Waiting for Printful sync"
              : `Checkout · $${priceFor(kit, item)}`}
        </button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Checkout is handled by{" "}
          <a
            href={kit.shopify.domain}
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            noparade-store.com
          </a>
          . Printful personalizes Name + Number after payment.
        </p>
        <SyncHint sync={sync} />
      </section>
    </main>
  );
}

function SyncHint({ sync }: { sync: ShopifySyncStatus }) {
  if (shopifySynced(sync) && sync.top && sync.bottom && sync.set) return null;
  const missing = (
    [
      ["Jersey", sync.top],
      ["Shorts", sync.bottom],
      ["Full Set", sync.set],
    ] as const
  )
    .filter(([, ok]) => !ok)
    .map(([label]) => label);

  if (!missing.length) return null;
  return (
    <p className="mt-2 text-center text-xs text-muted-foreground">
      Not synced yet: {missing.join(" · ")}
    </p>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="label-caps text-muted-foreground">{label}</span>
        {hint && <span className="label-caps text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
