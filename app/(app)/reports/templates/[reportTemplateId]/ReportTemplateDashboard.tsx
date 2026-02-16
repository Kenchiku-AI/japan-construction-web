"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportTemplate } from "./useReportTemplate";
import {
  ReportField,
  ReportParentType,
  ReportUniqueBy,
  UserRole,
} from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import ReportTemplateFields, {
  ReportTemplateFieldInfo,
} from "../ReportTemplateFields";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Select from "@/app/ui/Select/Select";
import { useReportTemplates } from "../useReportTemplates";

interface ReportTemplateDashboardProps {
  reportTemplateId: string;
}

const ReportDashboard: FC<ReportTemplateDashboardProps> = ({
  reportTemplateId,
}) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { reportTemplate } = useReportTemplate(reportTemplateId);
  const { parentTypeOptions, uniqueByOptions } = useReportTemplates();
  const [fields, setFields] = useState<ReportTemplateFieldInfo[]>([]);
  const fieldsRef = useRef<ReportTemplateFieldInfo[]>([]);
  const [description, setDescription] = useState("");
  const [parentType, setParentType] = useState<ReportParentType>();
  const [uniqueBy, setUniqueBy] = useState<ReportUniqueBy>();
  const searchParams = useSearchParams();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current || !reportTemplate) return;

    setDescription(reportTemplate.description);
    setParentType(reportTemplate.parent_type);
    setUniqueBy(reportTemplate.unique_by);

    const initialFields = reportTemplate.fields.map((f) => ({
      id: f.id,
      name: f.name,
      description: f.description,
      type: f.type,
    }));
    fieldsRef.current = initialFields;
    setFields(initialFields);
  }, [reportTemplate]);

  const isDisabled = useMemo(() => {
    if (!isLoaded) return true;
    if (reportTemplate?.description !== description) return false;
    if (reportTemplate?.parent_type !== parentType) return false;
    if (reportTemplate?.unique_by !== uniqueBy) return false;

    return fields === fieldsRef.current;
  }, [isLoaded, reportTemplate, description, parentType, uniqueBy, fields]);

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
          <div className="my-8 flex flex-col gap-4">
            <TextArea
              placeholder={t("description")}
              value={description}
              onChange={setDescription}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Select placeholder={t("type")} options={parentTypeOptions} />
              <Select placeholder={t("unique_by")} options={uniqueByOptions} />
            </div>
          </div>
          <ReportTemplateFields
            fields={fields}
            onChange={(f) => {
              setFields(f);
            }}
          />
          <div className="mt-8 flex w-full lg:w-1/2">
            <Button
              label={t("update_report_template")}
              onClick={() => {}}
              disabled={isDisabled}
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
      />
    </div>
  );
};

export default ReportDashboard;
