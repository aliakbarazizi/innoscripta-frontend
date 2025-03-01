import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import Layout from "../layouts/Layout";
import { fetchMeQueryOptions } from "../services/users";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  loader: ({ context }) =>
    context.queryClient.prefetchQuery(fetchMeQueryOptions()),
});
