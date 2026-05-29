"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { useSearchParams } from "next/navigation";
import { useProject } from "./useProject";
import { Check, Close, Download, Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import CreateReportModal from "../../reports/CreateReportModal";
import { useReportTemplates } from "../../reports/templates/useReportTemplates";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportsList from "../../reports/ReportsList";
import { errorColor1 } from "@/lib/constants";
import Select from "@/app/ui/Select/Select";

interface ProjectDashboardProps {
  projectId: string;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ projectId }) => {
  const { currentUser } = useApi();
  const { reportTemplates, getReportTemplates } = useReportTemplates();
  const { t } = useTranslation();
  const { project, updateProject, createReport, statusOptions } =
    useProject(projectId);
  const isLoaded = useRef(false);
  const searchParams = useSearchParams();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [showDownloadExcel, setShowDownloadExcel] = useState(false);

  useEffect(() => {
    if (isLoaded.current || !project) return;

    isLoaded.current = true;
    setDescription(project.description);
    setStatus(project.status);

    const isAdmin = currentUser?.role === "admin";
    const companyId = isAdmin ? project.company_id : undefined;
    getReportTemplates(companyId);
  }, [project, currentUser]);

  const isEdited = useMemo(() => {
    if (!isLoaded.current) return false;

    if (project?.description !== description) return true;

    if (currentUser?.role === "admin") {
      return project?.status !== status;
    }

    return false;
  }, [
    description,
    status,
    isLoaded.current,
    project?.description,
    project?.status,
    currentUser?.role,
  ]);

  const isEditable = useMemo(() => {
    if (currentUser?.role === UserRole.Admin) return true;
    if (project?.status !== "active") return false;
    return currentUser?.role === UserRole.Manager;
  }, [project?.status, currentUser?.role]);

  const topLabel = useMemo(() => {
    if (currentUser?.role !== "admin") {
      return t("project");
    }

    if (!isLoaded.current) {
      return "";
    }

    return project?.company_name ?? t("project");
  }, [isLoaded.current, project?.company_name, currentUser, t]);

  return (
    <>
      <Heading
        title={project?.name ?? searchParams.get("name") ?? ""}
        topLabel={topLabel}
        placeholder={t("project_name")}
        isEditable={isEditable}
        onEdit={(name) => {
          updateProject({ name });
        }}
      />
      <Divider />
      {project && (
        <>
          <div className="flex flex-col gap-2">
            <TextArea
              value={description}
              placeholder={t("description")}
              onChange={setDescription}
              disabled={!isEditable}
            />
            {currentUser?.role === "admin" && (
              <Select
                options={statusOptions}
                value={status}
                placeholder={t("status")}
                onChange={(s) => {
                  setStatus(s as string);
                }}
              />
            )}
          </div>
          <div
            style={{
              height: isEdited ? 36 : 0,
              opacity: isEdited ? 1 : 0,
              overflow: "hidden",
              transition:
                "height 0.075s ease-in-out, opacity 0.15s ease-in-out",
              display: "flex",
              alignItems: "flex-end",
              gap: 24,
            }}
          >
            <Button
              variant="tertiary"
              iconLeft={() => <Check />}
              style={{ height: "auto" }}
              label={t("update")}
              onClick={() => {
                if (currentUser?.role === "admin") {
                  updateProject({ description, status });
                } else {
                  updateProject({ description });
                }
              }}
            />
            <Button
              variant="tertiary"
              iconLeft={() => (
                <div style={{ marginRight: -3 }}>
                  <Close color={errorColor1} />
                </div>
              )}
              style={{ height: "auto" }}
              label={t("cancel")}
              onClick={() => {
                setDescription(project.description);
              }}
              textStyle={{ color: errorColor1 }}
            />
          </div>
          <div className="flex justify-between mt-8">
            <div className="self-end">{t("reports")}</div>
            <div>
              <Button
                variant="tertiary"
                style={{ height: "auto" }}
                label={t("export")}
                iconLeft={() => <Download />}
                onClick={() => {
                  setShowDownloadExcel(true);
                }}
              />
              {isEditable && (
                <Button
                  variant="tertiary"
                  label={t("create_report")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setShowCreateReport(true);
                  }}
                  style={{ height: "auto" }}
                />
              )}
            </div>
          </div>
          <Divider />
          <ReportsList
            reports={project.reports ?? []}
            isEmpty={project.reports?.length === 0}
          />
        </>
      )}
      <CreateReportModal
        templates={reportTemplates ?? []}
        forceProjectId={projectId}
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

export default ProjectDashboard;
