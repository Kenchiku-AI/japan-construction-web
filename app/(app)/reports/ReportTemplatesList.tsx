import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReportTemplate } from "@/types";
import styles from "./page.module.css";
import { Papers } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";

interface ReportTemplatesListProps {
  templates: ReportTemplate[];
}

const ReportTemplatesList: FC<ReportTemplatesListProps> = ({ templates }) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!templates.length) {
    return (
      <div className={styles.empty}>
        {t("empty_report_templates_description")}
      </div>
    );
  }

  return templates.map((tp) => (
    <div className="md:ml-10 ml-6 mt-4" key={tp.id}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Papers />
          <div className="text-xl">{tp.name}</div>
        </div>
        <Button
          variant="tertiary"
          label={t("view")}
          onClick={() => {
            router.push(`/reports/templates/${tp.id}?name=${tp.name}`);
          }}
        />
      </div>
      <Divider color={fontColor2} />
    </div>
  ));
};

export default ReportTemplatesList;
