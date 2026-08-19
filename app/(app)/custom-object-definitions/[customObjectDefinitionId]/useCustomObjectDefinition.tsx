"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import {
  CustomObject,
  CustomObjectDefinition,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";

export const useCustomObjectDefinition = (customObjectDefinitionId: string) => {
  const [loading, setLoading] = useState(false);
  const [customObjects, setCustomObjects] = useState<CustomObject[]>([]);
  const [customObjectDefinition, setCustomObjectDefinition] = useState<CustomObjectDefinition>();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const api = useApi();

  useEffect(() => {
    if (!customObjectDefinitionId) return;

    getCustomObjectDefinition(customObjectDefinitionId);
    getCustomObjects(customObjectDefinitionId);
  }, [customObjectDefinitionId]);

  const getCustomObjectDefinition = async (customObjectDefinitionId: string) => {
    setLoading(true);

    try {
      const response = await api.getCustomObjectDefinition(customObjectDefinitionId);

      if (response) {
        setCustomObjectDefinition(response);
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const getCustomObjects = async (customObjectDefinitionId: string) => {
    setLoading(true);

    try {
      const response = await api.getCustomObjects(customObjectDefinitionId);

      if (response) {
        setCustomObjects(response);
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  return {
    loading,
    customObjectDefinition,
    customObjects,
  };
};
