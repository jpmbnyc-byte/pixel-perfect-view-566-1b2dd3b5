import { createFileRoute, redirect } from "@tanstack/react-router";

/** Home opens the Team Customs landing, which leads into Bayonne Bees live. */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/team" });
  },
});
