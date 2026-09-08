import type { CategoryId } from "@/lib/catalog";

export const DEPARTMENT_TO: Record<
  CategoryId,
  "/team/$slug/match" | "/team/$slug/sideline" | "/team/$slug/warmups" | "/team/$slug/alumni"
> = {
  match: "/team/$slug/match",
  sideline: "/team/$slug/sideline",
  warmups: "/team/$slug/warmups",
  alumni: "/team/$slug/alumni",
};
