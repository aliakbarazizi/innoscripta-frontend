import { QueryClient } from "@tanstack/react-query";

import { shouldRetryOnError } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetryOnError,
    },
  },
});
