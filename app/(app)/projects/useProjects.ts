"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { Project } from "@/types";

export const useProjects = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { t } = useTranslation();
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
      showModal({
        title: t("error"),
        subtitle: t("get_projects_error_description"),
      });
    }

    setLoading(false);
    setLoaded(true);
  };

  return {
    loading,
    setLoading,
    loaded,
    projects,
  };
};
