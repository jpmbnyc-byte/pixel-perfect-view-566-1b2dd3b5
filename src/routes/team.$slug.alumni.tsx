import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/alumni")({
  head: () => departmentHead("alumni"),
  component: () => <DepartmentPage category="alumni" />,
});
