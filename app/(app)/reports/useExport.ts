import { useModal } from "@/lib/modal/ModalContext";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useApi } from "@/lib/api/ApiContext";

export const useExport = () => {
  const { showModal } = useModal();
  const { t } = useTranslation();
  const api = useApi();

  const downloadExcel = useCallback(
    async (
      templateId: string,
      templateName: string,
      projectId?: string,
      projectName?: string,
    ) => {
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
    },
    [api],
  );

  return {
    downloadExcel,
  };
};
