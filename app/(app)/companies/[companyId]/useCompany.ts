"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { Company } from "@/types/companies";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";

export const useCompany = (companyId: string) => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>();
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const { showModal } = useModal();

  useEffect(() => {
    getCompany(companyId);
  }, [companyId]);

  const getCompany = useCallback(
    async (companyId: string) => {
      setLoading(true);

      try {
        const response = await api.getCompany(companyId);
        setCompany(response);
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  const updateName = useCallback(
    async (name: string) => {
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { name });

        if (company && response) {
          setCompany({
            ...company,
            name: response.name,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [company, companyId],
  );

  const createProject = useCallback(
    async (name: string, description?: string) => {
      if (!company) return;

      setLoading(true);

      try {
        const request = { name, description, company_id: company.id };
        const response = await api.createProject(request);

        if (!response) {
          throw Error();
        }

        router.push(`/projects/${response.id}?name=${response.name}`);
      } catch (err) {
        setLoading(false);
        showModal({
          title: t("error"),
          subtitle: t("create_project_error_description"),
        });
      }
    },
    [company],
  );

  return {
    loading,
    company,
    createProject,
    updateName,
  };
};
