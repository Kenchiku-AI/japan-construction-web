"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { ConversationItemType } from "@/types";

export const useConversationItemTypes = (companyId?: string) => {
  const [conversationItemTypes, setConversationItemTypes] = useState<ConversationItemType[]>([]);
  const api = useApi();

  useEffect(() => {
    if (!companyId) return;

    getConversationItemTypes(companyId);
  }, [companyId]);

  const getConversationItemTypes = async (companyId: string) => {
    try {
      const response = await api.getConversationItemTypes(companyId);

      if (response) {
        setConversationItemTypes(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    conversationItemTypes
  };
};
