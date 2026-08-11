"use client";

import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useProjects } from "./useProjects";
import { useRouter } from "next/navigation";
import { DownChevron, Eye, EyeOff, Hardhat, Plus, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { buttonColor, cardClass, } from "@/lib/constants";
import { FC, useMemo, useState } from "react";
import { Project, ProjectStatus, UserRole } from "@/types";
import styles from "./page.module.css";
import { Loader } from "@/app/ui/Loader";
import { useApi } from "@/lib/api/ApiContext";
import CreateProjectModal from "../companies/[companyId]/CreateProjectModal";
import { Button } from "@/app/ui/Button/Button";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const { projects, loading, loaded, setLoading, createProject } =
    useProjects();
  const { currentUser } = useApi();
  const router = useRouter();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const companyId =
    currentUser?.role === UserRole.Manager
      ? currentUser?.company?.id
      : undefined;

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    if (!showArchived) {
      return projects.filter(
        (project) => project.status !== ProjectStatus.Archived
      );
    }

    return [...projects].sort((a, b) => {
      if (a.status === ProjectStatus.Archived) return 1;
      if (b.status === ProjectStatus.Archived) return -1;
      return 0;
    });
  }, [projects, showArchived]);

  const hasArchived = useMemo(() => {
    return projects.some((p) => p.status === ProjectStatus.Archived);
  }, [projects]);

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("projects")} />
        {!!companyId && (
          <Button
            variant="tertiary"
            label={t("create_project")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowCreateProject(true);
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        )}
      </div>
      <div className={loaded ? cardClass : ""}>
        {loaded && projects?.length === 0 && (
          <div className={styles.empty}>{t("empty_projects_description")}</div>
        )}
        {filteredProjects.map((p, i) => (
          <div key={p.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                setLoading(true);
                router.push(`/projects/${p.id}?name=${p.name}`);
              }}
              className={"hover:opacity-50 cursor-pointer"}
            >
              <div className="flex items-center justify-between md:mx-3">
                <div style={{ height: 60 }} className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <Hardhat />
                  </div>
                  <div>
                    <div>{p.name}</div>
                    {currentUser?.role === "admin" && p.company_name && (
                      <div className={styles.subtitle}>{p.company_name}</div>
                    )}
                  </div>
                </div>
                <StatusLabel project={p} />
              </div>
            </div>
          </div>
        ))}
        {loaded && hasArchived && (
          <>
            <Divider />
            <div className="mx-4">
              <Button
                variant="tertiary"
                label={showArchived ? t("hide_archived") : t("show_archived")}
                iconLeft={() => {
                  return showArchived ? <UpChevron /> : <DownChevron />
                }}
                onClick={() => {
                  setShowArchived((prev) => !prev);
                }}
              />
            </div>
          </>
        )}
      </div>
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false);
        }}
        onSubmit={async (name, description) => {
          setShowCreateProject(false);

          try {
            await createProject(name, description, companyId);
          } catch (err) { }
        }}
      />
      {loading && <Loader />}
    </>
  );
};

const StatusLabel: FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();

  if (project.status === ProjectStatus.Archived) {
    return <div className={styles.subtitle}>{t("archived")}</div>;
  }

  if (project.status === ProjectStatus.Requested) {
    return <div className={styles.subtitle}>{t("requested")}</div>;
  }

  if (project.status === ProjectStatus.Completed) {
    return <div className={styles.subtitle}>{t("completed")}</div>;
  }

  return null;
};

export default ProjectsPage;
