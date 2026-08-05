import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/team/$slug", params: { slug: "bayonne-bees" } });
  },
});
