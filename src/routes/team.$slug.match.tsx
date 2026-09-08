import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/match")({
  head: () => departmentHead("match"),
  component: () => <DepartmentPage category="match" />,
});
