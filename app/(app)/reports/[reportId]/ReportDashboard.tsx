"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "./useReport";
import { ReportField, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";

interface ReportDashboardProps {
  reportId: string;
}

const ReportDashboard: FC<ReportDashboardProps> = ({ reportId }) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { report } = useReport(reportId);
  const searchParams = useSearchParams();
  const [hasChanged, setHasChanged] = useState(false);

  const shouldRedirect =
    currentUser?.company &&
    report?.company_id &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company.id !== report.company_id;

  if (shouldRedirect) {
    redirect("/");
  }

  console.log("report fields", report?.fields);

  return (
    <>
      <Heading
        title={report?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("report")}
        placeholder={t("report_name")}
        onEdit={(t) => {}}
        isEditable
      />
      <div className="flex flex-col mt-12 mb-8 gap-4">
        {report?.fields.map((field) => (
          <ReportFieldRow
            key={field.id}
            field={field}
            onChange={(t) => {
              setHasChanged(true);
            }}
          />
        ))}
      </div>
      <div className="flex">
        <Button
          label={t("update_report")}
          onClick={() => {}}
          style={{ width: "50%" }}
          disabled={!hasChanged}
        />
      </div>
    </>
  );
};

interface ReportFieldRowProps {
  field: ReportField;
  onChange: (value: string) => void;
}

const ReportFieldRow: FC<ReportFieldRowProps> = ({ field, onChange }) => {
  return (
    <div style={{ width: "50%" }}>
      <Input
        placeholder={field.name}
        defaultValue={field.value}
        onChange={(t) => onChange(t)}
      />
    </div>
  );
};

export default ReportDashboard;
