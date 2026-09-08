import { createFileRoute, redirect } from "@tanstack/react-router";

import { CATEGORY_IDS, DEPARTMENT_TO, TeamStorePage } from "@/components/TeamStorePage";
import { categoryById } from "@/lib/catalog";
import { Route as TeamSlugRoute } from "./team.$slug";

/**
 * Legacy `/team/$slug` + `#match` etc. → real department route.
 * Preserve shared links that used hash anchors.
 */
export const Route = createFileRoute("/team/$slug/")({
  beforeLoad: ({ params, location }) => {
    const raw = location.hash.replace(/^#/, "");
    const dept = CATEGORY_IDS.includes(raw as (typeof CATEGORY_IDS)[number])
      ? (raw as (typeof CATEGORY_IDS)[number])
      : "match";
    throw redirect({
      to: DEPARTMENT_TO[dept],
      params: { slug: params.slug },
      replace: true,
    });
  },
  component: () => null,
});

// Type-only re-export helpers for department route heads
export function departmentHead(categoryId: (typeof CATEGORY_IDS)[number]) {
  const cat = categoryById(categoryId)!;
  const title = `${cat.label} — Bayonne Team Customs | No Parade F.C.`;
  const description = cat.description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  };
}

export function DepartmentPage({ category }: { category: (typeof CATEGORY_IDS)[number] }) {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  return <TeamStorePage category={category} kit={kit} sync={sync} />;
}
