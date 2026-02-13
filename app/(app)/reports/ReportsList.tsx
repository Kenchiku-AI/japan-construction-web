import { FC, useState } from "react";
import { useSSR, useTranslation } from "react-i18next";
import { Report } from "@/types";
import styles from "./page.module.css";
import { Paper } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";

interface ReportsListProps {
  reports: Report[];
  isCollapsible?: boolean;
}

const ReportsList: FC<ReportsListProps> = ({ reports, isCollapsible }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showAll, setShowAll] = useState(!isCollapsible);

  if (!reports.length) {
    return <div className={styles.empty}>{t("empty_reports_description")}</div>;
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
        {reports.map((r) => (
          <div className="md:ml-10 ml-6" key={r.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 my-4">
                <Paper />
                <div className="text-xl">{r.name}</div>
              </div>
              <Button
                variant="tertiary"
                label={t("view")}
                onClick={() => {
                  router.push(`/reports/${r.id}?name=${r.name}`);
                }}
              />
            </div>
            <Divider color={fontColor2} />
          </div>
        ))}
      </div>
      {isCollapsible && reports.length > 5 && (
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

export default ReportsList;
