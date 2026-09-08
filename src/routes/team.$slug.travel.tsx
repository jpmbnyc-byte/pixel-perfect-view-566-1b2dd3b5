import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/travel")({
  head: () => departmentHead("travel"),
  component: () => <DepartmentPage category="travel" />,
});
