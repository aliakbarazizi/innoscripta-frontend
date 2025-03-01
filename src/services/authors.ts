import { createQueryKeys } from "@lukemorales/query-key-factory";
import { queryOptions } from "@tanstack/react-query";

import { api } from "../libs/api";
import { Author, Paginate } from "../types";

export const authorKeys = createQueryKeys("authors", {
  all: (query?: string) => [{ query }],
  feed: null,
});

export const fetchAuthorsQueryOptions = (query?: string) =>
  queryOptions({
    ...authorKeys.all(query),
    queryFn: ({ signal }) =>
      api
        .get<Paginate<Author>>("authors", {
          params: {
            query,
          },
          signal,
        })
        .then((response) => response.data),
  });
