"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { Company } from "@/types/companies";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { Project } from "@/types";

export const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const { showModal } = useModal();

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
      setLoading(false);

      showModal({
        title: t("error"),
        subtitle: t("get_projects_error_description"),
      });
    }
  };

  return {
    loading,
    projects,
  };
};
