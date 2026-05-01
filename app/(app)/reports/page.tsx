"use client";

import { useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportModal from "./CreateReportModal";
import { useReports } from "./useReports";
import { useReportTemplates } from "./templates/useReportTemplates";
import { Plus } from "@/app/ui/Icons";
import ReportsList from "./ReportsList";
import Divider from "@/app/ui/Divider";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { reports, createReport, loading } = useReports();
  const { reportTemplates } = useReportTemplates();
  const [showCreateReport, setShowCreateReport] = useState(false);

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("reports")} />
        {!!reportTemplates?.length && (
          <Button
            variant="tertiary"
            style={{ height: "auto" }}
            label={t("create_report")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowCreateReport(true);
            }}
          />
        )}
      </div>
      <Divider />
      <ReportsList
        reports={reports ?? []}
        isEmpty={!loading && reports?.length === 0}
        needsTemplates={reportTemplates?.length === 0}
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
