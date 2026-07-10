import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Report, ReportStatus } from "@/types";
import styles from "./page.module.css";
import { Paper } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";
import { useDate } from "@/public/date/useDate";

interface ReportsListProps {
  reports: Report[];
  isEmpty?: boolean;
  needsTemplates?: boolean;
  showCompany?: boolean;
  maxShown?: number;
  onClickReport?: (report: Report) => void;
  onViewAll?: () => void;
}

const ReportsList: FC<ReportsListProps> = ({
  reports,
  isEmpty,
  needsTemplates,
  showCompany,
  onClickReport,
  onViewAll,
}) => {
  const { t } = useTranslation();

  if (isEmpty) {
    return (
      <div className={styles.empty}>
        <div>
          {t("empty_reports_description")}
        </div>
        {needsTemplates && (
          <div>
            {t("needs_templates")}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {reports.map((report, i) => (
        <div key={report.id}>
          {i > 0 && <Divider />}
          <ReportsListItem
            report={report}
            showCompany={showCompany}
            onClick={onClickReport}
          />
        </div>
      ))}
      {onViewAll && (
        <>
          <Divider />
          <Button
            variant="tertiary"
            style={{ marginLeft: 12 }}
            label={t("view_all")}
            onClick={onViewAll}
          />
        </>
      )}
    </>
  );
};

interface ReportsListItemProps {
  report: Report;
  showCompany?: boolean;
  onClick?: (report: Report) => void;
}

const ReportsListItem: FC<ReportsListItemProps> = ({
  report,
  showCompany,
  onClick,
}) => {
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
      <div
        className="hover:opacity-50 cursor-pointer md:mx-3"
        onClick={() => {
          onClick?.(report);
          router.push(`/reports/${report.id}?name=${report.name}`);
        }}
      >
        <div className="flex items-center justify-between">
          <div style={{ height: 60 }} className="flex items-center gap-3">
            <div className="hidden md:block">
              <Paper size={30} />
            </div>
            <div className="flex flex-col">
              <div>{report.name}</div>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
          </div>
          {report.status === ReportStatus.Closed && (
            <div className="pr-2" style={{ color: fontColor2 }}>
              {t("closed")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsList;
