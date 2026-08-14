import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/sideline")({
  head: () => departmentHead("sideline"),
  component: () => <DepartmentPage category="sideline" />,
});
