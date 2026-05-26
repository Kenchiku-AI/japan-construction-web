"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { useSearchParams } from "next/navigation";
import { useProject } from "./useProject";
import { Check, Close, Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import CreateReportModal from "../../reports/CreateReportModal";
import { useReportTemplates } from "../../reports/templates/useReportTemplates";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportsList from "../../reports/ReportsList";
import { errorColor1 } from "@/lib/constants";

interface ProjectDashboardProps {
  projectId: string;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ projectId }) => {
  const { currentUser } = useApi();
  const { reportTemplates, getReportTemplates } = useReportTemplates();
  const { t } = useTranslation();
  const { project, updateProject, createReport } = useProject(projectId);
  const isLoaded = useRef(false);
  const searchParams = useSearchParams();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [description, setDescription] = useState("");
  const isDescriptionEdited =
    project?.description !== description && isLoaded.current;

  useEffect(() => {
    if (isLoaded.current || !project) return;

    isLoaded.current = true;
    setDescription(project.description);

    const isAdmin = currentUser?.role === "admin";
    const companyId = isAdmin ? project.company_id : undefined;
    getReportTemplates(companyId);
  }, [project, currentUser]);

  return (
    <>
      <Heading
        title={project?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("project")}
        placeholder={t("project_name")}
        isEditable={
          currentUser?.role === UserRole.Admin ||
          currentUser?.role === UserRole.Manager
        }
        onEdit={(name) => {
          updateProject({ name });
        }}
      />
      <Divider />
      {project && (
        <>
          <TextArea
            value={description}
            placeholder={t("description")}
            onChange={setDescription}
          />
          <div
            style={{
              height: isDescriptionEdited ? 36 : 0,
              opacity: isDescriptionEdited ? 1 : 0,
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
              label={t("update_description")}
              onClick={() => {
                updateProject({ description });
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
            <Button
              variant="tertiary"
              label={t("create_report")}
              iconLeft={() => <Plus />}
              onClick={() => {
                setShowCreateReport(true);
              }}
              style={{ height: "auto" }}
            />
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
