import axios, { AxiosError, AxiosResponse } from "axios";

import {
  LoginRequest,
  SignupRequest,
  CurrentUser,
  CreateProjectRequest,
  Project,
  ShareReportTemplateRequest,
  ReportRequest,
  ImageTag,
  ImageTagRequest,
  UpdateProjectRequest,
  Image,
  ImageUpdateRequest,
  AddTagRequest,
  ImageTagLink,
  CreateImageResponse,
  ImageCreateRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  CreateAdminRequest,
  User,
  UpdateUserRequest,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
  ImagePollResponse,
  CompanyGuest,
  InviteGuestRequest,
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  UserRole,
  SetupIntentResponse,
  CreateCompanyResponse,
  Conversation,
  CreateConversationRequest,
  UpdateConversationRequest,
  ConversationItemTypeRequest,
  ConversationItemType,
  UpdateConversationItemRequest,
  CreateConversationItemRequest,
  ConversationItem,
  ProjectConversationItems,
  AutofillRequest,
  AutofillResponse,
  CompanyUser,
  CustomFieldDefinition,
  CustomFieldDefinitionsResponse,
  CustomObjectDefinition,
  CustomObject,
  CreateCustomFieldDefinitionRequest,
  CreateCustomRelationshipDefinitionRequest,
  CustomRelationshipDefinition,
  SortOrderRequest,
  CreateCustomObjectDefinitionRequest,
  CustomObjectDefinitionDetail,
  UpdateCustomFieldDefinitionRequest,
  CustomObjectsByDefinitionsRequest,
  CustomObjectsByDefinition,
  CreateCustomObjectRequest,
  UpdateCustomObjectRequest,
  UpdateCustomFieldRequest,
  CustomField,
  CustomRelationship,
  UpdateCustomRelationshipRequest,
  CreateCustomFieldRequest,
  FormJob,
  CreateFormJobRequest,
  CreateFormJobResponse,
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
import { authRoutes, publicRoutes } from "../constants";
import { useModal } from "../modal/ModalContext";
import { useTranslation } from "react-i18next";
import { BillingPlan, CreateBillingPlanRequest, UpdateBillingPlanRequest } from "@/types/billingPlans";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Client-Type": "web",
  },
});

let refreshPromise: Promise<void> | null = null;

