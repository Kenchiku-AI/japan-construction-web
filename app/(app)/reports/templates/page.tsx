"use client";

import { useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportTemplateModal from "../CreateReportTemplateModal";
import { useReports } from "../useReports";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import ReportTemplatesList from "../ReportTemplatesList";
import { redirect } from "next/navigation";

const ReportTemplatesPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { reportTemplates, createReportTemplate } = useReports();
  const [showCreateReportTemplate, setShowCreateReportTemplate] =
    useState(false);

  if (currentUser?.role === UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between">
        <Heading title={t("report_templates")} />
        <Button
          variant="secondary"
          label={t("create_template")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateReportTemplate(true);
          }}
        />
      </div>
      <ReportTemplatesList templates={reportTemplates ?? []} />
      <CreateReportTemplateModal
        isOpen={showCreateReportTemplate}
        onClose={() => {
          setShowCreateReportTemplate(false);
        }}
        onSubmit={(request) => {
          setShowCreateReportTemplate(false);
          createReportTemplate({
            ...request,
            company_id: currentUser?.company?.id,
          });
        }}
      />
    </>
  );
};

export default ReportTemplatesPage;
