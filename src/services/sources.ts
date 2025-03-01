import { createQueryKeys } from "@lukemorales/query-key-factory";
import { queryOptions } from "@tanstack/react-query";

import { api } from "../libs/api";
import { Paginate, Source } from "../types";

export const sourceKeys = createQueryKeys("sources", {
  all: (query?: string) => [{ query }],
});

export const fetchSourcesQueryOptions = (query?: string) =>
  queryOptions({
    ...sourceKeys.all(query),
    queryFn: ({ signal }) =>
      api
        .get<Paginate<Source>>("sources", {
          params: {
            query,
          },
          signal,
        })
        .then((response) => response.data),
  });
