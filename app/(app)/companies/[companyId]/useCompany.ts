"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { Company } from "@/types/companies";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { ReportTemplate, ReportTemplateRequest } from "@/types";

export const useCompany = (companyId: string) => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>();
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser, ...api } = useApi();
  const { showModal } = useModal();

  useEffect(() => {
    getCompany(companyId);

    if (currentUser?.role === "admin") {
      getTemplates(companyId);
    }
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

  const getTemplates = useCallback(
    async (companyId: string) => {
      try {
        const response = await api.getReportTemplates(companyId);
        setTemplates(response ?? []);
      } catch (err) { }
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

  const updateLineChannelSecret = useCallback(
    async (line_channel_secret: string) => {
      let success = true;
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { line_channel_secret });

        if (company && response) {
          setCompany({
            ...company,
            line_channel_secret_last4: response.line_channel_secret_last4,
          });
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description")
        });
        success = false;
      }

      setLoading(false);
      return success;
    },
    [company, companyId],
  );

  const updateBillingPlan = useCallback(
    async (billing_plan_id: string) => {
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { billing_plan_id });

        if (company && response) {
          setCompany({
            ...company,
            billing_plan_id: response.billing_plan_id,
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

  const createTemplate = useCallback(
    async (request: ReportTemplateRequest) => {
      setLoading(true);

      try {
        await api.createReportTemplate(request, companyId);
        await getTemplates(companyId);
      } finally {
        setLoading(false);
      }
    },
    [companyId, getTemplates],
  );

  const removeUser = useCallback(
    async (userId: string) => {
      setLoading(true);

      try {
        await api.removeUser(userId);

        if (userId === currentUser?.id) {
          await api.refreshCurrentUser();
          router.replace("/");
        } else {
          getCompany(companyId);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_user_error_description"),
        });
      }

      setLoading(true);
    },
    [currentUser],
  );

  return {
    loading,
    company,
    createProject,
    updateName,
    updateLineChannelSecret,
    updateBillingPlan,
    templates,
    createTemplate,
    removeUser,
    getCompany,
  };
};
