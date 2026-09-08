import { createFileRoute } from "@tanstack/react-router";
import { DepartmentPage, departmentHead } from "./team.$slug.index";

export const Route = createFileRoute("/team/$slug/club")({
  head: () => departmentHead("club"),
  component: () => <DepartmentPage category="club" />,
});
