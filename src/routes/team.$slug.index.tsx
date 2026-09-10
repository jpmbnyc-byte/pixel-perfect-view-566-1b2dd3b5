import { createFileRoute, redirect } from "@tanstack/react-router";

import { CATEGORY_IDS, DEPARTMENT_TO, TeamStorePage } from "@/components/TeamStorePage";
import type { CategoryId } from "@/lib/catalog";
import { shareDepartment } from "@/copy/share";
import { shareHead } from "@/lib/shareHead";
import { Route as TeamSlugRoute } from "./team.$slug";

const HASH_ALIASES: Record<string, CategoryId> = {
  sideline: "performance",
  warmups: "travel",
  alumni: "club",
};

export const Route = createFileRoute("/team/$slug/")({
  beforeLoad: ({ params, location }) => {
    const raw = location.hash.replace(/^#/, "");
    const mapped = HASH_ALIASES[raw] ?? raw;
    const dept = CATEGORY_IDS.includes(mapped as CategoryId) ? (mapped as CategoryId) : "match";
    throw redirect({
      to: DEPARTMENT_TO[dept],
      params: { slug: params.slug },
      replace: true,
    });
  },
  component: () => null,
});

export function departmentHead(categoryId: CategoryId) {
  return shareHead(shareDepartment(categoryId));
}

export function DepartmentPage({ category }: { category: CategoryId }) {
  const { kit, sync } = TeamSlugRoute.useLoaderData();
  return <TeamStorePage category={category} kit={kit} sync={sync} />;
}
