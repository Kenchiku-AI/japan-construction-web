"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportTemplate } from "./useReportTemplate";
import { ReportField, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import ReportTemplateFields, {
  ReportTemplateFieldInfo,
} from "../../ReportTemplateFields";

interface ReportTemplateDashboardProps {
  reportTemplateId: string;
}

const ReportDashboard: FC<ReportTemplateDashboardProps> = ({
  reportTemplateId,
}) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { reportTemplate } = useReportTemplate(reportTemplateId);
  const [fields, setFields] = useState<ReportTemplateFieldInfo[]>([]);
  const searchParams = useSearchParams();
  const [hasChanged, setHasChanged] = useState(false);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current || !reportTemplate) return;

    const newFields = reportTemplate.fields.map((f) => ({
      name: f.name,
      description: f.description,
      type: f.type,
    }));
    setFields(newFields);
  }, [reportTemplate]);

  if (currentUser?.role == UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={reportTemplate?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("report_template")}
        placeholder={t("report_template_name")}
        onEdit={(t) => {}}
        isEditable={!!reportTemplate}
      />
      {!!reportTemplate && (
        <>
          <ReportTemplateFields
            fields={fields}
            onChange={(f) => setFields(f)}
          />
          <div className="flex w-full lg:w-1/2 mt-8">
            <Button
              label={t("update_report_template")}
              onClick={() => {}}
              disabled={!hasChanged}
            />
          </div>
        </>
      )}
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
