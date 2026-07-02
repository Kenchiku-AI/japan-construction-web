"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportTemplate } from "./useReportTemplate";
import { ReportParentType, ReportTemplateFieldInfo, UserRole } from "@/types";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import ReportTemplateFields from "../ReportTemplateFields";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Select from "@/app/ui/Select/Select";
import { useReportTemplates } from "../useReportTemplates";
import { AddUser } from "@/app/ui/Icons";
import ShareReportTemplateModal from "./ShareReportTemplateModal";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";

interface ReportTemplateDashboardProps {
  reportTemplateId: string;
}

const ReportTemplateDashboard: FC<ReportTemplateDashboardProps> = ({
  reportTemplateId,
}) => {
  const { currentUser } = useApi();
  const { t } = useTranslation();
  const {
    reportTemplate,
    setReportTemplate,
    updateReportTemplate,
    shareReportTemplate,
    loading,
  } = useReportTemplate(reportTemplateId);
  const { parentTypeOptions } = useReportTemplates();
  const [fields, setFields] = useState<ReportTemplateFieldInfo[]>([]);
  const fieldsRef = useRef<ReportTemplateFieldInfo[]>([]);
  const [description, setDescription] = useState("");
  const [parentType, setParentType] = useState<ReportParentType>();
  const [showShare, setShowShare] = useState(false);
  const searchParams = useSearchParams();
  const isLoaded = useRef(false);
  const canShare =
    reportTemplate?.is_global && currentUser?.role === UserRole.Admin;
  const canEdit = true;
  // currentUser?.role === UserRole.Admin || !reportTemplate?.is_global;

  useEffect(() => {
    if (isLoaded.current || !reportTemplate) return;

    isLoaded.current = true;
    setDescription(reportTemplate.description);
    setParentType(reportTemplate.parent_type);

    const initialFields = reportTemplate.fields.map((f, i) => ({
      id: f.id,
      name: f.name,
      description: f.description,
      order: f.order ?? i,
    }));
    fieldsRef.current = initialFields;
    setFields(initialFields);
  }, [reportTemplate]);

  const isUpdateDisabled = useMemo(() => {
    if (!isLoaded.current) return true;

    const missingField = fields.some((f) => !f.name || !f.description);

    if (missingField) return true;

    const fieldsUnchanged =
      fieldsRef.current.length === fields.length &&
      fields.every((f) => {
        const field = fieldsRef.current.find((fr) => fr.name === f.name);

        return (
          field?.name === f.name &&
          field.description === f.description &&
          field.order === f.order
        );
      });

    const isUnchanged =
      reportTemplate?.description === description &&
      reportTemplate?.parent_type === parentType &&
      fieldsUnchanged;

    return isUnchanged;
  }, [isLoaded.current, reportTemplate, description, parentType, fields]);

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
      <Divider />
      {canShare && (
        <>
          <div className="mb-3">
            <Button
              variant="tertiary"
              label={t("share_report_template")}
              iconLeft={() => <AddUser />}
              onClick={() => {
                setShowShare(true);
              }}
              style={{ height: 40 }}
            />
          </div>
          <Divider style={{ background: fontColor2 }} />
        </>
      )}
      {!!reportTemplate && (
        <>
          <div className="flex flex-col gap-2">
            <TextArea
              placeholder={t("description")}
              value={
                !isLoaded.current ? reportTemplate.description : description
              }
              onChange={setDescription}
              disabled={!canEdit}
            />
            <Select
              placeholder={t("type")}
              options={parentTypeOptions}
              value={parentType}
              onChange={(pt) => setParentType(pt as ReportParentType)}
              disabled={!canEdit}
            />
          </div>
          <div className="mt-12">
            <ReportTemplateFields
              fields={fields}
              onChange={(f) => {
                setFields(f);
              }}
              disabled={!canEdit}
            />
          </div>
          {canEdit && (
            <div className="mt-8 flex w-full lg:w-1/2">
              <Button
                label={t("update_report_template")}
                onClick={async () => {
                  const request = {
                    description,
                    parent_type: parentType,
                    fields,
                  };

                  const response = await updateReportTemplate(request);

                  if (response) {
                    fieldsRef.current = response.fields;
                    setReportTemplate(response);
                  }
                }}
                disabled={isUpdateDisabled}
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
