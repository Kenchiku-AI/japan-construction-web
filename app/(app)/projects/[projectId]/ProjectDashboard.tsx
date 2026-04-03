"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { useSearchParams } from "next/navigation";
import { useProject } from "./useProject";
import { Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import CreateReportModal from "../../reports/CreateReportModal";
import { useReportTemplates } from "../../reports/templates/useReportTemplates";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportsList from "../../reports/ReportsList";

interface ProjectDashboardProps {
  projectId: string;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ projectId }) => {
  const { currentUser } = useApi();
  const { reportTemplates } = useReportTemplates();
  const { t } = useTranslation();
  const { project, updateProject } = useProject(projectId);
  const isLoaded = useRef(false);
  const searchParams = useSearchParams();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isLoaded.current || !project) return;

    isLoaded.current = true;
    setDescription(project.description);
  }, [project]);

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
          <div className="flex justify-between mt-12">
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
        onSubmit={() => {
          setShowCreateReport(false);

          try {
          } catch (err) {}
        }}
      />
    </>
  );
};

export default ProjectDashboard;
