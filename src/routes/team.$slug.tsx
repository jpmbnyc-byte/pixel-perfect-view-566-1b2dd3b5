import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { fontsStylesheetHref } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { resolveKitShopify } from "@/lib/shopify";

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
    const title = `Bayonne store — garnet, not maroon | No Parade F.C.`;
    const description = `Bayonne has worn garnet and white since 1936. Match, Training, Sideline, and Faithful — printed on demand in the actual garnet.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "stylesheet", href: fontsStylesheetHref() }],
    };
  },
  component: TeamSlugLayout,
});

function TeamSlugLayout() {
  return <Outlet />;
}
