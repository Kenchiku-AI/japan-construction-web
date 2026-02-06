import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Project } from "@/types";
import styles from "./page.module.css";

interface CompanyProjectsListProps {
  projects: Project[];
}

const CompanyProjectsList: FC<CompanyProjectsListProps> = ({ projects }) => {
  const { t } = useTranslation();

  if (!projects.length) {
    return (
      <div className={styles.empty}>{t("empty_projects_description")}</div>
    );
  }

  return projects.map((p) => (
    <div className="md:ml-10 ml-6 mt-4" key={p.id}>
      <div className={styles.subtitle}>{p.name}</div>
      <div className="divider m-0 mt-4" />
    </div>
  ));
};

export default CompanyProjectsList;
