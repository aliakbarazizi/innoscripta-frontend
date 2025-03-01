import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { useHeaderContext } from "../../context/HeaderContext";
import ArticleList from "../../pages/articles/ArticleList";
import ArticleSearchBar from "../../pages/articles/ArticleSearchBar";
import { fetchInfiniteArticlesQueryOptions } from "../../services/articles";
import {
  ArticleSearchContext,
  ArticleStore,
  createArticleSearchStore,
} from "../../store/articleSearchStore";

export const Route = createFileRoute("/_article/")({
  component: RouteComponent,
  loader: (opts) =>
    opts.context.queryClient.ensureInfiniteQueryData(
      fetchInfiniteArticlesQueryOptions(),
    ),
});

function RouteComponent() {
  const { setComponent } = useHeaderContext();

  const store = useRef<ArticleStore>(undefined);

  if (!store.current) {
    store.current = createArticleSearchStore({
      query: "",
      authors: [],
      categories: [],
      sources: [],
    });
  }

  useEffect(() => {
    setComponent(
      <ArticleSearchContext.Provider value={store.current!}>
        <ArticleSearchBar />
      </ArticleSearchContext.Provider>,
    );
    return () => setComponent(null);
  }, [setComponent]);

  return (
    <ArticleSearchContext.Provider value={store.current}>
      <ArticleList />
    </ArticleSearchContext.Provider>
  );
}
