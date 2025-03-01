import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_article")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto flex gap-4 p-4 lg:px-0">
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
