"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "./useReport";
import { ReportFieldValues, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { errorColor1 } from "@/lib/constants";
import DeleteReportModal from "./DeleteReportModal";
import { Loader } from "@/app/ui/Loader";
import { Plus, Share, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import styles from "./page.module.css";
import { ReportPDF } from "./ReportPDF";
import { pdf } from "@react-pdf/renderer";

interface ReportDashboardProps {
  reportId: string;
}

const ReportDashboard: FC<ReportDashboardProps> = ({ reportId }) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { report, loading, updateReport, deleteReport, updateLoading } =
    useReport(reportId);
  const searchParams = useSearchParams();
  const [fieldValues, setFieldValues] = useState<ReportFieldValues>();
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  useEffect(() => {
    const newValues: ReportFieldValues = {};

    report?.fields.forEach((f) => {
      newValues[f.id] = f.value;
    });

    setFieldValues(newValues);
  }, [report]);

  const isDisabled = useMemo(() => {
    if (!fieldValues || !report) return true;

    const isChanged = report.fields.some((f) => f.value !== fieldValues[f.id]);
    return !isChanged;
  }, [report, fieldValues]);

  const sortedFields = useMemo(
    () => report?.fields.sort((a, b) => a.order - b.order),
    [report?.fields],
  );

  const shouldRedirect =
    currentUser?.company &&
    report?.company_id &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company.id !== report.company_id;

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={report?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("report")}
        placeholder={t("report_name")}
        onEdit={(name) => {
          updateReport({ name }, true);
        }}
        isEditable
      />
      <Divider />
      <div className="flex w-full flex-row justify-between gap-2 lg:gap-8">
        <Button
          variant="tertiary"
          label={t("export")}
          iconLeft={() => <Share />}
          onClick={async () => {
            if (!report || !currentUser?.company) return;

            const blob = await pdf(
              <ReportPDF
                report={report}
                companyName={currentUser.company.name}
              />,
            ).toBlob();

            const fileUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = fileUrl;
            a.download = `${report.name.replace(" ", "_")}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(fileUrl);
          }}
          textStyle={{
            fontWeight: "300",
          }}
        />
        <Button
          variant="tertiary"
          label={t("delete")}
          iconLeft={() => <Trash />}
          onClick={() => {
            setIsDeleteModalShown(true);
          }}
          textStyle={{
            fontWeight: "300",
            color: errorColor1,
          }}
        />
      </div>
      {!!sortedFields && (
        <>
          <div className="flex flex-col w-full gap-2 mt-3 mb-12">
            {sortedFields?.map((field) => (
              <Input
                key={field.id}
                placeholder={field.name}
                defaultValue={field.value}
                onChange={(value) => {
                  setFieldValues((prev) => {
                    const newValues = { ...prev };
                    newValues[field.id] = value;
                    return newValues;
                  });
                }}
              />
            ))}
          </div>
          <div className="mb-12 w-full">
            <div className="flex justify-between items-end">
              <div>{t("photos")}</div>
              <Button
                label={t("upload_photo")}
                iconLeft={() => <Plus />}
                variant="tertiary"
                onClick={() => {}}
                style={{ height: "auto" }}
              />
            </div>
            <Divider />
            <div className={styles.empty}>{t("empty_photos_description")}</div>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Button
              label={t("update_report")}
              onClick={() => {
                updateReport({ field_values: fieldValues });
              }}
              disabled={isDisabled}
              loading={updateLoading}
            />
          </div>
        </>
      )}
      <DeleteReportModal
        isOpen={isDeleteModalShown}
        onClose={() => setIsDeleteModalShown(false)}
        onDelete={() => {
          setIsDeleteModalShown(false);
          deleteReport();
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default ReportDashboard;
