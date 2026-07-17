"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportModal from "./CreateReportModal";
import { useReports } from "./useReports";
import { useReportTemplates } from "./templates/useReportTemplates";
import { Close, Download, Plus, Search } from "@/app/ui/Icons";
import ReportsList from "./ReportsList";
import { useApi } from "@/lib/api/ApiContext";
import { ProjectStatus, UserRole } from "@/types";
import { Loader } from "@/app/ui/Loader";
import { Input } from "@/app/ui/Input/Input";
import DownloadExcelModal from "./DownloadExcelModal";
import { useExport } from "./useExport";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/lib/useIsMobile";
import { useModal } from "@/lib/modal/ModalContext";
import { cardClass } from "@/lib/constants";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || undefined;
  const projectName = searchParams.get("projectName") || undefined;
  const { reports, setReports, getReports, createReport, search, loading } =
    useReports();
  const { downloadExcel } = useExport();
  const { reportTemplates, getReportTemplates } = useReportTemplates();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showDownloadExcel, setShowDownloadExcel] = useState(false);
  const [isExcelDownloading, setIsExcelDownloading] = useState(false);
  const searchRef = useRef<any>(null);
  const { isMobile } = useIsMobile();
  const { showModal } = useModal();
  const hasSearchPadding = isMobile && !projectName;
  const isAdmin = currentUser?.role === UserRole.Admin;
  const isAdminOrManager = isAdmin || currentUser?.role === UserRole.Manager;

  const isCreateEnabled = useMemo(() => {
    if (isAdmin) return false;

    const hasTemplate = !!reportTemplates?.length;
    const hasActiveProject = currentUser?.projects?.some(
      (p) => p.status === ProjectStatus.Active,
    );
    return hasActiveProject && hasTemplate;
  }, [reportTemplates, currentUser]);

  useEffect(() => {
    getReports(projectId);
    getReportTemplates();
  }, []);

  useEffect(() => {
    if (showSearch) {
      setReports([]);
      searchRef.current.value = "";
      searchRef.current.focus();
    }
  }, [showSearch]);

  return (
    <>
      <div
        className="flex gap-2"
        style={{
          paddingTop: hasSearchPadding ? 0 : 24,
          display: showSearch ? undefined : "none",
        }}
      >
        <Input
          ref={searchRef}
          placeholder={t("search_reports")}
          onChange={(t) => {
            search(t, projectId);
          }}
          style={{ height: hasSearchPadding ? 36 : 38 }}
          autoFocus
          hideLabel
        />
        <div
          className="cursor-pointer"
          onClick={() => {
            getReports();
            setShowSearch(false);
          }}
        >
          <Close size={36} />
        </div>
      </div>
      <div
        className="flex justify-between items-end"
        style={{ display: showSearch ? "none" : undefined }}
      >
        <Heading title={t("reports")} topLabel={projectName} />
        <div className="flex gap-5 md:gap-8">
          {!!reports?.length && (
            <>
              <Button
                variant="tertiary"
                style={{ height: "auto" }}
                label={t(isExcelDownloading ? "downloading" : "export")}
                iconLeft={() => <Download />}
                onClick={() => {
                  setShowDownloadExcel(true);
                }}
                disabled={isExcelDownloading}
                iconOnlyMobile
              />
              <Button
                variant="tertiary"
                style={{ height: "auto" }}
                label={t("search")}
                iconLeft={() => <Search />}
                onClick={() => {
                  setShowSearch(true);
                }}
                iconOnlyMobile
              />
            </>
          )}
          {isCreateEnabled && (
            <Button
              variant="tertiary"
              style={{ height: "auto" }}
              label={t("create")}
              iconLeft={() => <Plus />}
              onClick={() => {
                setShowCreateReport(true);
              }}
              iconOnlyMobile
            />
          )}
        </div>
      </div>
      <div className={((!reports?.length && showSearch) || loading) ? "" : cardClass}>
        <ReportsList
          reports={reports ?? []}
          isEmpty={!loading && reports?.length === 0 && !showSearch}
          needsTemplates={reportTemplates?.length === 0 && isAdminOrManager}
          onClickReport={() => {
            setShowLoader(true);
          }}
          showCompany
        />
      </div>
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
      <DownloadExcelModal
        templates={reportTemplates ?? []}
        isOpen={showDownloadExcel}
        onClose={() => {
          setShowDownloadExcel(false);
        }}
        disableProject={!!projectId}
        onSubmit={async (templateId, selectedProjectId) => {
          setShowDownloadExcel(false);

          const template = reportTemplates?.find((t) => t.id === templateId);
          if (!template) return;

          const pId = projectId ?? selectedProjectId;
          let projectName;
          if (pId) {
            projectName = currentUser?.projects.find((p) => p.id === pId)?.name;
          }

          setIsExcelDownloading(true);

          await downloadExcel(templateId, template.name, pId, projectName);

          setIsExcelDownloading(false);
        }}
      />
      {(loading || showLoader) && <Loader />}
    </>
  );
};

export default ReportsPage;
