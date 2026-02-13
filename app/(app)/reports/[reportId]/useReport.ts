"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { Report } from "@/types/reports";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";

export const useReport = (reportId: string) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report>();
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const { showModal } = useModal();

  useEffect(() => {
    getReport(reportId);
  }, [reportId]);

  const getReport = useCallback(
    async (reportId: string) => {
      setLoading(true);

      try {
        const response = await api.getReport(reportId);
        setReport(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_report_error_description"),
        });

        router.replace("/");
      }

      setLoading(false);
    },
    [setReport],
  );

  return {
    loading,
    report,
  };
};
