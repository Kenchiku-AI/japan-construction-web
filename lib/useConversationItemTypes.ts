"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { ConversationItemType, ConversationItemTypeRequest } from "@/types";
import { useModal } from "./modal/ModalContext";
import { useTranslation } from "react-i18next";

export const useConversationItemTypes = (companyId?: string) => {
  const [conversationItemTypes, setConversationItemTypes] = useState<ConversationItemType[]>([]);
  const api = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

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

  const createConversationItemType = useCallback(
    async (request: ConversationItemTypeRequest) => {
      if (!companyId) return;

      try {
        const response = await api.createConversationItemType(companyId, request);

        if (response) {
          setConversationItemTypes(response);
        }
      } catch (e) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [companyId],
  );

  const updateConversationItemType = useCallback(
    async (itemTypeId: string, request: ConversationItemTypeRequest) => {
      if (!companyId) return;

      try {
        const response = await api.updateConversationItemType(companyId, itemTypeId, request);

        if (response) {
          setConversationItemTypes(response);
        }
      } catch (e) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [companyId],
  );

  const deleteConversationItemType = useCallback(
    async (itemTypeId: string) => {
      if (!companyId) return;

      try {
        await api.deleteConversationItemType(companyId, itemTypeId);

        const newItemTypes = conversationItemTypes.filter((c) => c.id !== itemTypeId);
        setConversationItemTypes(newItemTypes);
      } catch (e) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [companyId, conversationItemTypes],
  );

  return {
    conversationItemTypes,
    createConversationItemType,
    updateConversationItemType,
    deleteConversationItemType
  };
};
