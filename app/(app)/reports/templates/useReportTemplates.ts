"use client";

import { useCallback, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import {
  ReportTemplateRequest,
  ReportTemplate,
} from "@/types/reports";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";

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

        posthog.capture("report_template_created");

        await getReportTemplates();
      } finally {
        setLoading(false);
      }
    },
    [getReportTemplates],
  );

  return {
    loading,
    reportTemplates,
    getReportTemplates,
    createReportTemplate,
  };
};
