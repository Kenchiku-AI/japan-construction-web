import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Report } from "@/types";
import styles from "./page.module.css";
import { Paper } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";
import { useDate } from "@/public/date/useDate";

interface ReportsListProps {
  reports: Report[];
  isCollapsible?: boolean;
  isEmpty?: boolean;
  needsTemplates?: boolean;
  showCompany?: boolean;
}

const ReportsList: FC<ReportsListProps> = ({
  reports,
  isCollapsible,
  isEmpty,
  needsTemplates,
  showCompany,
}) => {
  const { t } = useTranslation();
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
        {reports.map((report) => (
          <ReportsListItem
            key={report.id}
            report={report}
            showCompany={showCompany}
          />
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

interface ReportsListItemProps {
  report: Report;
  showCompany?: boolean;
}

const ReportsListItem: FC<ReportsListItemProps> = ({ report, showCompany }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formatDate } = useDate();

  const subtitle = useMemo(() => {
    const parts = [];

    if (showCompany && report.company_name) {
      parts.push(report.company_name);
    }

    if (report.project_name) {
      parts.push(report.project_name);
    }

    const date = formatDate(report.created_at);
    parts.push(t("created", { date }));

    return parts.join(" • ");
  }, [report.company_name, report.project_name, report.created_at]);

  return (
    <div>
      <Link
        href={`/reports/${report.id}?name=${report.name}`}
        className="hover:opacity-50 cursor-pointer mx-4"
      >
        <div className="flex items-center justify-between">
          <div style={{ height: 60 }} className="flex items-center gap-6">
            <Paper size={30} />
            <div className="flex flex-col">
              <div>{report.name}</div>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
          </div>
        </div>
      </Link>
      <Divider color={fontColor2} />
    </div>
  );
};

export default ReportsList;