export const useApiData = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));
    const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));

    if (!isAuthRoute && !isPublicRoute) {
      refreshCurrentUser();
    }
  }, []);

  const refreshCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();

      // if (validateCurrentUser(response)) {
      setCurrentUser(response);
      // }
    } catch { }
  };

  const validateCurrentUser = (user?: CurrentUser) => {
    const shouldLogout =
      !user?.company &&
      user?.role !== UserRole.Admin &&
      !user?.projects?.length;

    if (shouldLogout) {
      if (user) {
        showModal({
          title: t("no_projects"),
          subtitle: t("no_projects_description"),
        });
      }

      logout();
      return false;
    }

    return true;
  };

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setCurrentUser(undefined);

      const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

      if (!isAuthRoute) {
        router.push("/");
      }
    }
  }, [pathname]);

  const call = async <T>(
    callback: () => Promise<AxiosResponse<T>>,
    hasRetried = false,
  ) => {
    try {
      return await handleResponse(callback);
    } catch (err) {
      const axiosErr = err as AxiosError;

      if (
        !hasRetried &&
        (axiosErr.status === 401 || axiosErr.response?.status === 401)
      ) {
        await refreshPromiseIfNeeded();
        return call(callback, true);
      }

      throw err;
    }
  };

  const refreshPromiseIfNeeded = async () => {
    if (!refreshPromise) {
      refreshPromise = http
        .post("/auth/refresh")
        .then(() => { })
        .catch(async (err) => {
          await logout();
          throw err;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;
  };

  const handleResponse = async <T>(
    query: () => Promise<AxiosResponse<T>>,
  ): Promise<T> => {
    const { data } = await query();
    return data;
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
    async signupCompany(request: CreateCompanyRequest) {
      const url = "/companies";
      return handleResponse(() => http.post<CreateCompanyResponse>(url, request));
    },
    async updateCompany(companyId: string, request: UpdateCompanyRequest) {
      const url = `/companies/${companyId}`;
      return call(() => http.patch<UpdateCompanyResponse>(url, request));
    },
    async setupIntent(companyId: string) {
      const url = `/companies/${companyId}/billing/setup-intent`;
      return call(() => http.post<SetupIntentResponse>(url));
    },
    async checkBilling(companyId: string) {
      const url = `/companies/${companyId}/billing/check`;
      return call(() => http.post<SetupIntentResponse>(url));
    },
    async getBillingPlans() {
      const url = "/billing-plans";
      return call(() => http.get<BillingPlan[]>(url));
    },
    async createBillingPlan(request: CreateBillingPlanRequest) {
      const url = "/billing-plans";
      return call(() => http.post(url, request));
    },
    async updateBillingPlan(billingPlanId: string, request: UpdateBillingPlanRequest) {
      const url = `/billing-plans/${billingPlanId}`;
      return call(() => http.patch(url, request));
    },
    async deleteBillingPlan(billingPlanId: string) {
      const url = `/billing-plans/${billingPlanId}`;
      return call(() => http.delete(url));
    },
    async removeUser(userId: string) {
      const url = `/users/${userId}/company`;
      return call(() => http.delete(url));
    },
    async getTags(companyId: string) {
      const url = `/companies/${companyId}/tags`;
      return call(() => http.get<ImageTag[]>(url));
    },
    async createTag(companyId: string, request: ImageTagRequest) {
      const url = `/companies/${companyId}/tags`;
      return call(() => http.post<ImageTag>(url, request));
    },
    async updateTag(
      companyId: string,
      tagId: string,
      request: ImageTagRequest,
    ) {
      const url = `/companies/${companyId}/tags/${tagId}`;
      return call(() => http.patch<ImageTag>(url, request));
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
    async deleteProject(projectId: string) {
      const url = `/projects/${projectId}`;
      return call(() => http.delete(url));
    },
    async getConversationItems(projectId: string, itemTypeId: string) {
      const url = `/conversation-items?project_id=${projectId}&conversation_item_type_id=${itemTypeId}`;
      return call(() => http.get<ProjectConversationItems>(url));
    },
    async createConversationItem(request: CreateConversationItemRequest) {
      const url = "/conversation-items";
      return call(() => http.post<ConversationItem>(url, request));
    },
    async updateConversationItem(conversationItemId: string, request: UpdateConversationItemRequest) {
      const url = `/conversation-items/${conversationItemId}`;
      return call(() => http.patch<ConversationItem>(url, request));
    },
    async deleteConversationItem(conversationItemId: string) {
      const url = `/conversation-items/${conversationItemId}`;
      return call(() => http.delete(url));
    },
    async createConversation(request: CreateConversationRequest) {
      const url = "/conversations";
      return call(() => http.post<Conversation>(url, request));
    },
    async updateConversation(conversationId: string, request: UpdateConversationRequest) {
      const url = `/conversations/${conversationId}`;
      return call(() => http.patch<Conversation>(url, request));
    },
    async deleteConversation(conversationId: string) {
      const url = `/conversations/${conversationId}`;
      return call(() => http.delete(url));
    },
    async getConversationItemTypes(companyId: string) {
      const url = `/companies/${companyId}/conversation-item-types`;
      return call(() => http.get<ConversationItemType[]>(url));
    },
    async createConversationItemType(companyId: string, request: ConversationItemTypeRequest) {
      const url = `/companies/${companyId}/conversation-item-types`;
      return call(() => http.post<ConversationItemType[]>(url, request));
    },
    async updateConversationItemType(companyId: string, itemTypeId: string, request: ConversationItemTypeRequest) {
      const url = `/companies/${companyId}/conversation-item-types/${itemTypeId}`;
      return call(() => http.patch<ConversationItemType[]>(url, request));
    },
    async deleteConversationItemType(companyId: string, itemTypeId: string) {
      const url = `/companies/${companyId}/conversation-item-types/${itemTypeId}`;
      return call(() => http.delete(url));
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
      return call(() => http.get<Image[]>(url));
    },
    async getImageStatus(reportId: string, imageId: string) {
      const url = `/reports/${reportId}/images/${imageId}/status`;
      return call(() => http.get<ImagePollResponse>(url));
    },
    async createReport(request: CreateReportRequest) {
      const url = "/reports";
      return call(() => http.post<Report>(url, request));
    },
    async updateReport(reportId: string, request: ReportRequest) {
      const url = `/reports/${reportId}`;
      return call(() => http.patch<Report>(url, request));
    },
    async autofillReport(reportId: string, request: AutofillRequest) {
      const url = `/reports/${reportId}/line-conversations`;
      return call(() => http.post<AutofillResponse>(url, request));
    },
    async createImage(reportId: string, request: ImageCreateRequest) {
      const url = `/reports/${reportId}/images`;
      return call(() => http.post<CreateImageResponse>(url, request));
    },
    async updateImage(
      reportId: string,
      imageId: string,
      request: ImageUpdateRequest,
    ) {
      const url = `/reports/${reportId}/images/${imageId}`;
      return call(() => http.patch<Image>(url, request));
    },
    async deleteImage(reportId: string, imageId: string) {
      const url = `/reports/${reportId}/images/${imageId}`;
      return call(() => http.delete(url));
    },
    async addTag(reportId: string, imageId: string, request: AddTagRequest) {
      const url = `/reports/${reportId}/images/${imageId}/tags`;
      return call(() => http.post<ImageTagLink>(url, request));
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
    async resendInvite(invitationId: string) {
      const url = `/invitations/${invitationId}/resend`;
      return handleResponse(() => http.post(url));
    },
    async removeGuest(projectId: string, linkId: string) {
      const url = `/projects/${projectId}/guests/${linkId}`;
      return call(() => http.delete(url));
    },
    async getGuests(companyId: string) {
      const url = `/companies/${companyId}/guests`;
      return call(() => http.get<CompanyGuest[]>(url));
    },
    async getUsers(companyId: string) {
      const url = `/companies/${companyId}/users`;
      return call(() => http.get<CompanyUser[]>(url));
    },
    async acceptInvitation(request: AcceptInvitationRequest) {
      const url = "/invitations/accept";
      return call(() => http.post<AcceptInvitationResponse>(url, request));
    },
    async getCustomFieldDefinitions(companyId: string) {
      const url = `/custom-fields/definitions?company_id=${companyId}`;
      return call(() => http.get<CustomFieldDefinitionsResponse>(url));
    },
    async createCustomFieldDefinition(request: CreateCustomFieldDefinitionRequest) {
      const url = `/custom-fields/definitions`;
      return call(() => http.post<CustomFieldDefinition>(url, request));
    },
    async updateCustomFieldDefinition(definitionId: string, request: UpdateCustomFieldDefinitionRequest) {
      const url = `/custom-fields/definitions/${definitionId}`;
      return call(() => http.patch<CustomFieldDefinition>(url, request));
    },
    async updateCustomFieldsSortOrder(request: SortOrderRequest[]) {
      const url = `/custom-fields/definitions/sort-order`;
      return call(() => http.patch<CustomRelationshipDefinition[]>(url, request));
    },
    async deleteCustomFieldDefinition(definitionId: string) {
      const url = `/custom-fields/definitions/${definitionId}`;
      return call(() => http.delete(url));
    },
    async createCustomRelationshipDefinition(request: CreateCustomRelationshipDefinitionRequest) {
      const url = `/custom-relationships/definitions`;
      return call(() => http.post<CustomRelationshipDefinition>(url, request));
    },
    async updateCustomRelationshipDefinition(definitionId: string, request: UpdateCustomFieldDefinitionRequest) {
      const url = `/custom-relationships/definitions/${definitionId}`;
      return call(() => http.patch<CustomRelationshipDefinition>(url, request));
    },
    async updateCustomRelationshipsSortOrder(request: SortOrderRequest[]) {
      const url = `/custom-relationships/definitions/sort-order`;
      return call(() => http.patch<CustomRelationshipDefinition[]>(url, request));
    },
    async deleteCustomRelationshipDefinition(definitionId: string) {
      const url = `/custom-relationships/definitions/${definitionId}`;
      return call(() => http.delete(url));
    },
    async getCustomObjectDefinitions(companyId: string) {
      const url = `/custom-objects/definitions?company_id=${companyId}`;
      return call(() => http.get<CustomObjectDefinition[]>(url));
    },
    async getCustomObjectDefinition(definitionId: string) {
      const url = `/custom-objects/definitions/${definitionId}`;
      return call(() => http.get<CustomObjectDefinitionDetail>(url));
    },
    async createCustomObjectDefinition(request: CreateCustomObjectDefinitionRequest) {
      const url = `/custom-objects/definitions`;
      return call(() => http.post<CustomObjectDefinition>(url, request));
    },
    async updateCustomObjectDefinition(definitionId: string, request: UpdateCustomFieldDefinitionRequest) {
      const url = `/custom-objects/definitions/${definitionId}`;
      return call(() => http.patch<CustomObjectDefinitionDetail>(url, request));
    },
    async getCustomObjects(definitionId: string) {
      const url = `/custom-objects?custom_object_definition_id=${definitionId}`;
      return call(() => http.get<CustomObject[]>(url));
    },
    async getCustomObjectsByDefinition(request: CustomObjectsByDefinitionsRequest) {
      const url = "/custom-objects/by-definitions";
      return call(() => http.post<CustomObjectsByDefinition>(url, request));
    },
    async getCustomObject(objectId: string) {
      const url = `/custom-objects/${objectId}`;
      return call(() => http.get<CustomObject>(url));
    },
    async createCustomObject(request: CreateCustomObjectRequest) {
      const url = `/custom-objects`;
      return call(() => http.post<CustomObject>(url, request));
    },
    async updateCustomObject(objectId: string, request: UpdateCustomObjectRequest) {
      const url = `/custom-objects/${objectId}`;
      return call(() => http.patch<CustomObject>(url, request));
    },
    async deleteCustomObject(objectId: string) {
      const url = `/custom-objects/${objectId}`;
      return call(() => http.delete(url));
    },
    async createProjectCustomField(projectId: string, request: CreateCustomFieldRequest) {
      const url = `/custom-fields/project/${projectId}`;
      return call(() => http.post<CustomField>(url, request));
    },
    async createCompanyCustomField(companyId: string, request: CreateCustomFieldRequest) {
      const url = `/custom-fields/company/${companyId}`;
      return call(() => http.post<CustomField>(url, request));
    },
    async createUserCustomField(userId: string, request: CreateCustomFieldRequest) {
      const url = `/custom-fields/user/${userId}`;
      return call(() => http.post<CustomField>(url, request));
    },
    async updateCustomField(fieldId: string, request: UpdateCustomFieldRequest) {
      const url = `/custom-fields/${fieldId}`;
      return call(() => http.patch<CustomField>(url, request));
    },
    async updateCustomRelationship(definitionId: string, request: UpdateCustomRelationshipRequest) {
      const url = `/custom-relationships?custom_relationship_definition_id=${definitionId}`;
      return call(() => http.patch<CustomRelationship[]>(url, request));
    },
    async getFormJobs(companyId: string) {
      const url = `/form-jobs?company_id=${companyId}`;
      return call(() => http.get<FormJob[]>(url));
    },
    async createFormJob(request: CreateFormJobRequest) {
      const url = "/form-jobs";
      return call(() => http.post<CreateFormJobResponse>(url, request));
    },
    async getFormJob(formJobId: string) {
      const url = `/form-jobs/${formJobId}`;
      return call(() => http.get<FormJob>(url));
    },
    async deleteFormJob(formJobId: string) {
      const url = `/form-jobs/${formJobId}`;
      return call(() => http.delete(url));
    },
  };

  return {
    ...api,
    logout,
    currentUser,
    refreshCurrentUser,
    validateCurrentUser,
    setCurrentUser,
  };
};
