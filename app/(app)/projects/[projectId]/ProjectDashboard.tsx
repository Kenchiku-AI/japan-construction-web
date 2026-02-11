"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { useSearchParams } from "next/navigation";
import { useProject } from "./useProject";
import { Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import ProjectReportsList from "./ProjectReportsList";
import CreateReportModal from "../../reports/CreateReportModal";
import { useReports } from "../../reports/useReports";

interface ProjectDashboardProps {
  projectId: string;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ projectId }) => {
  const { currentUser } = useApi();
  const { reportTemplates } = useReports();
  const { t } = useTranslation();
  const { project } = useProject(projectId);
  const searchParams = useSearchParams();
  const [showCreateReport, setShowCreateReport] = useState(false);

  return (
    <>
      <Heading title={project?.name ?? searchParams.get("name") ?? ""} />
      {project && (
        <>
          <div className="flex justify-between mt-8">
            <div className="text-2xl self-end">{t("reports")}</div>
            {currentUser?.role === UserRole.Admin && (
              <Button
                variant="secondary"
                label={t("create_report")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowCreateReport(true);
                }}
                style={{ height: 40 }}
              />
            )}
          </div>
          <Divider />
          <ProjectReportsList reports={project.daily_reports ?? []} />
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
