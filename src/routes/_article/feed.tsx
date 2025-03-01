import { createFileRoute } from "@tanstack/react-router";

import UserFeedArticleList from "../../pages/articles/UserFeedArticleList";
import { fetchInfiniteFeedArticlesQueryOptions } from "../../services/articles";

export const Route = createFileRoute("/_article/feed")({
  component: RouteComponent,
  loader: (opts) =>
    opts.context.queryClient.ensureInfiniteQueryData(
      fetchInfiniteFeedArticlesQueryOptions(),
    ),
});

function RouteComponent() {
  return <UserFeedArticleList />;
}
