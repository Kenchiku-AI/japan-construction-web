import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ActionItem } from "@/types";
import styles from "./page.module.css";
import { ClipboardCheck, Edit, Tag, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { bgColor5, fontColor1, fontColor2 } from "@/lib/constants";
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
    return <div className={styles.empty}>{t("empty_action_items_description")}</div>;
  }

  const truncateText = (text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {actionItems.map((a, i) => (
          <div key={a.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                onClickActionItem(a);
              }}
              className={"hover:opacity-50 cursor-pointer"}
            >
              <div className="md:mx-3">
                <div className="flex items-center justify-between gap-2">
                  <div
                    style={{ minHeight: 60, minWidth: 0 }}
                    className="flex flex-1 items-center gap-3"
                  >
                    <div>
                      <ClipboardCheck />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: fontColor1 }}>{a.name}</div>
                      <div className={styles.subtitle}>{truncateText(a.description, 100)}</div>
                    </div>
                  </div>
                  <div
                    className="flex items-center px-2"
                    style={{
                      color: fontColor2,
                      fontSize: 12,
                      padding: "5px 10px",
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: bgColor5
                    }}
                  >
                    {t(a.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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

export default ActionItemsList;
