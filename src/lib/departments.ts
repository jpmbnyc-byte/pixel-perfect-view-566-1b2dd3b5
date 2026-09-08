import type { CategoryId } from "@/lib/catalog";

export const DEPARTMENT_TO: Record<
  CategoryId,
  | "/team/$slug/match"
  | "/team/$slug/performance"
  | "/team/$slug/travel"
  | "/team/$slug/harbor"
  | "/team/$slug/club"
> = {
  match: "/team/$slug/match",
  performance: "/team/$slug/performance",
  travel: "/team/$slug/travel",
  harbor: "/team/$slug/harbor",
  club: "/team/$slug/club",
};
