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

interface ReportDashboardProps {
  reportId: string;
}

const ReportDashboard: FC<ReportDashboardProps> = ({ reportId }) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { report, updateReport, loading } = useReport(reportId);
  const searchParams = useSearchParams();
  const [fieldValues, setFieldValues] = useState<ReportFieldValues>();

  useEffect(() => {
    const newValues: ReportFieldValues = {};

    report?.fields.forEach((f) => {
      newValues[f.id] = f.value;
    });

    setFieldValues(newValues);
  }, [report]);

  const isDisabled = useMemo(() => {
    if (!fieldValues || !report) return true;

    const missingField = report.fields.some((f) => !fieldValues[f.id]);
    if (missingField) return true;

    const isChanged = report.fields.some((f) => f.value !== fieldValues[f.id]);
    return !isChanged;
  }, [report, fieldValues]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
        {report?.fields.map((field) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Button
          label={t("update_report")}
          onClick={() => {
            updateReport({ field_values: fieldValues });
          }}
          disabled={isDisabled}
          loading={loading}
        />
      </div>
    </>
  );
};

export default ReportDashboard;
