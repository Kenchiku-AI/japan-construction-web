"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { CreateCustomObjectRequest, CustomFieldEntityType, CustomObjectDefinitionDetail, CustomObjectsByDefinition, Project, UpdateCustomObjectRequest, UpdateUserRequest, User, UserOrGuest } from "@/types";

export const useUser = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<UserOrGuest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [customRelationships, setCustomRelationships] = useState<Record<string, string[]>>({});
  const [customObjectsByDefinition, setCustomObjectsByDefinition] = useState<CustomObjectsByDefinition>({});
  const { currentUser, setCurrentUser, ...api } = useApi();
  const router = useRouter();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  useEffect(() => {
    if (!user?.company_id) return;
    const relationshipDefs = user.custom_relationships.map((r) => r.definition);

    const needsProjects = !projects.length && relationshipDefs.find((r) => (
      r.target_entity_type === CustomFieldEntityType.Project
    ));
    if (needsProjects) {
      getProjects();
    }

    const needsUsers = !users.length && relationshipDefs.find((r) => (
      r.target_entity_type === CustomFieldEntityType.User
    ));
    if (needsUsers) {
      getUsers();
    }

    const targetIds = relationshipDefs.map((r) => r.target_custom_object_definition_id);
    const definitionIds = targetIds.filter((id) => id != null);
    if (!!definitionIds.length) {
      getCustomObjectsByDefinitionId(user.company_id, definitionIds);
    }
  }, [user?.custom_relationships]);

  const getUsers = useCallback(async () => {
    const companyId = user?.company_id;
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
  }, [user?.company_id]);

  const getProjects = useCallback(async () => {
    const companyId = user?.company_id;
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
  }, [user?.company_id]);

  const getCustomObjectsByDefinitionId = async (company_id: string, definition_ids: string[]) => {
    try {
      const request = { company_id, definition_ids };
      const response = await api.getCustomObjectsByDefinition(request);

      if (response) {
        setCustomObjectsByDefinition(response);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const customFieldDefinitions = useMemo(() => {
    if (!user) return [];

    const fields = user?.custom_fields.map((f) => f.definition);

    const relationships = Array.from(
      new Map(
        user?.custom_relationships.map((r) => [r.definition.id, r.definition])
      ).values()
    );

    return [
      ...fields,
      ...relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [
    user?.custom_fields,
    user?.custom_relationships
  ]);

  useEffect(() => {
    if (!user) return;

    const newFields: Record<string, string> = {};
    user.custom_fields.forEach((f) => {
      if (f.value) newFields[f.definition.id] = f.value;
    });
    setCustomFields(newFields);

    const newRelationships: Record<string, string[]> = {};
    user.custom_relationships.forEach((r) => {
      newRelationships[r.definition.id] = [
        ...(newRelationships?.[r.definition.id] ?? []),
        r.target_entity_id as string
      ];
    });
    setCustomRelationships(newRelationships);
  }, [user?.custom_fields, user?.custom_relationships]);

  const updateCustomField = useCallback(async (itemId: string) => {
    if (!user) return;
    const field = user.custom_fields.find((f) => f.definition.id === itemId);

    if (field) {
      const value = customFields[itemId] ?? "";

      try {
        let response;

        if (field.id) {
          response = await api.updateCustomField(field.id, { value });
        } else if (value) {
          const request = {
            value,
            custom_field_definition_id: itemId
          };
          response = await api.createUserCustomField(userId, request);
        }

        if (response) {
          setUser((prev) => {
            if (!prev) return prev;

            const fieldIndex = prev.custom_fields.findIndex((f) => f.definition.id === itemId);
            if (fieldIndex === -1) return prev;

            const newFields = [...prev.custom_fields];
            newFields[fieldIndex] = response;

            return {
              ...prev,
              custom_fields: newFields
            }
          });
        }
      } catch (e) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
        resetCustomField(itemId);
      }
    } else {
      const request = {
        source_entity_id: userId,
        target_entity_ids: customRelationships[itemId].filter(Boolean)
      };

      try {
        const response = await api.updateCustomRelationship(itemId, request);

        if (response) {
          setUser((prev) => {
            if (!prev) return prev;

            const otherRelationships = prev.custom_relationships.filter((r) => r.definition.id !== itemId);
            const newRelationships = response;

            if (!newRelationships.length) {
              const definition = prev.custom_relationships.find((r) => r.definition.id === itemId)?.definition;

              if (definition) {
                newRelationships.push(
                  {
                    source_entity_id: userId,
                    definition
                  }
                )
              }
            }

            return {
              ...prev,
              custom_relationships: [
                ...otherRelationships,
                ...newRelationships
              ]
            }
          });
        }
      } catch (e) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
        resetCustomField(itemId);
      }
    }
  }, [user, customFields, customRelationships]);

  const resetCustomField = useCallback((itemId: string) => {
    if (!user) return;
    const field = user.custom_fields.find((f) => f.definition.id === itemId);

    if (field) {
      const { value } = field;

      if (value) {
        setCustomFields((prev) => ({
          ...prev,
          [itemId]: value
        }));
      } else {
        setCustomFields((prev) => {
          let newFields = { ...prev };
          delete newFields[itemId];
          return newFields;
        });
      }
    } else {
      const relationships = user.custom_relationships.filter((r) => r.definition.id === itemId);
      const targetIds = relationships.map((r) => r.target_entity_id);
      setCustomRelationships((prev) => ({
        ...prev,
        [itemId]: targetIds as string[]
      }));
    }
  }, [user]);

  const getUser = useCallback(
    async (userId: string) => {
      try {
        const response = await api.getUser(userId);
        setUser(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_user_error_description"),
        });

        router.replace("/");
      }

      setLoading(false);
    },
    [currentUser, userId],
  );

  const updateUser = useCallback(
    async (request: UpdateUserRequest) => {
      if (!currentUser) return;

      try {
        const response = await api.updateUser(userId, request);
        setUser(response);

        if (userId === currentUser.id) {
          setCurrentUser({
            ...currentUser,
            ...response,
          });
        }

        // showModal({
        //   title: t("success"),
        //   subtitle: t("user_updated"),
        // });
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_user_error_description"),
        });
      }
    },
    [userId, currentUser],
  );

  const getCustomObject = async (customObjectId: string) => {
    let object: CustomObject | undefined;
    setLoading(true);

    try {
      object = await api.getCustomObject(customObjectId);

      console.log("object response", object);
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
    return object;
  };

  const refreshCustomObjectsByDefinition = useCallback(async () => {
    if (!user?.company_id) return;

    const relationshipDefs = user.custom_relationships.map((r) => r.definition);
    const targetIds = relationshipDefs.map((r) => r.target_custom_object_definition_id);
    const definitionIds = targetIds.filter((id) => id != null);

    if (!!definitionIds.length) {
      getCustomObjectsByDefinitionId(user.company_id, definitionIds);
    }
  }, [user]);

  const getCustomObjectDefinition = async (customObjectDefinitionId: string) => {
    let objectDefition: CustomObjectDefinitionDetail | undefined;
    setLoading(true);

    try {
      objectDefition = await api.getCustomObjectDefinition(customObjectDefinitionId);
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
    return objectDefition;
  };

  const createCustomObject = async (request: CreateCustomObjectRequest) => {
    setLoading(true);

    try {
      await api.createCustomObject(request);
      refreshCustomObjectsByDefinition();
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
      await api.updateCustomObject(objectId, request);
      refreshCustomObjectsByDefinition();
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
      refreshCustomObjectsByDefinition();
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
    user,
    updateUser,
    customFieldDefinitions,
    customFields,
    setCustomFields,
    customRelationships,
    setCustomRelationships,
    customObjectsByDefinition,
    updateCustomField,
    resetCustomField,
    projects,
    users,
    getCustomObject,
    createCustomObject,
    updateCustomObject,
    deleteCustomObject,
    getCustomObjectDefinition,
  };
};
