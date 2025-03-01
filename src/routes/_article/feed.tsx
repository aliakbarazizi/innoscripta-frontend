import { createFileRoute } from "@tanstack/react-router";

import UserFeedArticleList from "../../pages/articles/UserFeedArticleList";

export const Route = createFileRoute("/_article/feed")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserFeedArticleList />;
}
