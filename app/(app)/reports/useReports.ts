"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { CreateReportRequest, Report } from "@/types/reports";
import { useRouter } from "next/navigation";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>();
  const { currentUser, ...api } = useApi();
  const router = useRouter();
  const { showModal } = useModal();
  const { t } = useTranslation();

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
        const response = await api.createReport(request);

        if (response) {
          router.push(`reports/${response.id}?name=${response.name}`);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("create_report_error_description"),
        });
      }

      setLoading(false);
    },
    [getReports],
  );

  return {
    loading,
    reports,
    createReport,
  };
};
