import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$slug/warmups")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/team/$slug/travel", params, replace: true });
  },
  component: () => null,
});
