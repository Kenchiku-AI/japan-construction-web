"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  CreateReportRequest,
  Project,
  UpdateProjectRequest,
  UserRole,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";

export const useProject = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project>();
  const router = useRouter();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const { currentUser, ...api } = useApi();

  useEffect(() => {
    getProject(projectId);
  }, [projectId]);

  const getProject = useCallback(
    async (projectId: string) => {
      setLoading(true);

      try {
        const response = await api.getProject(projectId);
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
    [setProject, currentUser],
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

  const createReport = useCallback(
    async (request: CreateReportRequest) => {
      setLoading(true);

      try {
        const response = await api.createReport(request);

        if (response) {
          router.push(`/reports/${response.id}?name=${response.name}`);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("create_report_error_description"),
        });
      }

      setLoading(false);
    },
    [api],
  );

  return {
    loading,
    project,
    updateProject,
    createReport,
  };
};
