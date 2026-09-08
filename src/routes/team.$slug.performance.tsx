import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/performance")({
  head: () => departmentHead("performance"),
  component: () => <DepartmentPage category="performance" />,
});
