import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DailyReport } from "@/types";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";

interface ProjectReportsListProps {
  reports: DailyReport[];
}

const ProjectReportsList: FC<ProjectReportsListProps> = ({ reports }) => {
  const router = useRouter();
  const { t } = useTranslation();

  if (!reports.length) {
    return <div className={styles.empty}>{t("empty_reports_description")}</div>;
  }

  return reports.map((r) => (
    <div className="md:ml-10 ml-6 mt-4" key={r.id}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <div className="text-xl">{r.date}</div>
          </div>
        </div>
        <Button
          variant="tertiary"
          label={t("view")}
          onClick={() => {
            router.push(`/reports/${r.id}`);
          }}
        />
      </div>
      <Divider color={fontColor2} />
    </div>
  ));
};

export default ProjectReportsList;
