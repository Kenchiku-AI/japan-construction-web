"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import {
  CustomFieldEntityType,
  CustomObject,
  CustomObjectDefinition,
  CustomRelationshipType,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";

export const useCustomObjectDefinition = (customObjectDefinitionId: string) => {
  const [loading, setLoading] = useState(false);
  const [customObjects, setCustomObjects] = useState<CustomObject[]>([]);
  const [customObjectDefinition, setCustomObjectDefinition] = useState<CustomObjectDefinition>();
  const [customObjectDefinitions, setCustomObjectDefinitions] = useState<CustomObjectDefinition[]>();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const api = useApi();

  useEffect(() => {
    if (!customObjectDefinitionId) return;

    getCustomObjectDefinition(customObjectDefinitionId);
    getCustomObjects(customObjectDefinitionId);
  }, [customObjectDefinitionId]);

  useEffect(() => {
    if (!customObjectDefinition) return;

    getCustomObjectDefinitions(customObjectDefinition.company_id);
  }, [customObjectDefinition]);

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

  const getCustomObjectDefinitions = async (companyId: string) => {
    try {
      const response = await api.getCustomObjectDefinitions(companyId);

      if (response) {
        setCustomObjectDefinitions(response);
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

  const createCustomRelationshipDefinition = useCallback(
    async (
      name: string,
      description: string,
      target: string,
      cardinality: CustomRelationshipType
    ) => {
      if (!customObjectDefinition) return;

      setLoading(true);

      try {
        const entityTypes: string[] = [
          CustomFieldEntityType.Company,
          CustomFieldEntityType.Project,
          CustomFieldEntityType.User
        ];
        const isCustomObject = !entityTypes.includes(target ?? "");
        const target_entity_type = isCustomObject ? CustomFieldEntityType.CustomObject : target as CustomFieldEntityType;

        const request = {
          name,
          description,
          source_entity_type: CustomFieldEntityType.CustomObject,
          source_custom_object_definition_id: customObjectDefinition.id,
          target_entity_type,
          target_custom_object_definition_id: target,
          cardinality,
          company_id: customObjectDefinition.company_id
        }
        const response = await api.createCustomRelationshipDefinition(request);

        if (response) {


        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }

      setLoading(false);
    },
    [customObjectDefinition]
  );

  return {
    loading,
    customObjectDefinition,
    customObjectDefinitions,
    customObjects,
    createCustomRelationshipDefinition
  };
};
