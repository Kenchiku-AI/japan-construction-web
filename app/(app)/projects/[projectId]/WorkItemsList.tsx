import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WorkItem } from "@/types";
import styles from "./page.module.css";
import { ClipboardCheck, Edit, Tag, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface WorkItemsListProps {
  workItems: WorkItem[];
  isEmpty?: boolean;
  onEdit?: (workItem: WorkItem) => void;
  onDelete?: (workItem: WorkItem) => void;
  onViewAll?: () => void;
}

const WorkItemsList: FC<WorkItemsListProps> = ({
  workItems,
  isEmpty,
  onEdit,
  onDelete,
  onViewAll
}) => {
  const { t } = useTranslation();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_tags_description")}</div>;
  }

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {workItems.map((w) => (
          <div key={w.id}>
            <div className="md:mx-3">
              <div className="flex items-center justify-between">
                <div
                  style={{ height: 60, minWidth: 0 }}
                  className="flex items-center gap-3"
                >
                  <div>
                    <ClipboardCheck />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: fontColor1 }}>{w.name}</div>
                    <div className={styles.subtitle}>{w.description}</div>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-5 items-center">
                  {onEdit && (
                    <div
                      className="cursor-pointer pb-1"
                      onClick={() => onEdit(w)}
                    >
                      <Edit />
                    </div>
                  )}
                  {onDelete && (
                    <div className="cursor-pointer" onClick={() => onDelete(w)}>
                      <Trash />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Divider color={fontColor2} />
          </div>
        ))}
      </div>
      {onViewAll && (
        <Button
          variant="tertiary"
          style={{ marginLeft: 20 }}
          label={t("view_all")}
          onClick={onViewAll}
        />
      )}
    </>
  );
};

export default WorkItemsList;
