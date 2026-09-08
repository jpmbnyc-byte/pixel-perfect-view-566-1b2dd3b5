import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$slug/alumni")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/team/$slug/club", params, replace: true });
  },
  component: () => null,
});
