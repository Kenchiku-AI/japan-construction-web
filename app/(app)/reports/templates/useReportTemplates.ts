"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import {
  ReportTemplateRequest,
  ReportTemplate,
  ReportParentType,
} from "@/types/reports";
import { UserRole } from "@/types";
import { useTranslation } from "react-i18next";

export const useReportTemplates = () => {
  const [loading, setLoading] = useState(false);
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>();
  const { currentUser, ...api } = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentUser) return;

    const roles = [UserRole.Manager, UserRole.Admin];
    if (roles.includes(currentUser.role)) {
      getReportTemplates();
    }
  }, [currentUser]);

  const getReportTemplates = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getReportTemplates();
      setReportTemplates(response ?? []);
    } finally {
      setLoading(false);
    }
  }, [setReportTemplates]);

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
    createReportTemplate,
    parentTypeOptions,
  };
};
