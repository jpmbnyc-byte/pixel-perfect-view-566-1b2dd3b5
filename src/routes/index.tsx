import { createFileRoute, redirect } from "@tanstack/react-router";

/** Home opens the Fall 001 landing. */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/team" });
  },
});
