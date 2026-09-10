import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { fontsStylesheetHref } from "@/lib/catalog";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { resolveKitShopify } from "@/lib/shopify";
import { shareHome } from "@/copy/share";
import { shareHead } from "@/lib/shareHead";

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
    const shared = shareHead(shareHome());
    return {
      meta: shared.meta,
      links: [...shared.links, { rel: "stylesheet", href: fontsStylesheetHref() }],
    };
  },
  component: TeamSlugLayout,
});

function TeamSlugLayout() {
  return <Outlet />;
}
