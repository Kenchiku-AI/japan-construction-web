"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { CreateReportRequest, Report, ReportTemplate } from "@/types/reports";
import { UserRole } from "@/types";

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>();
  const { currentUser, ...api } = useApi();

  useEffect(() => {
    if (!currentUser) return;

    getReports();
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

  return {
    loading,
    reports,
    createReport,
  };
};
