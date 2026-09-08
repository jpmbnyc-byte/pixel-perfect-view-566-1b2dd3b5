import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/harbor")({
  head: () => departmentHead("harbor"),
  component: () => <DepartmentPage category="harbor" />,
});
