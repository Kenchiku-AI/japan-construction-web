"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportModal from "./CreateReportModal";
import { useReports } from "./useReports";
import { useReportTemplates } from "./templates/useReportTemplates";
import { Plus } from "@/app/ui/Icons";
import ReportsList from "./ReportsList";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { reports, createReport, loading } = useReports();
  const { reportTemplates } = useReportTemplates();
  const [showCreateReport, setShowCreateReport] = useState(false);

  const canEdit = useMemo(() => {
    if (!currentUser) return false;

    const roles = [UserRole.Admin, UserRole.Manager];
    return roles.includes(currentUser.role);
  }, [currentUser]);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <Heading title={t("reports")} />
        <Button
          variant="secondary"
          label={t("create_report")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateReport(true);
          }}
        />
      </div>
      <ReportsList
        reports={reports ?? []}
        isEmpty={!loading && reports?.length === 0}
      />
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
    </>
  );
};

export default ReportsPage;
