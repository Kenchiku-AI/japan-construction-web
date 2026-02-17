"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import {
  ReportTemplate,
  ReportTemplateRequest,
  ShareReportTemplateRequest,
} from "@/types/reports";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";

export const useReportTemplate = (reportTemplateId: string) => {
  const [loading, setLoading] = useState(false);
  const [reportTemplate, setReportTemplate] = useState<ReportTemplate>();
  const router = useRouter();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const api = useApi();

  useEffect(() => {
    getReportTemplate(reportTemplateId);
  }, [reportTemplateId]);

  const getReportTemplate = useCallback(
    async (reportTemplateId: string) => {
      setLoading(true);

      try {
        const response = await api.getReportTemplate(reportTemplateId);
        setReportTemplate(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_report_template_error_description"),
        });

        router.replace("/");
      }

      setLoading(false);
    },
    [setReportTemplate],
  );

  const updateReportTemplate = useCallback(
    async (request: ReportTemplateRequest, silent: boolean = false) => {
      if (!silent) {
        setLoading(true);
      }

      try {
        const response = await api.updateReportTemplate(
          reportTemplateId,
          request,
        );
        setReportTemplate(response);

        if (!silent) {
          showModal({
            title: t("report_template_updated"),
            subtitle: t("report_template_updated_description"),
          });
        }
      } catch (err) {
        if (!silent) {
          showModal({
            title: t("error"),
            subtitle: t("update_report_template_error_description"),
          });
        }
      }

      setLoading(false);
    },
    [setReportTemplate, reportTemplateId],
  );

  const shareReportTemplate = useCallback(
    async (request: ShareReportTemplateRequest) => {
      setLoading(true);

      try {
        await api.shareReportTemplate(request);
        showModal({
          title: t("report_template_shared"),
          subtitle: t("report_template_shared_description"),
        });
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("share_report_template_error_description"),
        });
      }

      setLoading(false);
    },
    [setReportTemplate],
  );

  return {
    loading,
    reportTemplate,
    updateReportTemplate,
    shareReportTemplate,
  };
};
