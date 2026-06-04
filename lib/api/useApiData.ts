import axios, { AxiosError, AxiosResponse } from "axios";

import {
  LoginRequest,
  SignupRequest,
  CurrentUser,
  CreateProjectRequest,
  Project,
  ShareReportTemplateRequest,
  ReportRequest,
  ReportImageTag,
  ReportImageTagRequest,
  UpdateProjectRequest,
  ReportImage,
  ReportImageUpdateRequest,
  AddTagRequest,
  ReportImageTagLink,
  CreateImageResponse,
  ReportImageCreateRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  CreateAdminRequest,
  User,
  UpdateUserRequest,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
  ReportImagePollResponse,
  CompanyGuest,
  InviteGuestRequest,
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  UserRole,
  ProjectStatus,
} from "../../types";
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Company,
  CreateCompanyRequest,
  InviteUserRequest,
  Report,
  CreateReportRequest,
  ReportTemplate,
  ReportTemplateRequest,
} from "@/types";
import { authRoutes } from "../constants";
import { useModal } from "../modal/ModalContext";
import { useTranslation } from "react-i18next";

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
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

    if (!isAuthRoute) {
      refreshCurrentUser();
    }
  }, []);

  const refreshCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();

      const hasActiveProject = response?.projects?.some(
        (p) => p.status === ProjectStatus.Active,
      );

      const shouldLogout =
        !response?.company &&
        response?.role !== UserRole.Admin &&
        !hasActiveProject;

      if (shouldLogout) {
        showModal({
          title: t("no_active_projects"),
          subtitle: t("no_active_projects_description"),
        });

        logout();
        return;
      }

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
    async forgotPassword(request: ForgotPasswordRequest) {
      const url = "/auth/forgot-password";
      return handleResponse(() => http.post(url, request));
    },
    async resetPassword(request: ResetPasswordRequest) {
      const url = "/auth/reset-password";
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
    async getUser(userId: string) {
      const url = `/users/${userId}`;
      return call(() => http.get<User>(url));
    },
    async updateUser(userId: string, request: UpdateUserRequest) {
      const url = `/users/${userId}`;
      return call(() => http.patch<User>(url, request));
    },
    async createAdmin(request: CreateAdminRequest) {
      const url = "/users/create-admin";
      return call(() => http.post(url, request));
    },
    async getCompanies() {
      const url = "/companies";
      return call(() => http.get<Company[]>(url));
    },
    async searchCompanies(query: string) {
      const url = `/companies/search?q=${query}`;
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
    async updateCompany(companyId: string, request: UpdateCompanyRequest) {
      const url = `/companies/${companyId}`;
      return call(() => http.patch<UpdateCompanyResponse>(url, request));
    },
    async getTags(companyId: string) {
      const url = `/companies/${companyId}/tags`;
      return call(() => http.get<ReportImageTag[]>(url));
    },
    async createTag(companyId: string, request: ReportImageTagRequest) {
      const url = `/companies/${companyId}/tags`;
      return call(() => http.post<ReportImageTag>(url, request));
    },
    async updateTag(
      companyId: string,
      tagId: string,
      request: ReportImageTagRequest,
    ) {
      const url = `/companies/${companyId}/tags/${tagId}`;
      return call(() => http.patch<ReportImageTag>(url, request));
    },
    async deleteTag(companyId: string, tagId: string) {
      const url = `/companies/${companyId}/tags/${tagId}`;
      return call(() => http.delete(url));
    },
    async getProjects() {
      const url = `/projects`;
      return call(() => http.get<Project[]>(url));
    },
    async getProject(projectId: string) {
      const url = `/projects/${projectId}`;
      return call(() => http.get<Project>(url));
    },
    async updateProject(projectId: string, request: UpdateProjectRequest) {
      const url = `/projects/${projectId}`;
      return call(() => http.patch<Project>(url, request));
    },
    async createProject(request: CreateProjectRequest) {
      const url = "/projects";
      return call(() => http.post<Project>(url, request));
    },
    async getReports(projectId?: string, query?: string) {
      const p = new URLSearchParams();
      if (projectId) p.append("project_id", projectId);
      if (query) p.append("q", query);

      const params = p.toString();
      const url = `/reports${params ? `?${params}` : ""}`;

      return call(() => http.get<Report[]>(url));
    },
    async getReportsExport(templateId: string, projectId?: string) {
      const url = `/reports/exports/template/${templateId}${projectId ? `?project_id=${projectId}` : ""}`;
      return call(() => http.get<any[]>(url));
    },
    async getReport(reportId: string) {
      const url = `/reports/${reportId}`;
      return call(() => http.get<Report>(url));
    },
    async getReportImages(reportId: string) {
      const url = `/reports/${reportId}/images`;
      return call(() => http.get<ReportImage[]>(url));
    },
    async getImageStatus(reportId: string, imageId: string) {
      const url = `/reports/${reportId}/images/${imageId}/status`;
      return call(() => http.get<ReportImagePollResponse>(url));
    },
    async createReport(request: CreateReportRequest) {
      const url = "/reports";
      return call(() => http.post<Report>(url, request));
    },
    async updateReport(reportId: string, request: ReportRequest) {
      const url = `/reports/${reportId}`;
      return call(() => http.patch<Report>(url, request));
    },
    async createImage(reportId: string, request: ReportImageCreateRequest) {
      const url = `/reports/${reportId}/images`;
      return call(() => http.post<CreateImageResponse>(url, request));
    },
    async updateImage(
      reportId: string,
      imageId: string,
      request: ReportImageUpdateRequest,
    ) {
      const url = `/reports/${reportId}/images/${imageId}`;
      return call(() => http.patch<ReportImage>(url, request));
    },
    async deleteImage(reportId: string, imageId: string) {
      const url = `/reports/${reportId}/images/${imageId}`;
      return call(() => http.delete(url));
    },
    async addTag(reportId: string, imageId: string, request: AddTagRequest) {
      const url = `/reports/${reportId}/images/${imageId}/tags`;
      return call(() => http.post<ReportImageTagLink>(url, request));
    },
    async removeTag(reportId: string, imageId: string, linkId: string) {
      const url = `/reports/${reportId}/images/${imageId}/tags/${linkId}`;
      return call(() => http.delete(url));
    },
    async deleteReport(reportId: string) {
      const url = `/reports/${reportId}`;
      return call(() => http.delete(url));
    },
    async getReportTemplates(companyId?: string) {
      const url = `/reports/templates${companyId ? `?company_id=${companyId}` : ""}`;
      return call(() => http.get<ReportTemplate[]>(url));
    },
    async getReportTemplate(reportTemplateId: string) {
      const url = `/reports/templates/${reportTemplateId}`;
      return call(() => http.get<ReportTemplate>(url));
    },
    async createReportTemplate(
      request: ReportTemplateRequest,
      companyId?: string,
    ) {
      const url = `/reports/templates${companyId ? `?company_id=${companyId}` : ""}`;
      return call(() => http.post<ReportTemplate>(url, request));
    },
    async updateReportTemplate(
      reportTemplateId: string,
      request: ReportTemplateRequest,
    ) {
      const url = `/reports/templates/${reportTemplateId}`;
      return call(() => http.patch<ReportTemplate>(url, request));
    },
    async shareReportTemplate(request: ShareReportTemplateRequest) {
      const url = "/reports/templates/share";
      return call(() => http.post(url, request));
    },
    async inviteUser(request: InviteUserRequest) {
      const url = "/invitations/company";
      return call(() => http.post(url, request));
    },
    async inviteGuest(request: InviteGuestRequest) {
      const url = "/invitations/project-guest";
      return call(() => http.post(url, request));
    },
    async removeGuest(projectId: string, linkId: string) {
      const url = `/projects/${projectId}/guests/${linkId}`;
      return call(() => http.delete(url));
    },
    async getGuests(companyId: string) {
      const url = `/companies/${companyId}/guests`;
      return call(() => http.get<CompanyGuest[]>(url));
    },
    async acceptInvitation(request: AcceptInvitationRequest) {
      const url = "/invitations/accept";
      return call(() => http.post<AcceptInvitationResponse>(url, request));
    },
  };

  return {
    ...api,
    logout,
    currentUser,
    refreshCurrentUser,
    setCurrentUser,
  };
};
