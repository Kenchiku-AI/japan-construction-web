import axios, { AxiosResponse } from "axios";

import { LoginRequest, SignupRequest, CurrentUser } from "../../../types";
import { baseUrl } from "../../constants";
import { useAuthContext } from "../../context/auth/AuthContext";
import { UnauthorizedError, UnknownError } from "./errors";

export const http = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Client-Type": "web",
  },
});

export const useApi = () => {
  const { logout } = useAuthContext();

  const call = <T>(callback: () => Promise<AxiosResponse<T>>) => {
    try {
      return handleResponse(callback());
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        refresh(callback);
      } else {
        throw err;
      }
    }
  };

  const handleResponse = async <T>(
    query: Promise<AxiosResponse<T>>,
  ): Promise<T> => {
    const { data, status } = await query;

    handleError(status);

    return data;
  };

  const handleError = (status: number) => {
    if (status >= 200 || status < 300) return;

    switch (status) {
      case 400:
        throw new Error("Bad request");
      case 401:
        throw new UnauthorizedError();
      case 403:
        throw new Error("Forbidden");
      case 404:
        throw new Error("Not found");
      case 500:
        throw new Error("Server error");
      default:
        throw new UnknownError();
    }
  };

  const refresh = async <T>(callback: () => Promise<T>) => {
    try {
      const { status } = await http.post("auth/refresh");

      handleError(status);

      await callback();
    } catch (err) {
      logout();
    }
  };

  return {
    async login(request: LoginRequest) {
      const url = `${baseUrl}/auth/login`;
      return handleResponse(http.post(url, request));
    },
    async signup(request: SignupRequest) {
      const url = `${baseUrl}/auth/signup`;
      return handleResponse(http.post(url, request));
    },
    async getCurrentUser() {
      const url = `${baseUrl}/users/me`;
      return call(() => http.get<CurrentUser>(url));
    },
  };
};

export type ApiService = ReturnType<typeof useApi>;
