import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Report } from "@/types";
import styles from "./page.module.css";
import { Papers } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";

interface ReportsListProps {
  reports: Report[];
}

const ReportsList: FC<ReportsListProps> = ({ reports }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!reports.length) {
    return <div className={styles.empty}>{t("empty_reports_description")}</div>;
  }

  return reports.map((r) => (
    <div className="md:ml-10 ml-6 mt-4" key={r.id}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Papers />
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
  ));
};

export default ReportsList;
