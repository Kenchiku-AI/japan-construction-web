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
      {!!sortedFields && (
        <>
          <div className="flex flex-col w-full lg:w-3/4 gap-4 my-8">
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
          <div className="w-full lg:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Button
              label={t("update_report")}
              onClick={() => {
                updateReport({ field_values: fieldValues });
              }}
              disabled={isDisabled}
              loading={updateLoading}
            />
            <Button
              variant="secondary"
              label={t("delete_report")}
              onClick={() => {
                setIsDeleteModalShown(true);
              }}
              style={{
                height: 60,
                borderColor: errorColor1,
              }}
              textStyle={{
                color: errorColor1,
              }}
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
