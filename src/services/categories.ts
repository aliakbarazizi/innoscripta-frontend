import { createQueryKeys } from "@lukemorales/query-key-factory";
import { queryOptions } from "@tanstack/react-query";

import { api } from "../libs/api";
import { Category, Paginate } from "../types";

export const categoiryKeys = createQueryKeys("categories", {
  all: (query?: string) => [{ query }],
});

export const fetchCategoriesQueryOptions = (query?: string) =>
  queryOptions({
    ...categoiryKeys.all(query),
    queryFn: ({ signal }) =>
      api
        .get<Paginate<Category>>("categories", {
          params: {
            query,
          },
          signal,
        })
        .then((response) => response.data),
  });
