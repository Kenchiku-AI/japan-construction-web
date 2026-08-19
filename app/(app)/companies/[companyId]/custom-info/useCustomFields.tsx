"use client";

import { useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import {
  CreateCustomFieldDefinitionRequest,
  CreateCustomRelationshipDefinitionRequest,
  CustomFieldDefinition,
  CustomFieldEntityType,
  CustomObjectDefinition,
  CustomRelationshipDefinition,
} from "@/types";

export const useCustomFields = (companyId: string) => {
  const [loading, setLoading] = useState(true);
  const [companyFields, setCompanyFields] = useState<CustomFieldDefinition[]>([]);
  const [companyRelationships, setCompanyRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [projectFields, setProjectFields] = useState<CustomFieldDefinition[]>([]);
  const [projectRelationships, setProjectRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [userFields, setUserFields] = useState<CustomFieldDefinition[]>([]);
  const [userRelationships, setUserRelationships] = useState<CustomRelationshipDefinition[]>([]);
  const [customObjects, setCustomObjects] = useState<CustomObjectDefinition[]>([]);
  const api = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

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
  }, [companyId]);

  const getCustomFieldDefinitions = async (companyId: string) => {
    try {
      const response = await api.getCustomFieldDefinitions(companyId);

      if (response) {
        setCompanyFields(response.company_fields);
        setProjectFields(response.project_fields);
        setUserFields(response.user_fields);
        setCustomObjects(response.custom_objects);
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

  return {
    loading,
    companyItems,
    userItems,
    projectItems,
    customObjects,
    createCustomFieldDefinition,
    createCustomRelationshipDefinition,
  };
};
