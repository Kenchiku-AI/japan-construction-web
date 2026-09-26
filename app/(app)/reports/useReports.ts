"use client";

import { useCallback, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { CreateReportRequest, Report } from "@/types/reports";
import { useRouter } from "next/navigation";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import { useBilling } from "@/lib/useBilling";
import posthog from "posthog-js";

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>();
  const { currentUser, ...api } = useApi();
  const router = useRouter();
  const { showModal } = useModal();
  const { t } = useTranslation();
  const { isBillingError } = useBilling();

  const getReports = useCallback(
    async (projectId?: string) => {
      setLoading(true);

      try {
        const response = await api.getReports(projectId);
        setReports(response);
      } finally {
        setLoading(false);
      }
    },
    [setReports],
  );

  const createReport = useCallback(
    async (request: CreateReportRequest) => {
      setLoading(true);

      try {
        const response = await api.createReport(request);

        if (response) {
          posthog.capture("report_created");
          router.push(`/reports/${response.id}?name=${response.name}`);
        }
      } catch (err) {
        if (!isBillingError(err)) {
          showModal({
            title: t("error"),
            subtitle: t("create_report_error_description"),
          });
        }
      }

      setLoading(false);
    },
    [api],
  );

  const search = useMemo(
    () =>
      debounce(async (query: string, projectId?: string) => {
        if (query.length < 1) {
          setReports([]);
          return;
        }

        try {
          const response = await api.getReports(projectId, query);
          setReports(response ?? []);
        } finally {
        }
      }, 400),
    [getReports],
  );

  return {
    loading,
    reports,
    setReports,
    getReports,
    search,
    createReport,
  };
};
