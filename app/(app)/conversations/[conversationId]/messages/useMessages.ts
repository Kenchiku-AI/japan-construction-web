"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import { Conversation, ConversationMessage } from "@/types";

export const useMessages = (conversationId: string) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ConversationMessage[]>();
  const [conversation, setConversation] = useState<Conversation>();
  const api = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    getMessages(conversationId);
    getConversation(conversationId);
  }, [conversationId]);

  const getMessages = useCallback(async (conversationId: string) => {
    setLoading(true);

    try {
      const response = await api.getConversationMessages(conversationId);

      setMessages(response);
    } catch (err) {
      // console.log(err);
    }

    setLoading(false);
  }, [conversationId]);

  const getConversation = useCallback(async (conversationId: string) => {
    try {
      const response = await api.getConversationInfo(conversationId);

      setConversation(response);
    } catch (err) {
      // console.log(err);
    }
  }, [conversationId]);

  return {
    loading,
    messages,
    conversation
  };
};
