"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportModal from "./CreateReportModal";
import CreateReportTemplateModal from "./CreateReportTemplateModal";
import { useReports } from "./useReports";
import { Plus } from "@/app/ui/Icons";
import ReportsList from "./ReportsList";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import Divider from "@/app/ui/Divider";
import ReportTemplatesList from "./ReportTemplatesList";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { reports, createReport, reportTemplates, createReportTemplate } =
    useReports();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [showCreateReportTemplate, setShowCreateReportTemplate] =
    useState(false);

  const canEdit = useMemo(() => {
    if (!currentUser) return false;

    const roles = [UserRole.Admin, UserRole.Manager];
    return roles.includes(currentUser.role);
  }, [currentUser]);

  return (
    <>
      <Heading title={t("reports")} />
      <div className="flex justify-between mt-8">
        <div className="text-2xl self-end">{t("recent_reports")}</div>
        {currentUser?.role == UserRole.Manager && (
          <Button
            variant="secondary"
            label={t("create_project")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowCreateReport(true);
            }}
            style={{ height: 40 }}
          />
        )}
      </div>
      <Divider />
      <ReportsList reports={reports ?? []} isCollapsible />
      <CreateReportModal
        templates={reportTemplates ?? []}
        isOpen={showCreateReport}
        onClose={() => {
          setShowCreateReport(false);
        }}
        onSubmit={(request) => {
          setShowCreateReport(false);
          createReport(request);
        }}
      />

      {canEdit && (
        <>
          <div className="flex justify-between mt-8">
            <div className="text-2xl self-end">{t("templates")}</div>
            <Button
              variant="secondary"
              label={t("create_template")}
              iconLeft={() => <Plus />}
              onClick={() => {
                setShowCreateReportTemplate(true);
              }}
              style={{ height: 40 }}
            />
          </div>
          <Divider />
          <ReportTemplatesList
            templates={reportTemplates ?? []}
            isCollapsible
          />
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
      )}
    </>
  );
};

export default ReportsPage;
