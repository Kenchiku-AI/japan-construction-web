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
  isEmpty?: boolean;
  needsTemplates?: boolean;
}

const ReportsList: FC<ReportsListProps> = ({
  reports,
  isCollapsible,
  isEmpty,
  needsTemplates,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showAll, setShowAll] = useState(!isCollapsible);

  if (isEmpty) {
    let emptyMessage = t("empty_reports_description");

    if (needsTemplates) {
      emptyMessage = `${emptyMessage} ${t("needs_templates")}`;
    }

    return <div className={styles.empty}>{emptyMessage}</div>;
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
          <div key={r.id}>
            <div
              className="hover:opacity-50 cursor-pointer mx-4"
              onClick={() => {
                router.push(`/reports/${r.id}?name=${r.name}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div style={{ height: 60 }} className="flex items-center gap-6">
                  <Paper size={30} />
                  <div>{r.name}</div>
                </div>
              </div>
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
