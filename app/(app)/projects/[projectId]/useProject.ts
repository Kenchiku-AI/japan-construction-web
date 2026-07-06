"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  CompanyGuest,
  CreateActionItemRequest,
  CreateReportRequest,
  Project,
  UpdateActionItemRequest,
  UpdateProjectRequest,
  UserRole,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";
import { useBilling } from "@/lib/useBilling";

export const useProject = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project>();
  const [projectGuests, setProjectGuests] = useState<CompanyGuest[]>([]);
  const [nonProjectGuests, setNonProjectGuests] = useState<CompanyGuest[]>([]);
  const router = useRouter();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const { currentUser, ...api } = useApi();
  const { isBillingError } = useBilling();

  useEffect(() => {
    if (!projectId) return;

    getProject(projectId);
  }, [projectId]);

  const getProject = useCallback(
    async (projectId: string, redirectOnError: boolean = true) => {
      setLoading(true);

      try {
        const response = await api.getProject(projectId);
        setProject(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_project_error_description"),
        });

        if (redirectOnError) {
          if (currentUser?.role === UserRole.Admin) {
            router.replace("/projects");
          } else {
            router.replace("/");
          }
        }
      }
      setLoading(false);
    },
    [setProject, currentUser],
  );

  const getCompanyGuests = useCallback(
    async (companyId: string) => {
      try {
        const response = await api.getGuests(companyId);

        const newProjectGuests: CompanyGuest[] = [];
        const newNonProjectGuests: CompanyGuest[] = [];

        response?.forEach((g) => {
          const inProject = g.projects.some((p) => p.project_id === projectId);

          if (inProject) {
            newProjectGuests.push(g);
          } else {
            newNonProjectGuests.push(g);
          }
        });

        setProjectGuests(newProjectGuests);
        setNonProjectGuests(newNonProjectGuests);
      } catch (err) { }
    },
    [projectId],
  );

  const updateProject = useCallback(
    async (request: UpdateProjectRequest) => {
      if (!project) return;

      setLoading(true);

      try {
        const response = await api.updateProject(project.id, request);
        setProject(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_project_error_description"),
        });

        if (currentUser?.role === UserRole.Admin) {
          router.replace("/projects");
        } else {
          router.replace("/");
        }
      }
      setLoading(false);
    },
    [project, api],
  );

  const createActionItem = useCallback(
    async (request: CreateActionItemRequest) => {
      setLoading(true);

      try {
        await api.createActionItem(request);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("create_action_item_error_description"),
        });
      }
    },
    [api],
  );

  const updateActionItem = useCallback(
    async (actionItemId: string, request: UpdateActionItemRequest) => {
      setLoading(true);

      try {
        await api.updateActionItem(actionItemId, request);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("update_action_item_error_description"),
        });
      }
    },
    [api],
  );

  const deleteActionItem = useCallback(
    async (actionItemId: string) => {
      setLoading(true);

      try {
        await api.deleteActionItem(actionItemId);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [api],
  );

  const createReport = useCallback(
    async (request: CreateReportRequest) => {
      setLoading(true);

      try {
        const response = await api.createReport(request);

        if (response) {
          router.push(`/reports/${response.id}?name=${response.name}`);
        }
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("create_report_error_description"),
        });
      }
    },
    [api],
  );

  const inviteGuest = useCallback(
    async (email: string, firstName?: string, lastName?: string) => {
      setLoading(true);

      try {
        const request = {
          email,
          project_id: projectId,
          first_name: firstName,
          last_name: lastName,
        };
        await api.inviteGuest(request);

        if (project?.company_id) {
          getCompanyGuests(project.company_id);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("invitation_send_error_description"),
        });
      }

      setLoading(false);
    },
    [projectId, project?.company_id],
  );

  const removeGuest = useCallback(
    async (guest: CompanyGuest) => {
      setLoading(true);

      try {
        const guestProject = guest.projects.find((p) => projectId);
        if (!guestProject) return;

        await api.removeGuest(projectId, guestProject.guest_link_id);

        if (guest.id === currentUser?.id) {
          const isLast = !currentUser.company && guest.projects.length <= 1;

          await api.refreshCurrentUser();

          if (!isLast) {
            router.replace("/");
          }
        } else if (project?.company_id) {
          getCompanyGuests(project.company_id);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_user_error_description"),
        });
      }

      setLoading(true);
    },
    [projectId, project?.company_id],
  );

  const statusOptions = [
    { label: t("active"), value: "active" },
    { label: t("completed"), value: "completed" },
  ];

  return {
    loading,
    project,
    updateProject,
    createReport,
    statusOptions,
    projectGuests,
    nonProjectGuests,
    getCompanyGuests,
    inviteGuest,
    removeGuest,
    createActionItem,
    updateActionItem,
    deleteActionItem
  };
};
