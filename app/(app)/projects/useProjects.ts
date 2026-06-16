"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { useBilling } from "@/lib/useBilling";

export const useProjects = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { t } = useTranslation();
  const api = useApi();
  const { showModal } = useModal();
  const { isBillingError } = useBilling();
  const router = useRouter();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setLoading(true);

    try {
      const response = await api.getProjects();

      if (!response) {
        throw Error();
      }

      setProjects(response);
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("get_projects_error_description"),
      });
    }

    setLoading(false);
    setLoaded(true);
  };

  const createProject = async (
    name: string,
    description?: string,
    companyId?: string,
  ) => {
    if (!companyId) return;

    setLoading(true);

    try {
      const request = { name, description, company_id: companyId };
      const response = await api.createProject(request);

      if (!response) {
        throw Error();
      }

      router.push(`/projects/${response.id}?name=${response.name}`);
    } catch (err) {
      setLoading(false);

      if (isBillingError(err)) {
        return;
      }

      showModal({
        title: t("error"),
        subtitle: t("create_project_error_description"),
      });
    }
  };

  return {
    loading,
    setLoading,
    loaded,
    projects,
    createProject,
  };
};
