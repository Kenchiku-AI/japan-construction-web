"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportTemplate } from "./useReportTemplate";
import { ReportField, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";

interface ReportTemplateDashboardProps {
  reportTemplateId: string;
}

const ReportDashboard: FC<ReportTemplateDashboardProps> = ({
  reportTemplateId,
}) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { reportTemplate } = useReportTemplate(reportTemplateId);
  const searchParams = useSearchParams();
  const [hasChanged, setHasChanged] = useState(false);

  if (currentUser?.role == UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={report?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("report_template")}
        placeholder={t("report_template_name")}
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
          label={t("update_report_template")}
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
        showLabel
      />
    </div>
  );
};

export default ReportDashboard;
