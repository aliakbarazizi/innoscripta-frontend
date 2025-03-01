import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Fragment } from "react/jsx-runtime";
import { useShallow } from "zustand/react/shallow";

import Loading from "../../components/helper/Loading";
import { fetchInfiniteArticlesQueryOptions } from "../../services/articles";
import { useArticleStore } from "../../store/articleSearchStore";
import Article from "./Article";

export default function ArticleList() {
  const { query, authors, categories, sources } = useArticleStore(
    useShallow(({ query, authors, categories, sources }) => ({
      query,
      authors,
      categories,
      sources,
    })),
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      fetchInfiniteArticlesQueryOptions({
        query,
        authors: authors.map((author) => author.id),
        categories: categories.map((category) => category.id),
        sources: sources.map((source) => source.id),
      }),
    );

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => !isFetchingNextPage && fetchNextPage()}
        hasMore={hasNextPage}
        initialLoad={false}
        threshold={10}
        loader={<Loading key="loading" />}
        className="flex flex-col items-center gap-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {data?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.data.map((article) => (
                <Article key={article.id} article={article} />
              ))}
            </Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
