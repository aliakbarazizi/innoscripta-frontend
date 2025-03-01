import axios from "axios";

export const apiUrl = import.meta.env.VITE_API_URL + "/api";

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.defaults.withXSRFToken = true;

export function shouldRetryOnError(failureCount: number, error: unknown) {
  if (failureCount >= 2) {
    return false;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 0;
    return status < 400 || status >= 500;
  }

  return true;
}
