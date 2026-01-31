import axios, { AxiosError, AxiosResponse } from "axios";

import { LoginRequest, SignupRequest, CurrentUser } from "../../types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Client-Type": "web",
  },
});

export const useApiData = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();
      setCurrentUser(response);
    } catch {}
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setCurrentUser(undefined);
      router.push("/login");
    }
  };

  const call = async <T>(callback: () => Promise<AxiosResponse<T>>) => {
    try {
      return await handleResponse(callback);
    } catch (err) {
      if ((err as AxiosError).status === 401) {
        refresh(callback);
      } else {
        throw err;
      }
    }
  };

  const handleResponse = async <T>(
    query: () => Promise<AxiosResponse<T>>,
  ): Promise<T> => {
    const { data } = await query();
    return data;
  };

  const refresh = async <T>(callback: () => Promise<T>) => {
    try {
      await http.post("/auth/refresh");

      await callback();
    } catch (err) {
      await logout();
    }
  };

  const api = {
    async login(request: LoginRequest) {
      const url = "/auth/login";
      return handleResponse(() => http.post<CurrentUser>(url, request));
    },
    async signup(request: SignupRequest) {
      const url = "/auth/signup";
      return handleResponse(() => http.post(url, request));
    },
    async logout() {
      const url = "/auth/logout";
      return call(() => http.post(url));
    },
    async getCurrentUser() {
      const url = "/users/me";
      return call(() => http.get<CurrentUser>(url));
    },
  };

  return {
    ...api,
    logout,
    currentUser,
    setCurrentUser,
  };
};
