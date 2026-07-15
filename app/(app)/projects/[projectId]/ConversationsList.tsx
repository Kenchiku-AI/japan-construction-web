import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Conversation } from "@/types";
import styles from "./page.module.css";
import { Chat, ClipboardCheck } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor1 } from "@/lib/constants";

interface ConversationsListProps {
  conversations: Conversation[];
  isEmpty: boolean;
  onClickConversation: (conversation: Conversation) => void;
}

const ConversationsList: FC<ConversationsListProps> = ({
  conversations,
  isEmpty,
  onClickConversation
}) => {
  const { t } = useTranslation();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_conversations_description")}</div>;
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
        {conversations.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                onClickConversation(c);
              }}
              className={"hover:opacity-50 cursor-pointer"}
            >
              <div className="md:mx-3 flex items-center justify-between gap-4">
                <div
                  style={{ minHeight: 60, minWidth: 0 }}
                  className="flex flex-1 items-center gap-3 py-1"
                >
                  <div className="hidden md:block">
                    <Chat />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: fontColor1 }}>{c.name}</div>
                    {c.last_message_text && (
                      <div className={styles.subtitle}>
                        {truncateText(c.last_message_text, 100)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConversationsList;
