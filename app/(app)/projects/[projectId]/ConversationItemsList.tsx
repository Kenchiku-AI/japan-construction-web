import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ConversationItem } from "@/types";
import styles from "./page.module.css";
import { ClipboardCheck, } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { bgColor5, fontColor1, } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface ConversationItemsListProps {
  conversationItems: ConversationItem[];
  isEmpty: boolean;
  onClickConversationItem: (conversationItem: ConversationItem) => void;
  onViewAll?: () => void;
}

const ConversationItemsList: FC<ConversationItemsListProps> = ({
  conversationItems,
  isEmpty,
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
                onClickConversationItem(c);
              }}
              className={"hover:opacity-50 cursor-pointer"}
            >
              <div className="md:mx-3">
                <div className="flex items-center justify-between gap-4">
                  <div
                    style={{ minHeight: 60, minWidth: 0 }}
                    className="flex flex-1 items-center gap-3 py-1"
                  >
                    <div className="hidden md:block">
                      <ClipboardCheck />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: fontColor1 }}>{c.name}</div>
                      <div className={styles.subtitle}>{truncateText(c.description, 100)}</div>
                    </div>
                  </div>
                  <div
                    className="flex items-center px-2 hidden md:block"
                    style={{
                      fontSize: 12,
                      padding: "5px 10px",
                      borderRadius: 18,
                      background: bgColor5
                    }}
                  >
                    {t(c.status)}
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
