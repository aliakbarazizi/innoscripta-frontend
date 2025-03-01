import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";

import { api } from "../libs/api";
import { User } from "../types";
import { articleKeys } from "./articles";

export const userKeys = createQueryKeys("user", {
  me: null,
});

export const fetchMeQueryOptions = () =>
  queryOptions({
    ...userKeys.me,
    queryFn: () => api.get<User>("me").then((response) => response.data),
  });

interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState<string>();

  return {
    ...useMutation({
      mutationFn: (data: LoginRequest) =>
        api
          .get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie")
          .then(() =>
            api.post("/login", data).then((response) => response.data),
          ),
      onSuccess: async () => {
        await queryClient.refetchQueries(fetchMeQueryOptions());
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 422) {
          setErrorMessage(error.response.data.message);
        }
      },
    }),
    errorMessage,
  };
};

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState<string>();

  return {
    ...useMutation({
      mutationFn: (data: RegisterRequest) =>
        api
          .get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie")
          .then(() =>
            api.post("/register", data).then((response) => response.data),
          ),
      onSuccess: async () => {
        await queryClient.refetchQueries(fetchMeQueryOptions());
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 422) {
          setErrorMessage(error.response.data.message);
        }
      },
    }),
    errorMessage,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post("logout").then((response) => response.data),
    onSuccess: () => {
      queryClient.removeQueries(userKeys.me);
    },
  });
};

type UpdatePreferencesRequest = {
  authors: number[];
  categories: number[];
  sources: number[];
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePreferencesRequest) =>
      api.put("preferences", data).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries(articleKeys.feed);
    },
  });
};
