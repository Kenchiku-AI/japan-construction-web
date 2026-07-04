import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ActionItem } from "@/types";
import styles from "./page.module.css";
import { ClipboardCheck, Edit, Tag, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface ActionItemsListProps {
  actionItems: ActionItem[];
  isEmpty: boolean;
  onClickActionItem: (actionItem: ActionItem) => void;
  onViewAll?: () => void;
}

const ActionItemsList: FC<ActionItemsListProps> = ({
  actionItems,
  isEmpty,
  onClickActionItem,
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
        {actionItems.map((a) => (
          <div key={a.id}>
            <div
              onClick={() => {
                onClickActionItem(a);
              }}
              className={"hover:opacity-50 cursor-pointer"}
            >
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
                      <div style={{ color: fontColor1 }}>{a.name}</div>
                      <div className={styles.subtitle}>{a.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {t(a.status)}
                  </div>
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

export default ActionItemsList;
