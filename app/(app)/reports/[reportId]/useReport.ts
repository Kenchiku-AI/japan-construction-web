"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { Report, ReportImage, ReportRequest } from "@/types/reports";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";

export const useReport = (reportId: string) => {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [report, setReport] = useState<Report>();
  const [images, setImages] = useState<ReportImage[]>();
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const { showModal } = useModal();

  useEffect(() => {
    getReport(reportId);
    getImages(reportId);
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
    [api, reportId, setReport],
  );

  const getImages = useCallback(
    async (reportId: string) => {
      setLoading(true);

      try {
        const response = await api.getReportImages(reportId);
        setImages(response);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    },
    [api, reportId, setImages],
  );

  const updateReport = useCallback(
    async (request: ReportRequest, silent: boolean = false) => {
      if (!silent) {
        setUpdateLoading(true);
      }

      try {
        const response = await api.updateReport(reportId, request);
        setReport(response);
      } catch (err) {
        if (!silent) {
          showModal({
            title: t("error"),
            subtitle: t("update_report_error_description"),
          });
        }
      }

      setUpdateLoading(false);
    },
    [setReport, reportId],
  );

  const deleteReport = useCallback(async () => {
    setLoading(true);

    try {
      await api.deleteReport(reportId);
      router.replace("/reports");
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("delete_report_error"),
      });
    }

    setLoading(false);
  }, [reportId]);

  return {
    loading,
    updateLoading,
    report,
    images,
    updateReport,
    deleteReport,
  };
};
