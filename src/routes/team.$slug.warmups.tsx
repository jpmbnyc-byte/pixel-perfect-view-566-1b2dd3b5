import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/warmups")({
  head: () => departmentHead("warmups"),
  component: () => <DepartmentPage category="warmups" />,
});
