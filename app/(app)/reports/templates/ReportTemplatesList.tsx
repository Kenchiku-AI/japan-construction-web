import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportTemplate } from "@/types";
import styles from "./page.module.css";
import { DownChevron, Papers, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { buttonColor, fontColor2 } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/Button/Button";
import { useApi } from "@/lib/api/ApiContext";

interface ReportTemplatesListProps {
  templates: ReportTemplate[];
  isCollapsible?: boolean;
  isEmpty?: boolean;
  onClickTemplate?: (template: ReportTemplate) => void;
}

const ReportTemplatesList: FC<ReportTemplatesListProps> = ({
  templates,
  isCollapsible,
  isEmpty,
  onClickTemplate,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showAll, setShowAll] = useState(!isCollapsible);
  const { currentUser } = useApi();
  const isAdmin = currentUser?.role === "admin";

  if (isEmpty) {
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
          maxHeight: showAll ? undefined : 390,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {templates.map((tp, i) => (
          <div key={tp.id}>
            {i > 0 && <Divider />}
            <div
              className="hover:opacity-50 cursor-pointer md:mx-3"
              onClick={() => {
                onClickTemplate?.(tp);
                router.push(`/reports/templates/${tp.id}?name=${tp.name}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div style={{ height: 60 }} className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <Papers size={30} />
                  </div>
                  <div>{tp.name}</div>
                  {isAdmin && (
                    <>
                      {tp.company_name ? (
                        <div className={styles.companyName}>
                          {tp.company_name}
                        </div>
                      ) : (
                        <>
                          {tp.is_global && (
                            <div className={styles.companyName}>
                              {t("global")}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isCollapsible && templates.length > 5 && (
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

export default ReportTemplatesList;
