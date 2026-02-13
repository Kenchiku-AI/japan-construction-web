import { FC, useState } from "react";
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
  isCollapsible?: boolean;
}

const ReportTemplatesList: FC<ReportTemplatesListProps> = ({
  templates,
  isCollapsible,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showAll, setShowAll] = useState(!isCollapsible);

  if (!templates.length) {
    return (
      <div className={styles.empty}>
        {t("empty_report_templates_description")}
      </div>
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
        {templates.map((tp) => (
          <div className="md:ml-10 ml-6" key={tp.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 my-4">
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
        ))}
      </div>
      {isCollapsible && templates.length > 5 && (
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

export default ReportTemplatesList;
