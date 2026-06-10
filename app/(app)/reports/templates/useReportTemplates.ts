"use client";

import { useCallback, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import {
  ReportTemplateRequest,
  ReportTemplate,
  ReportParentType,
} from "@/types/reports";
import { useTranslation } from "react-i18next";

export const useReportTemplates = () => {
  const [loading, setLoading] = useState(false);
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>();
  const { currentUser, ...api } = useApi();
  const { t } = useTranslation();

  const getReportTemplates = useCallback(
    async (companyId?: string) => {
      setLoading(true);

      try {
        const response = await api.getReportTemplates(companyId);
        setReportTemplates(response ?? []);
      } finally {
        setLoading(false);
      }
    },
    [setReportTemplates],
  );

  const createReportTemplate = useCallback(
    async (request: ReportTemplateRequest) => {
      setLoading(true);

      try {
        await api.createReportTemplate(request);
        await getReportTemplates();
      } finally {
        setLoading(false);
      }
    },
    [getReportTemplates],
  );

  const parentTypeOptions = useMemo(
    () => [
      { label: t("project"), value: ReportParentType.Project },
      { label: t("company"), value: ReportParentType.Company },
    ],
    [t],
  );

  return {
    loading,
    reportTemplates,
    getReportTemplates,
    createReportTemplate,
    parentTypeOptions,
  };
};
