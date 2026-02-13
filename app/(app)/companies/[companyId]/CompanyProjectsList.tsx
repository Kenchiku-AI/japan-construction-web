import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Project, ProjectStatus } from "@/types";
import styles from "./page.module.css";
import { Hardhat } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";

interface CompanyProjectsListProps {
  projects: Project[];
}

const CompanyProjectsList: FC<CompanyProjectsListProps> = ({ projects }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  if (!projects.length) {
    return (
      <div className={styles.empty}>{t("empty_projects_description")}</div>
    );
  }

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: showAll ? 2500 : 500,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {projects.map((p) => (
          <div className="md:ml-10 ml-6" key={p.id}>
            <div className="flex items-center justify-between mr-8">
              <div style={{ height: 68 }} className="flex items-center gap-6">
                <Hardhat />
                <div className="text-xl">{p.name}</div>
              </div>
              <ViewProjectButton project={p} />
            </div>
            <Divider color={fontColor2} />
          </div>
        ))}
      </div>
      {projects.length > 5 && (
        <Button
          variant="tertiary"
          style={{ marginLeft: 40 }}
          label={showAll ? t("show_less") : t("show_more")}
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      )}
    </>
  );
};

const ViewProjectButton: FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (project.status === ProjectStatus.Requested) {
    return <div className={`${styles.subtitle} mr-8`}>{t("requested")}</div>;
  }

  if (project.status === ProjectStatus.Completed) {
    return <div className={`${styles.subtitle} mr-8`}>{t("completed")}</div>;
  }

  return (
    <Button
      variant="tertiary"
      label={t("view")}
      onClick={() => {
        router.push(`/projects/${project.id}?name=${project.name}`);
      }}
    />
  );
};

export default CompanyProjectsList;
