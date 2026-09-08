import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$slug/sideline")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/team/$slug/performance", params, replace: true });
  },
  component: () => null,
});
