"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { CreateCustomFieldDefinitionRequest, CustomFieldDefinition, CustomFieldEntityType, CustomObject, UpdateUserRequest, User } from "@/types";

export const useCustomFields = (companyId: string) => {
  const [loading, setLoading] = useState(true);
  const [companyFields, setCompanyFields] = useState<CustomFieldDefinition[]>([]);
  const [projectFields, setProjectFields] = useState<CustomFieldDefinition[]>([]);
  const [userFields, setUserFields] = useState<CustomFieldDefinition[]>([]);
  const [customObjects, setCustomObjects] = useState<CustomObject[]>([]);
  const api = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

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

  return {
    loading,
    companyFields,
    userFields,
    projectFields,
    createCustomFieldDefinition,
    customObjects,
  };
};
