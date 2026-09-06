"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import {
  CustomFieldDataType,
  CustomFieldDefinition,
  CustomFieldEntityType,
  CustomFieldDefinitionListItem,
  CustomObject,
  CustomObjectDefinition,
  CustomObjectDefinitionDetail,
  CustomRelationshipDefinition,
  CustomRelationshipType,
  UpdateCustomFieldDefinitionRequest,
  Project,
  UserOrGuest,
  CustomObjectsByDefinition,
  CreateCustomObjectRequest,
  UpdateCustomObjectRequest,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";

export const useCustomObjectDefinition = (customObjectDefinitionId: string) => {
  const [loading, setLoading] = useState(false);
  const [customObjects, setCustomObjects] = useState<CustomObject[]>([]);
  const [customObjectsByDefinition, setCustomObjectsByDefinition] = useState<CustomObjectsByDefinition>({});
  const [customObjectDefinition, setCustomObjectDefinition] = useState<CustomObjectDefinitionDetail>();
  const [customObjectDefinitions, setCustomObjectDefinitions] = useState<CustomObjectDefinition[]>();
  const relationshipsRef = useRef<CustomRelationshipDefinition[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<UserOrGuest[]>([]);
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
  }, [customObjectDefinition?.company_id]);

  useEffect(() => {
    if (!customObjectDefinition) return;
    const { relationships } = customObjectDefinition;

    const needsProjects = !projects.length && relationships.find((r) => (
      r.target_entity_type === CustomFieldEntityType.Project
    ));
    if (needsProjects) {
      getProjects();
    }

    const needsUsers = !users.length && relationships.find((r) => (
      r.target_entity_type === CustomFieldEntityType.User
    ));
    if (needsUsers) {
      getUsers();
    }

    console.log("relationshipsRef", relationshipsRef.current);
    console.log("RELATIONSHIPS", relationships);

    const needsObjects = relationshipsRef.current.length < relationships.length;
    if (needsObjects) {
      getCustomObjectsByDefinitionId();
    }

    relationshipsRef.current = relationships;
  }, [customObjectDefinition?.relationships]);

  const fieldListItems = useMemo(() => {
    return [
      ...(customObjectDefinition?.fields ?? []),
      ...(customObjectDefinition?.relationships ?? [])
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [
    customObjectDefinition?.fields,
    customObjectDefinition?.relationships
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

  const getUsers = useCallback(async () => {
    const companyId = customObjectDefinition?.company_id;
    if (!companyId) return;

    try {
      const userResponse = await api.getUsers(companyId);
      const guestResponse = await api.getGuests(companyId);

      setUsers([
        ...(userResponse ?? []),
        ...(guestResponse ?? [])
      ]);
    } catch (err) {
      // console.log(err);
    }
  }, [customObjectDefinition?.company_id]);

  const getProjects = useCallback(async () => {
    const companyId = customObjectDefinition?.company_id;
    if (!companyId) return;

    try {
      const response = await api.getProjects();

      if (response) {
        const companyProjects = response.filter((p) => p.company_id === companyId);
        setProjects(companyProjects);
      }
    } catch (err) {
      // console.log(err);
    }
  }, [customObjectDefinition?.company_id]);

  const getCustomObjectsByDefinitionId = useCallback(async () => {
    const company_id = customObjectDefinition?.company_id;
    if (!company_id) return;

    const targetIds = customObjectDefinition.relationships.map((r) => r.target_custom_object_definition_id);
    const definition_ids = targetIds.filter((id) => id != null);
    if (!definition_ids.length) return;

    try {
      const request = { company_id, definition_ids };
      const response = await api.getCustomObjectsByDefinition(request);

      if (response) {
        setCustomObjectsByDefinition(response);
      }
    } catch (err) {
      // console.log(err);
    }
  }, [customObjectDefinition?.relationships]);

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
          setCustomObjectDefinition({
            ...customObjectDefinition,
            fields: [
              ...customObjectDefinition.fields,
              response
            ]
          });
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

  const updateCustomFieldDefinition = useCallback(async (definitionId: string, request: UpdateCustomFieldDefinitionRequest) => {
    if (!customObjectDefinition) return;

    setLoading(true);

    try {
      const response = await api.updateCustomFieldDefinition(definitionId, request);

      if (response) {
        const fields = customObjectDefinition.fields.map((field) =>
          field.id === definitionId ? response : field
        );

        setCustomObjectDefinition({
          ...customObjectDefinition,
          fields
        });
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  }, [customObjectDefinition]);

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
          setCustomObjectDefinition({
            ...customObjectDefinition,
            relationships: [
              ...customObjectDefinition.relationships,
              response
            ]
          });
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

  const updateCustomRelationshipDefinition = useCallback(async (definitionId: string, request: UpdateCustomFieldDefinitionRequest) => {
    if (!customObjectDefinition) return;

    setLoading(true);

    try {
      const response = await api.updateCustomRelationshipDefinition(definitionId, request);

      if (response) {
        const relationships = customObjectDefinition.relationships.map((relationship) =>
          relationship.id === definitionId ? response : relationship
        );

        setCustomObjectDefinition({
          ...customObjectDefinition,
          relationships
        });
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  }, [customObjectDefinition]);

  const onUpdateItemsOrder = useCallback((newItems: CustomFieldDefinitionListItem[]) => {
    if (!customObjectDefinition) return;

    const newFields = customObjectDefinition.fields.map((f) => {
      const sort_order = newItems.find((i) => i.id === f.id)?.sort_order ?? 0;
      return { ...f, sort_order }
    });

    const newRelationships = customObjectDefinition.relationships.map((r) => {
      const sort_order = newItems.find((i) => i.id === r.id)?.sort_order ?? 0;
      return { ...r, sort_order }
    });

    setCustomObjectDefinition({
      ...customObjectDefinition,
      fields: newFields,
      relationships: newRelationships,
    });

    updateSortOrder(newFields, newRelationships);
  }, [customObjectDefinition]);

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

  const deleteCustomFieldDefinition = useCallback(async (definitionId: string) => {
    if (!customObjectDefinition) return;

    setLoading(true);

    try {
      await api.deleteCustomFieldDefinition(definitionId);

      const fields = customObjectDefinition.fields.filter((field) =>
        field.id !== definitionId
      );

      setCustomObjectDefinition({
        ...customObjectDefinition,
        fields,
      });
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  }, [customObjectDefinition]);

  const deleteCustomRelationshipDefinition = useCallback(async (definitionId: string) => {
    if (!customObjectDefinition) return;

    setLoading(true);

    try {
      await api.deleteCustomRelationshipDefinition(definitionId);

      const relationships = customObjectDefinition.relationships.filter((relationship) =>
        relationship.id !== definitionId
      );

      setCustomObjectDefinition({
        ...customObjectDefinition,
        relationships,
      });
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  }, [customObjectDefinition]);

  const createCustomObject = async (request: CreateCustomObjectRequest) => {
    setLoading(true);

    try {
      const response = await api.createCustomObject(request);

      if (response) {
        setCustomObjects((prev) => [
          response,
          ...prev
        ])
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const updateCustomObject = async (objectId: string, request: UpdateCustomObjectRequest) => {
    setLoading(true);

    try {
      const response = await api.updateCustomObject(objectId, request);

      if (response) {
        setCustomObjects((prev) => {
          const index = prev.findIndex((o) => o.id === objectId);
          if (index === -1) return prev;

          const newObjects = [...prev];
          newObjects[index] = response;
          return newObjects;
        });
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const deleteCustomObject = async (objectId: string) => {
    setLoading(true);

    try {
      await api.deleteCustomObject(objectId);

      setCustomObjects((prev) => (
        prev.filter((o) => o.id !== objectId)
      ));
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
    customObjectsByDefinition,
    customObjects,
    fieldListItems,
    projects,
    users,
    createCustomObject,
    updateCustomObject,
    deleteCustomObject,
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
