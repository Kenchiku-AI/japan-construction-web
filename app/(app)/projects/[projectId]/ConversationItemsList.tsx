import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ConversationItem } from "@/types";
import styles from "./page.module.css";
import { AnnotationCheck } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { doneColor1, doneColor2, errorColor1, errorColor2, fontColor1, fontColor3, inProgressColor1, inProgressColor2, } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface ConversationItemsListProps {
  conversationItems: ConversationItem[];
  isEmpty: boolean;
  isDisabled: boolean;
  onClickConversationItem: (conversationItem: ConversationItem) => void;
  onViewAll?: () => void;
}

const ConversationItemsList: FC<ConversationItemsListProps> = ({
  conversationItems,
  isEmpty,
  isDisabled,
  onClickConversationItem,
  onViewAll
}) => {
  const { t } = useTranslation();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_conversation_items_description")}</div>;
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const getStatusColors = (status: string) => {
    if (status === "new") {
      return {
        color: errorColor1,
        background: errorColor2
      }
    }

    if (status === "in_progress") {
      return {
        color: inProgressColor1,
        background: inProgressColor2
      }
    }

    return {
      color: doneColor1,
      background: doneColor2
    }
  }

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {conversationItems.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                if (isDisabled) return;
                onClickConversationItem(c);
              }}
              className={isDisabled ? "" : "hover:opacity-50 cursor-pointer"}
            >
              <div className="md:mx-3">
                <div className="flex items-center justify-between gap-4">
                  <div
                    style={{ minHeight: 60, minWidth: 0 }}
                    className="flex flex-1 items-center gap-4 py-1"
                  >
                    <div className="hidden md:block">
                      <AnnotationCheck />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: fontColor1 }}>{c.name}</div>
                      <div className={styles.subtitle}>{truncateText(c.description, 100)}</div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-2">
                    {c.assignee && (
                      <div
                        className={styles.subtitle}
                        style={{
                          fontSize: 12
                        }}
                      >
                        {`${t("assignee")}: ${c.assignee.last_name} ${c.assignee.first_name}`}
                      </div>
                    )}
                    <div
                      className="flex items-center px-2"
                      style={{
                        fontSize: 12,
                        padding: "5px 10px",
                        borderRadius: 18,
                        ...getStatusColors(c.status)
                      }}
                    >
                      {t(c.status)}
                    </div>
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

export default ConversationItemsList;
