"use client";

import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMessages } from "./useMessages";
import { cardClass } from "@/lib/constants";
import { Heading } from "@/app/ui/Heading/Heading";
import MessageList from "./MessageList";
import { Loader } from "@/app/ui/Loader";
import styles from "./page.module.css";

interface ConversationMessagesProps {
  conversationId: string;
}

const ConversationMessages: FC<ConversationMessagesProps> = ({ conversationId }) => {
  const { t } = useTranslation();
  const {
    loading,
    messages,
    conversation
  } = useMessages(conversationId);

  const title = useMemo(() => {
    if (!conversation?.name) return t("conversation_messages");

    return t("conversation_messages_name", { name: conversation.name })
  }, [t, conversation?.name]);

  return (
    <>
      <Heading
        title={title}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className={cardClass}>
          {messages?.length ? (
            <MessageList
              messages={messages}
            />
          ) : (
            <div className={styles.empty}>
              {t("empty_messages_description")}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ConversationMessages;
