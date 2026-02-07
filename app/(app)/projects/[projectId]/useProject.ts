"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Project, UserRole } from "@/types";
import { useModal } from "@/lib/modal/ModalContext";

export const useProject = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project>();
  const [error, setError] = useState("");
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

  return {
    loading,
    project,
    error,
  };
};
