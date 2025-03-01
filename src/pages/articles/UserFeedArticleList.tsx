import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Fragment } from "react/jsx-runtime";

import Loading from "../../components/helper/Loading";
import { fetchInfiniteFeedArticlesQueryOptions } from "../../services/articles";
import Article from "./Article";

export default function UserFeedArticleList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(fetchInfiniteFeedArticlesQueryOptions());

  return (
    <div>
      {data !== undefined && data.pages[0].data.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-2xl text-gray-900">No articles found</p>
          <p className="text-sm text-gray-500">
            To customize your feed, save your search preferences
          </p>
        </div>
      )}
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
