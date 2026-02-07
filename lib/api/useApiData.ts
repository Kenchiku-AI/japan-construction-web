import axios, { AxiosError, AxiosResponse } from "axios";

import {
  LoginRequest,
  SignupRequest,
  CurrentUser,
  CreateProjectRequest,
  Project,
} from "../../types";
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Company,
  CreateCompanyRequest,
  InviteUserRequest,
} from "@/types/companies";
import { authRoutes } from "../constants";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Client-Type": "web",
  },
});

export const useApiData = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setCurrentUser(undefined);

      const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

      if (!isAuthRoute) {
        router.push("/login");
      }
    }
  }, [pathname]);

  const call = async <T>(callback: () => Promise<AxiosResponse<T>>) => {
    try {
      return await handleResponse(callback);
    } catch (err) {
      if ((err as AxiosError).status === 401) {
        return await refresh(callback);
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

  const refresh = async <T>(callback: () => Promise<AxiosResponse<T>>) => {
    try {
      await http.post("/auth/refresh");
      return await handleResponse(callback);
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
    async getCompanies() {
      const url = "/companies";
      return call(() => http.get<Company[]>(url));
    },
    async getCompany(companyId: string) {
      const url = `/companies/${companyId}`;
      return call(() => http.get<Company>(url));
    },
    async createCompany(request: CreateCompanyRequest) {
      const url = "/companies";
      return call(() => http.post(url, request));
    },
    async getProject(projectId: string) {
      const url = `/projects/${projectId}`;
      return call(() => http.get<Project>(url));
    },
    async createProject(request: CreateProjectRequest) {
      const url = "/projects";
      return call(() => http.post<Project>(url, request));
    },
    async inviteUser(request: InviteUserRequest) {
      const url = "/invitations";
      return call(() => http.post(url, request));
    },
    async acceptInvitation(token: string) {
      const url = `/invitations/accept/${token}`;
      return call(() => http.post(url));
    },
  };

  return {
    ...api,
    logout,
    currentUser,
    setCurrentUser,
  };
};
