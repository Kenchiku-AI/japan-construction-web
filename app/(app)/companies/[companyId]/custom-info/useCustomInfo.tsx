"use client";

import { useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import {
  CreateCustomFieldDefinitionRequest,
  CreateCustomObjectDefinitionRequest,
  CreateCustomRelationshipDefinitionRequest,
  CustomFieldDataType,
  CustomFieldDefinition,
  CustomFieldEntityType,
  CustomFieldListItem,
  CustomObjectDefinition,
  CustomRelationshipDefinition,
  UpdateCustomFieldDefinitionRequest,
} from "@/types";
import { useRouter } from "next/navigation";

export const useCustomInfo = (companyId: string) => {
  const [loading, setLoading] = useState(true);
  const [companyFields, setCompanyFields] = useState<CustomFieldDefinition[]>([]);
  const [companyRelationships, setCompanyRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [projectFields, setProjectFields] = useState<CustomFieldDefinition[]>([]);
  const [projectRelationships, setProjectRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [userFields, setUserFields] = useState<CustomFieldDefinition[]>([]);
  const [userRelationships, setUserRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [customObjectDefinitions, setCustomObjectDefinitions] = useState<CustomObjectDefinition[]>([]);
  const api = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();
  const router = useRouter();

  const companyItems = useMemo(() => {
    return [
      ...companyFields,
      ...companyRelationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [companyFields, companyRelationships]);

  const projectItems = useMemo(() => {
    return [
      ...projectFields,
      ...projectRelationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [projectFields, projectRelationships]);

  const userItems = useMemo(() => {
    return [
      ...userFields,
      ...userRelationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [userFields, userRelationships]);

  useEffect(() => {
    getCustomFieldDefinitions(companyId);
    getCustomObjectDefinitions(companyId);
  }, [companyId]);

  const getCustomFieldDefinitions = async (companyId: string) => {
    try {
      const response = await api.getCustomFieldDefinitions(companyId);

      if (response) {
        setCompanyFields(response.company_fields);
        setCompanyRelationships(response.company_relationships);
        setProjectFields(response.project_fields);
        setProjectRelationships(response.project_relationships);
        setUserFields(response.user_fields);
        setUserRelationships(response.user_relationships);
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

  const createCustomFieldDefinition = async (request: CreateCustomFieldDefinitionRequest) => {
    setLoading(true);

    try {
      const response = await api.createCustomFieldDefinition(request);

      if (response) {
        switch (request.entity_type) {
          case CustomFieldEntityType.Project:
            setProjectFields([
              ...projectFields,
              response
            ]);
            break;
          case CustomFieldEntityType.User:
            setUserFields([
              ...userFields,
              response
            ]);
            break;
          case CustomFieldEntityType.Company:
            setCompanyFields([
              ...companyFields,
              response
            ]);
            break;
        }
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const updateCustomFieldDefinition = async (definitionId: string, request: UpdateCustomFieldDefinitionRequest, entityType: CustomFieldEntityType) => {
    setLoading(true);

    try {
      const response = await api.updateCustomFieldDefinition(definitionId, request);

      if (response) {
        switch (entityType) {
          case CustomFieldEntityType.Project:
            setProjectFields([
              ...projectFields,
              response
            ]);
            break;
          case CustomFieldEntityType.User:
            setUserFields([
              ...userFields,
              response
            ]);
            break;
          case CustomFieldEntityType.Company:
            setCompanyFields([
              ...companyFields,
              response
            ]);
            break;
        }
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const createCustomRelationshipDefinition = async (request: CreateCustomRelationshipDefinitionRequest) => {
    setLoading(true);

    try {
      const response = await api.createCustomRelationshipDefinition(request);

      if (response) {
        switch (request.source_entity_type) {
          case CustomFieldEntityType.Project:
            setProjectRelationships([
              ...projectRelationships,
              response
            ]);
            break;
          case CustomFieldEntityType.User:
            setUserRelationships([
              ...userRelationships,
              response
            ]);
            break;
          case CustomFieldEntityType.Company:
            setCompanyRelationships([
              ...companyRelationships,
              response
            ]);
            break;
        }
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const updateCustomRelationshipDefinition = async (definitionId: string, request: UpdateCustomFieldDefinitionRequest, entityType: CustomFieldEntityType) => {
    setLoading(true);

    try {
      const response = await api.updateCustomRelationshipDefinition(definitionId, request);

      if (response) {
        switch (entityType) {
          case CustomFieldEntityType.Project:
            setProjectRelationships([
              ...projectRelationships,
              response
            ]);
            break;
          case CustomFieldEntityType.User:
            setUserRelationships([
              ...userRelationships,
              response
            ]);
            break;
          case CustomFieldEntityType.Company:
            setCompanyRelationships([
              ...companyRelationships,
              response
            ]);
            break;
        }
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const createCustomObjectDefinition = async (request: CreateCustomObjectDefinitionRequest) => {
    setLoading(true);

    try {
      const response = await api.createCustomObjectDefinition(request);

      if (response?.id) {
        router.push(`/custom-objects/${response.id}`);
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  }

  const onUpdateCompanyItemsOrder = (newItems: CustomFieldListItem[]) => {
    const newFields = companyFields.map((f) => {
      const sort_order = newItems.find((i) => i.id === f.id)?.sort_order ?? 0;
      return { ...f, sort_order }
    });
    setCompanyFields(newFields);

    const newRelationships = companyRelationships.map((r) => {
      const sort_order = newItems.find((i) => i.id === r.id)?.sort_order ?? 0;
      return { ...r, sort_order }
    });
    setCompanyRelationships(newRelationships);

    updateSortOrder(newFields, newRelationships);
  };

  const onUpdateUserItemsOrder = (newItems: CustomFieldListItem[]) => {
    const newFields = userFields.map((f) => {
      const sort_order = newItems.find((i) => i.id === f.id)?.sort_order ?? 0;
      return { ...f, sort_order }
    });
    setUserFields(newFields);

    const newRelationships = userRelationships.map((r) => {
      const sort_order = newItems.find((i) => i.id === r.id)?.sort_order ?? 0;
      return { ...r, sort_order }
    });
    setUserRelationships(newRelationships);

    updateSortOrder(newFields, newRelationships);
  };

  const onUpdateProjectItemsOrder = (newItems: CustomFieldListItem[]) => {
    const newFields = projectFields.map((f) => {
      const sort_order = newItems.find((i) => i.id === f.id)?.sort_order ?? 0;
      return { ...f, sort_order }
    });
    setProjectFields(newFields);

    const newRelationships = projectRelationships.map((r) => {
      const sort_order = newItems.find((i) => i.id === r.id)?.sort_order ?? 0;
      return { ...r, sort_order }
    });
    setProjectRelationships(newRelationships);

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

  return {
    loading,
    companyItems,
    onUpdateCompanyItemsOrder,
    userItems,
    onUpdateUserItemsOrder,
    projectItems,
    onUpdateProjectItemsOrder,
    customObjectDefinitions,
    createCustomFieldDefinition,
    updateCustomFieldDefinition,
    createCustomRelationshipDefinition,
    updateCustomRelationshipDefinition,
    createCustomObjectDefinition,
  };
};
