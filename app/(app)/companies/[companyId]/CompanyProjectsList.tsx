import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Project, ProjectStatus } from "@/types";
import styles from "./page.module.css";
import { DownChevron, Hardhat, RightChevron, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { buttonColor, fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";

interface CompanyProjectsListProps {
  projects: Project[];
  onClickProject: (project: Project) => void;
}

const CompanyProjectsList: FC<CompanyProjectsListProps> = ({
  projects,
  onClickProject,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
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
          maxHeight: showAll ? undefined : 390,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {projects.map((p, i) => (
          <div key={p.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                onClickProject?.(p);
                router.push(`/projects/${p.id}?name=${p.name}`);
              }}
              className="hover:opacity-50 cursor-pointer"
            >
              <div className="flex items-center justify-between md:mx-3">
                <div style={{ height: 60 }} className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <Hardhat />
                  </div>
                  <div>{p.name}</div>
                </div>
                <div>
                  <StatusLabel project={p} />
                  <RightChevron color={fontColor2} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.length > 5 && (
        <>
          <Divider />
          <Button
            variant="tertiary"
            style={{ marginLeft: 10 }}
            label={showAll ? t("show_less") : t("show_more")}
            iconLeft={() => showAll ? <UpChevron color={buttonColor} /> : <DownChevron color={buttonColor} />}
            onClick={() => {
              setShowAll(!showAll);
            }}
          />
        </>
      )}
    </>
  );
};

const StatusLabel: FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();

  if (project.status === ProjectStatus.Requested) {
    return <div className={styles.subtitle}>{t("requested")}</div>;
  }

  if (project.status === ProjectStatus.Completed) {
    return <div className={styles.subtitle}>{t("completed")}</div>;
  }

  return;
};

export default CompanyProjectsList;
