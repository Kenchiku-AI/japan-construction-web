"use client";

import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useProjects } from "./useProjects";
import { useRouter } from "next/navigation";
import { Hardhat } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { FC } from "react";
import { Project, ProjectStatus } from "@/types";
import styles from "./page.module.css";
import { Loader } from "@/app/ui/Loader";
import { useApi } from "@/lib/api/ApiContext";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const { projects, loading, loaded } = useProjects();
  const { currentUser } = useApi();
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("projects")} />
      </div>
      <Divider />
      {loaded && projects?.length === 0 && (
        <div className={styles.empty}>{t("empty_projects_description")}</div>
      )}
      {projects.map((p) => (
        <div key={p.id}>
          <div
            onClick={() => {
              router.push(`/projects/${p.id}?name=${p.name}`);
            }}
            className={"hover:opacity-50 cursor-pointer"}
          >
            <div className="flex items-center justify-between mx-4">
              <div style={{ height: 60 }} className="flex items-center gap-4">
                <Hardhat />
                <div>{p.name}</div>
                {currentUser?.role === "admin" && p.company && (
                  <div className={styles.subtitle}>{p.company.name}</div>
                )}
              </div>
              <StatusLabel project={p} />
            </div>
          </div>
          <Divider color={fontColor2} />
        </div>
      ))}
      {loading && <Loader />}
    </>
  );
};

const StatusLabel: FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();

  if (project.status === ProjectStatus.Requested) {
    return <div className={`${styles.subtitle} mr-8`}>{t("requested")}</div>;
  }

  if (project.status === ProjectStatus.Completed) {
    return <div className={`${styles.subtitle} mr-8`}>{t("completed")}</div>;
  }

  return null;
};

export default ProjectsPage;
