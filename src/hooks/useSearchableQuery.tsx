import {
  DefaultError,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export function useSearchableQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryOptions: (
    search?: string,
  ) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounceValue(search, 500);

  return {
    ...useQuery(queryOptions(debouncedSearch)),
    search,
    setSearch,
  };
}
