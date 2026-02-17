"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportTemplate } from "./useReportTemplate";
import { ReportParentType, ReportUniqueBy, UserRole } from "@/types";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import ReportTemplateFields, {
  ReportTemplateFieldInfo,
} from "../ReportTemplateFields";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Select from "@/app/ui/Select/Select";
import { useReportTemplates } from "../useReportTemplates";
import { Plus } from "@/app/ui/Icons";
import ShareReportTemplateModal from "./ShareReportTemplateModal";

interface ReportTemplateDashboardProps {
  reportTemplateId: string;
}

const ReportTemplateDashboard: FC<ReportTemplateDashboardProps> = ({
  reportTemplateId,
}) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const { reportTemplate, updateReportTemplate, shareReportTemplate, loading } =
    useReportTemplate(reportTemplateId);
  const { parentTypeOptions, uniqueByOptions } = useReportTemplates();
  const [fields, setFields] = useState<ReportTemplateFieldInfo[]>([]);
  const fieldsRef = useRef<ReportTemplateFieldInfo[]>([]);
  const [description, setDescription] = useState("");
  const [parentType, setParentType] = useState<ReportParentType>();
  const [uniqueBy, setUniqueBy] = useState<ReportUniqueBy>();
  const [showShare, setShowShare] = useState(false);
  const searchParams = useSearchParams();
  const isLoaded = useRef(false);
  const canShare =
    reportTemplate?.is_global && currentUser?.role === UserRole.Admin;
  const canEdit =
    currentUser?.role === UserRole.Admin || !reportTemplate?.is_global;

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

    const missingField = fields.some(
      (f) => !f.name || !f.description || !f.type,
    );

    if (missingField) return true;

    const isUnchanged =
      reportTemplate?.description === description &&
      reportTemplate?.parent_type === parentType &&
      reportTemplate?.unique_by === uniqueBy &&
      fields === fieldsRef.current;

    return isUnchanged;
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
        onEdit={(name) => {
          updateReportTemplate({ name }, true);
        }}
        isEditable={!!reportTemplate && canEdit}
      />
      {canShare && (
        <div className="my-4 flex justify-end">
          <Button
            variant="secondary"
            label={t("share_report_template")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowShare(true);
            }}
            style={{ height: 40 }}
          />
        </div>
      )}
      {!!reportTemplate && (
        <>
          <div className={`${canShare ? "mb-8" : "my-8"} flex flex-col gap-4`}>
            <TextArea
              placeholder={t("description")}
              value={description}
              onChange={setDescription}
              disabled={!canEdit}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Select
                placeholder={t("type")}
                options={parentTypeOptions}
                onChange={(pt) => setParentType(pt as ReportParentType)}
                disabled={!canEdit}
              />
              <Select
                placeholder={t("unique_by")}
                options={uniqueByOptions}
                onChange={(ub) => setUniqueBy(ub as ReportUniqueBy)}
                disabled={!canEdit}
              />
            </div>
          </div>
          <ReportTemplateFields
            fields={fields}
            onChange={(f) => {
              setFields(f);
            }}
            disabled={!canEdit}
          />
          {canEdit && (
            <div className="mt-8 flex w-full lg:w-1/2">
              <Button
                label={t("update_report_template")}
                onClick={async () => {
                  const request = {
                    description,
                    parent_type: parentType,
                    unique_by: uniqueBy,
                    fields,
                  };
                  updateReportTemplate(request);
                }}
                disabled={isDisabled}
                loading={loading}
              />
            </div>
          )}
        </>
      )}
      {showShare && (
        <ShareReportTemplateModal
          isOpen={showShare}
          onClose={() => {
            setShowShare(false);
          }}
          onShare={async (companyId) => {
            setShowShare(false);
            shareReportTemplate({
              company_id: companyId,
              template_id: reportTemplateId,
            });
          }}
        />
      )}
    </>
  );
};

export default ReportTemplateDashboard;
