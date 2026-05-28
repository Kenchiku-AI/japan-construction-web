"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { CreateReportRequest, Report } from "@/types/reports";
import { useRouter } from "next/navigation";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

  const getReports = useCallback(
    async (query?: string) => {
      setLoading(true);

      try {
        const response = await api.getReports();
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
          router.push(`/reports/${response.id}?name=${response.name}`);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("create_report_error_description"),
        });
      }

      setLoading(false);
    },
    [api],
  );

  const downloadExcel = useCallback(
    async (
      templateId: string,
      templateName: string,
      projectId?: string,
      projectName?: string,
    ) => {
      setLoading(true);

      try {
        const rows = await api.getReportsExport(templateId, projectId);

        if (!rows) {
          throw new Error();
        } else if (rows.length === 0) {
          showModal({
            title: t("error"),
            subtitle: t("download_excel_no_reports_error"),
          });
        } else {
          const worksheet = XLSX.utils.json_to_sheet(rows);

          worksheet["!cols"] = Object.keys(rows[0]).map((key) => ({
            wch: Math.max(key.length, 20),
          }));

          const workbook = XLSX.utils.book_new();

          let name = templateName;
          if (projectName) name = `${templateName} - ${projectName}`;

          XLSX.utils.book_append_sheet(workbook, worksheet, name);

          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });

          const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          saveAs(blob, `${name.replace(/ /g, "_").replace(/[()]/g, "")}.xlsx`);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("download_excel_error_description"),
        });
      }

      setLoading(false);
    },
    [api],
  );

  const search = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length < 1) {
          setReports([]);
          return;
        }

        try {
          const response = await api.getReports(query);
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
    downloadExcel,
  };
};
