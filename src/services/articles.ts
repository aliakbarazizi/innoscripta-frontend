import { createQueryKeys } from "@lukemorales/query-key-factory";
import { infiniteQueryOptions } from "@tanstack/react-query";

import { api } from "../libs/api";
import { Article, Paginate } from "../types";

export const articleKeys = createQueryKeys("articles", {
  all: (search?: ArticleSearchRequest) => ({
    queryKey: [{ search }],
  }),
  feed: null,
});

interface ArticleSearchRequest {
  query?: string;
  categories?: number[];
  authors?: number[];
  sources?: number[];
}

export const fetchInfiniteArticlesQueryOptions = (
  search?: ArticleSearchRequest,
) =>
  infiniteQueryOptions({
    ...articleKeys.all(search),
    queryFn: ({ pageParam }) =>
      api
        .get<Paginate<Article>>(`articles`, {
          params: { page: pageParam, ...search },
        })
        .then((response) => response.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : null,
  });

export const fetchInfiniteFeedArticlesQueryOptions = () =>
  infiniteQueryOptions({
    ...articleKeys.feed,
    queryFn: ({ pageParam }) =>
      api
        .get<Paginate<Article>>(`articles/feed`, {
          params: { page: pageParam },
        })
        .then((response) => response.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : null,
  });
