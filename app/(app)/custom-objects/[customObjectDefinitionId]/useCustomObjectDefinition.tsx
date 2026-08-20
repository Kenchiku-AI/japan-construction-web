"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import {
  CustomFieldDataType,
  CustomFieldDefinition,
  CustomFieldEntityType,
  CustomFieldListItem,
  CustomObject,
  CustomObjectDefinition,
  CustomObjectDefinitionDetail,
  CustomRelationshipDefinition,
  CustomRelationshipType,
  UpdateCustomFieldDefinitionRequest,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";

export const useCustomObjectDefinition = (customObjectDefinitionId: string) => {
  const [loading, setLoading] = useState(false);
  const [customObjects, setCustomObjects] = useState<CustomObject[]>([]);
  const [customObjectDefinition, setCustomObjectDefinition] = useState<CustomObjectDefinitionDetail>();
  const [customObjectDefinitions, setCustomObjectDefinitions] = useState<CustomObjectDefinition[]>();
  const [fields, setFields] = useState<CustomFieldDefinition[]>([]);
  const [relationships, setRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [fieldListItems, setFieldListItems] = useState<CustomFieldListItem[]>([]);
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

  useEffect(() => {
    if (!customObjectDefinition) return;

    setFields(customObjectDefinition.fields);
  }, [customObjectDefinition?.fields]);

  useEffect(() => {
    if (!customObjectDefinition) return;

    setRelationships(customObjectDefinition.relationships);
  }, [customObjectDefinition?.relationships]);

  useEffect(() => {
    const items = [
      ...fields,
      ...relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );

    setFieldListItems(items);
  }, [
    fields,
    relationships
  ]);

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

  const updateCustomObjectDefinition = useCallback(async (request: UpdateCustomFieldDefinitionRequest) => {
    setLoading(true);

    try {
      const response = await api.updateCustomObjectDefinition(customObjectDefinitionId, request);

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
  }, [customObjectDefinition]);

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

  const createCustomFieldDefinition = useCallback(
    async (
      name: string, description: string, data_type: CustomFieldDataType
    ) => {
      if (!customObjectDefinition) return;

      setLoading(true);

      try {
        const request = {
          name,
          description,
          data_type,
          entity_type: CustomFieldEntityType.CustomObject,
          custom_object_definition_id: customObjectDefinition.id,
          company_id: customObjectDefinition.company_id
        }

        const response = await api.createCustomFieldDefinition(request);

        if (response) {
          setFields((prevFields) => [...prevFields, response]);
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

  const updateCustomFieldDefinition = async (definitionId: string, request: UpdateCustomFieldDefinitionRequest) => {
    setLoading(true);

    try {
      const response = await api.updateCustomFieldDefinition(definitionId, request);

      if (response) {
        setFields((prevFields) =>
          prevFields.map((field) =>
            field.id === definitionId ? response : field
          )
        );
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
          target_custom_object_definition_id: isCustomObject ? target : undefined,
          cardinality,
          company_id: customObjectDefinition.company_id
        }
        const response = await api.createCustomRelationshipDefinition(request);

        if (response) {
          setRelationships((prevRelationships) => [...prevRelationships, response]);
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

  const updateCustomRelationshipDefinition = async (definitionId: string, request: UpdateCustomFieldDefinitionRequest) => {
    setLoading(true);

    try {
      const response = await api.updateCustomRelationshipDefinition(definitionId, request);

      if (response) {
        setRelationships((prevRelationships) =>
          prevRelationships.map((relationship) =>
            relationship.id === definitionId ? response : relationship
          )
        );
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const onUpdateItemsOrder = (newItems: CustomFieldListItem[]) => {
    const newFields = fields.map((f) => {
      const sort_order = newItems.find((i) => i.id === f.id)?.sort_order ?? 0;
      return { ...f, sort_order }
    });
    setFields(newFields);

    const newRelationships = relationships.map((r) => {
      const sort_order = newItems.find((i) => i.id === r.id)?.sort_order ?? 0;
      return { ...r, sort_order }
    });
    setRelationships(newRelationships);

    updateSortOrder(newFields, newRelationships);
  }

  const updateSortOrder = (newFields: CustomFieldDefinition[], newRelationships: CustomRelationshipDefinition[]) => {
    if (newFields.length) {
      const fieldsRequest = newFields.map((f) => ({
        id: f.id,
        sort_order: f.sort_order
      }));
      api.updateCustomFieldsSortOrder(fieldsRequest);
    }

    if (newRelationships.length) {
      const relationshipsRequest = newRelationships.map((f) => ({
        id: f.id,
        sort_order: f.sort_order
      }));
      api.updateCustomRelationshipsSortOrder(relationshipsRequest);
    }
  }

  const deleteCustomFieldDefinition = async (definitionId: string) => {
    setLoading(true);

    try {
      await api.deleteCustomFieldDefinition(definitionId);

      setFields((prevFields) =>
        prevFields.filter((field) =>
          field.id !== definitionId
        )
      );
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const deleteCustomRelationshipDefinition = async (definitionId: string) => {
    setLoading(true);

    try {
      await api.deleteCustomRelationshipDefinition(definitionId);

      setRelationships((prevRelationships) =>
        prevRelationships.filter((relationship) =>
          relationship.id !== definitionId
        )
      );
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
    customObjectDefinitions,
    customObjects,
    fieldListItems,
    updateCustomObjectDefinition,
    onUpdateItemsOrder,
    createCustomFieldDefinition,
    updateCustomFieldDefinition,
    deleteCustomFieldDefinition,
    createCustomRelationshipDefinition,
    updateCustomRelationshipDefinition,
    deleteCustomRelationshipDefinition,
  };
};
