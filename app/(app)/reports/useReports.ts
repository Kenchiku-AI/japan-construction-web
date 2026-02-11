"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import {
  CreateReportRequest,
  CreateReportTemplateRequest,
  Report,
  ReportTemplate,
} from "@/types/reports";
import { UserRole } from "@/types";

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>();
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>();
  const { currentUser, ...api } = useApi();

  useEffect(() => {
    if (!currentUser) return;

    getReports();

    const roles = [UserRole.Manager, UserRole.Admin];
    if (roles.includes(currentUser.role)) {
      getReportTemplates();
    }
  }, [currentUser]);

  const getReports = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getReports();
      setReports(response);
    } finally {
      setLoading(false);
    }
  }, [setReports]);

  const createReport = useCallback(
    async (request: CreateReportRequest) => {
      setLoading(true);

      try {
        await api.createReport(request);
        await getReports();
      } finally {
        setLoading(false);
      }
    },
    [getReports],
  );

  const getReportTemplates = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getReportTemplates();
      setReportTemplates(response);
    } finally {
      setLoading(false);
    }
  }, [setReportTemplates]);

  const createReportTemplate = useCallback(
    async (request: CreateReportTemplateRequest) => {
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

  return {
    loading,
    reports,
    createReport,
    reportTemplates,
    createReportTemplate,
  };
};
