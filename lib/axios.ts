import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = api
          .post("/auth/refresh")
          .then(() => {
            isRefreshing = false;
          })
          .catch(() => {
            isRefreshing = false;
            window.location.href = "/login";
          });
      }

      await refreshPromise;
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);
