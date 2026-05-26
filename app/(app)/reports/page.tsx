"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportModal from "./CreateReportModal";
import { useReports } from "./useReports";
import { useReportTemplates } from "./templates/useReportTemplates";
import { Close, Plus, Search } from "@/app/ui/Icons";
import ReportsList from "./ReportsList";
import Divider from "@/app/ui/Divider";
import { useApi } from "@/lib/api/ApiContext";
import { ProjectStatus } from "@/types";
import { Loader } from "@/app/ui/Loader";
import { Input } from "@/app/ui/Input/Input";

const ReportsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { reports, setReports, getReports, createReport, search, loading } =
    useReports();
  const { reportTemplates, getReportTemplates } = useReportTemplates();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<any>(null);

  const isCreateEnabled = useMemo(() => {
    if (currentUser?.role === "admin") return false;

    const hasTemplate = !!reportTemplates?.length;
    const hasActiveProject = currentUser?.projects?.some(
      (p) => p.status === ProjectStatus.Active,
    );
    return hasActiveProject && hasTemplate;
  }, [reportTemplates, currentUser]);

  useEffect(() => {
    if (currentUser?.role === "manager") {
      getReportTemplates();
    }
  }, [currentUser]);

  useEffect(() => {
    if (showSearch) {
      setReports([]);
      searchRef.current.value = "";
      searchRef.current.focus();
    }
  }, [showSearch]);

  return (
    <>
      <div style={{ height: 62 }}>
        <div
          className="flex gap-2"
          style={{ paddingTop: 24, display: showSearch ? undefined : "none" }}
        >
          <Input
            ref={searchRef}
            placeholder={t("search_reports")}
            onChange={(t) => {
              search(t);
            }}
            style={{ height: 40 }}
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
          <Heading title={t("reports")} />
          <div className="flex gap-8">
            <Button
              variant="tertiary"
              style={{ height: "auto" }}
              label={t("search")}
              iconLeft={() => <Search />}
              onClick={() => {
                setShowSearch(true);
              }}
            />
            {isCreateEnabled && (
              <Button
                variant="tertiary"
                style={{ height: "auto" }}
                label={t("create")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowCreateReport(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Divider />
      <ReportsList
        reports={reports ?? []}
        isEmpty={!loading && reports?.length === 0 && !showSearch}
        needsTemplates={reportTemplates?.length === 0}
        showCompany
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
      {loading && <Loader />}
    </>
  );
};

export default ReportsPage;
