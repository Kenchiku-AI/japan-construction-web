"use client";

import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useProjects } from "./useProjects";
import { useRouter } from "next/navigation";
import { Hardhat, Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { FC, useState } from "react";
import { Project, ProjectStatus, UserRole } from "@/types";
import styles from "./page.module.css";
import { Loader } from "@/app/ui/Loader";
import { useApi } from "@/lib/api/ApiContext";
import CreateProjectModal from "../companies/[companyId]/CreateProjectModal";
import { Button } from "@/app/ui/Button/Button";
import { useModal } from "@/lib/modal/ModalContext";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const { projects, loading, loaded, setLoading, createProject } =
    useProjects();
  const { currentUser } = useApi();
  const router = useRouter();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const { showModal } = useModal();
  const companyId =
    currentUser?.role === UserRole.Manager
      ? currentUser?.company?.id
      : undefined;

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
              if (
                currentUser?.role !== UserRole.Admin && 
                currentUser?.company?.needs_payment_method
              ) {
                showModal({
                  title: t("payment_method_required"),
                  subtitle: t("payment_method_required_description")
                });
                return;
              }

              setShowCreateProject(true);
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        )}
      </div>
      <Divider />
      {loaded && projects?.length === 0 && (
        <div className={styles.empty}>{t("empty_projects_description")}</div>
      )}
      {projects.map((p) => (
        <div key={p.id}>
          <div
            onClick={() => {
              setLoading(true);
              router.push(`/projects/${p.id}?name=${p.name}`);
            }}
            className={"hover:opacity-50 cursor-pointer"}
          >
            <div className="flex items-center justify-between md:mx-3">
              <div style={{ height: 60 }} className="flex items-center gap-3">
                <Hardhat />
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
          <Divider color={fontColor2} />
        </div>
      ))}
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false);
        }}
        onSubmit={async (name, description) => {
          setShowCreateProject(false);

          try {
            await createProject(name, description, companyId);
          } catch (err) {}
        }}
      />
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
