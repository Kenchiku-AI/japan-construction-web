"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  CompanyGuest,
  CompanyUser,
  Conversation,
  CreateConversationItemRequest,
  CreateConversationRequest,
  CreateCustomObjectRequest,
  CreateReportRequest,
  CustomFieldEntityType,
  CustomObject,
  CustomObjectDefinitionDetail,
  CustomObjectsByDefinition,
  Project,
  ProjectConversationItems,
  UpdateConversationItemRequest,
  UpdateConversationRequest,
  UpdateCustomObjectRequest,
  UpdateCustomRelationshipRequest,
  UpdateProjectRequest,
  UserRole,
} from "@/types";
import { useModal } from "@/lib/modal/ModalContext";
import { useBilling } from "@/lib/useBilling";

export const useProject = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project>();
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [customRelationships, setCustomRelationships] = useState<Record<string, string[]>>({});
  const [customObjectsByDefinition, setCustomObjectsByDefinition] = useState<CustomObjectsByDefinition>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectGuests, setProjectGuests] = useState<CompanyGuest[]>([]);
  const [nonProjectGuests, setNonProjectGuests] = useState<CompanyGuest[]>([]);
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([]);
  const router = useRouter();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const { currentUser, ...api } = useApi();
  const { isBillingError } = useBilling();

  useEffect(() => {
    if (!projectId) return;

    getProject(projectId);
  }, [projectId]);

  useEffect(() => {
    if (!project) return;
    const relationshipDefs = project.custom_relationships.map((r) => r.definition);

    const needsProjects = !projects.length && relationshipDefs.find((r) => (
      r.target_entity_type === CustomFieldEntityType.Project
    ));
    if (needsProjects) {
      getProjects();
    }

    const targetIds = relationshipDefs.map((r) => r.target_custom_object_definition_id);
    const definitionIds = targetIds.filter((id) => id != null);
    if (!!definitionIds.length) {
      getCustomObjectsByDefinitionId(project.company_id, definitionIds);
    }
  }, [project?.custom_relationships]);

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

  const getProjects = useCallback(async () => {
    const companyId = project?.company_id;
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
  }, [project?.company_id]);

  const customFieldDefinitions = useMemo(() => {
    if (!project) return [];

    const fields = project?.custom_fields.map((f) => f.definition);

    const relationships = Array.from(
      new Map(
        project?.custom_relationships.map((r) => [r.definition.id, r.definition])
      ).values()
    );

    return [
      ...fields,
      ...relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [
    project?.custom_fields,
    project?.custom_relationships
  ]);

  useEffect(() => {
    if (!project) return;

    const newFields: Record<string, string> = {};
    project.custom_fields.forEach((f) => {
      if (f.value) newFields[f.definition.id] = f.value;
    });
    setCustomFields(newFields);

    const newRelationships: Record<string, string[]> = {};
    project.custom_relationships.forEach((r) => {
      newRelationships[r.definition.id] = [
        ...(newRelationships?.[r.definition.id] ?? []),
        r.target_entity_id as string
      ];
    });
    setCustomRelationships(newRelationships);
  }, [project?.custom_fields, project?.custom_relationships]);

  const updateCustomField = useCallback(async (itemId: string) => {
    if (!project) return;
    const field = project.custom_fields.find((f) => f.definition.id === itemId);

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
          response = await api.createProjectCustomField(project.id, request);
        }

        if (response) {
          setProject((prev) => {
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
        source_entity_id: project.id,
        target_entity_ids: customRelationships[itemId].filter(Boolean)
      };

      updateCustomRelationship(request, itemId);
    }
  }, [project, customFields, customRelationships]);

  const updateCustomRelationship = async (request: UpdateCustomRelationshipRequest, itemId: string) => {
    try {
      const response = await api.updateCustomRelationship(itemId, request);

      if (response) {
        setProject((prev) => {
          if (!prev) return prev;

          const otherRelationships = prev.custom_relationships.filter((r) => r.definition.id !== itemId);
          const newRelationships = response;

          if (!newRelationships.length) {
            const definition = prev.custom_relationships.find((r) => r.definition.id === itemId)?.definition;

            if (definition) {
              newRelationships.push(
                {
                  source_entity_id: projectId,
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
  };

  const resetCustomField = useCallback((itemId: string) => {
    if (!project) return;
    const field = project.custom_fields.find((f) => f.definition.id === itemId);

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
      const relationships = project.custom_relationships.filter((r) => r.definition.id === itemId);
      const targetIds = relationships.map((r) => r.target_entity_id);
      setCustomRelationships((prev) => ({
        ...prev,
        [itemId]: targetIds as string[]
      }));
    }
  }, [project]);

  const getProject = useCallback(
    async (projectId: string, redirectOnError: boolean = true) => {
      setLoading(true);

      try {
        const response = await api.getProject(projectId);
        setProject(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_project_error_description"),
        });

        if (redirectOnError) {
          if (currentUser?.role === UserRole.Admin) {
            router.replace("/projects");
          } else {
            router.replace("/");
          }
        }
      }
      setLoading(false);
    },
    [setProject, currentUser],
  );

  const getCompanyGuests = useCallback(
    async (companyId: string) => {
      try {
        const response = await api.getGuests(companyId);

        const newProjectGuests: CompanyGuest[] = [];
        const newNonProjectGuests: CompanyGuest[] = [];

        response?.forEach((g) => {
          const inProject = g.projects.some((p) => p.project_id === projectId);

          if (inProject) {
            newProjectGuests.push(g);
          } else {
            newNonProjectGuests.push(g);
          }
        });

        setProjectGuests(newProjectGuests);
        setNonProjectGuests(newNonProjectGuests);
      } catch (err) { }
    },
    [projectId],
  );

  const getCompanyUsers = useCallback(
    async (companyId: string) => {
      try {
        const response = await api.getUsers(companyId);

        if (response) {
          setCompanyUsers(response);
        }
      } catch (err) { }
    },
    [projectId],
  );

  const updateProject = useCallback(
    async (request: UpdateProjectRequest) => {
      if (!project) return;

      setLoading(true);

      try {
        const response = await api.updateProject(project.id, request);
        setProject(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_project_error_description"),
        });

        if (currentUser?.role === UserRole.Admin) {
          router.replace("/projects");
        } else {
          router.replace("/");
        }
      }
      setLoading(false);
    },
    [project, api],
  );

  const getConversationItems = useCallback(
    async (itemTypeId: string) => {
      setLoading(true);

      let items: ProjectConversationItems | undefined;

      try {
        items = await api.getConversationItems(projectId, itemTypeId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }

      return items;
    },
    [api],
  );

  const createConversationItem = useCallback(
    async (request: CreateConversationItemRequest) => {
      setLoading(true);

      try {
        await api.createConversationItem(request);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [api],
  );

  const refreshCustomObjectsByDefinition = useCallback(async () => {
    if (!project) return;

    const relationshipDefs = project.custom_relationships.map((r) => r.definition);
    const targetIds = relationshipDefs.map((r) => r.target_custom_object_definition_id);
    const definitionIds = targetIds.filter((id) => id != null);


    if (!!definitionIds.length) {
      getCustomObjectsByDefinitionId(project.company_id, definitionIds);
    }
  }, [project]);

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

  const updateConversationItem = useCallback(
    async (conversationItemId: string, request: UpdateConversationItemRequest) => {
      setLoading(true);

      try {
        await api.updateConversationItem(conversationItemId, request);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [api],
  );

  const deleteConversationItem = useCallback(
    async (conversationItemId: string) => {
      setLoading(true);

      try {
        await api.deleteConversationItem(conversationItemId);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [api],
  );

  const createConversation = useCallback(
    async (request: CreateConversationRequest) => {
      setLoading(true);

      let conversation: Conversation | undefined;

      try {
        conversation = await api.createConversation(request);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }

      return conversation;
    },
    [api],
  );

  const updateConversation = useCallback(
    async (conversationId: string, request: UpdateConversationRequest) => {
      setLoading(true);

      try {
        await api.updateConversation(conversationId, request);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [api],
  );

  const deleteConversation = useCallback(
    async (conversationId: string) => {
      setLoading(true);

      try {
        await api.deleteConversation(conversationId);
        getProject(projectId);
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [api],
  );

  const createReport = useCallback(
    async (request: CreateReportRequest) => {
      setLoading(true);

      try {
        const response = await api.createReport(request);

        if (response) {
          router.push(`/reports/${response.id}?name=${response.name}`);
        }
      } catch (err) {
        setLoading(false);

        if (isBillingError(err)) {
          return;
        }

        showModal({
          title: t("error"),
          subtitle: t("create_report_error_description"),
        });
      }
    },
    [api],
  );

  const inviteGuest = useCallback(
    async (email: string, firstName?: string, lastName?: string) => {
      setLoading(true);

      try {
        const request = {
          email,
          project_id: projectId,
          first_name: firstName,
          last_name: lastName,
        };
        await api.inviteGuest(request);

        if (project?.company_id) {
          getCompanyGuests(project.company_id);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("invitation_send_error_description"),
        });
      }

      setLoading(false);
    },
    [projectId, project?.company_id],
  );

  const removeGuest = useCallback(
    async (guest: CompanyGuest) => {
      setLoading(true);

      try {
        const guestProject = guest.projects.find((p) => p.project_id === projectId);
        if (!guestProject) return;

        await api.removeGuest(projectId, guestProject.guest_link_id);

        if (guest.id === currentUser?.id) {
          const isLast = !currentUser.company && guest.projects.length <= 1;

          await api.refreshCurrentUser();

          if (!isLast) {
            router.replace("/");
          }
        } else if (project?.company_id) {
          getCompanyGuests(project.company_id);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_user_error_description"),
        });
      }

      setLoading(true);
    },
    [projectId, project?.company_id],
  );

  const deleteProject = useCallback(
    async () => {
      setLoading(true);

      try {
        await api.deleteProject(projectId);
        router.replace("/projects");
      } catch (err) {
        setLoading(false);

        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }
    },
    [projectId, api],
  );

  const statusOptions = [
    { label: t("active"), value: "active" },
    { label: t("completed"), value: "completed" },
  ];

  return {
    loading,
    project,
    updateProject,
    createReport,
    statusOptions,
    projectGuests,
    nonProjectGuests,
    getCompanyGuests,
    inviteGuest,
    removeGuest,
    companyUsers,
    getCompanyUsers,
    createConversation,
    updateConversation,
    deleteConversation,
    getConversationItems,
    createConversationItem,
    updateConversationItem,
    deleteConversationItem,
    createCustomObject,
    getCustomObject,
    updateCustomObject,
    deleteCustomObject,
    getCustomObjectDefinition,
    deleteProject,
    customFieldDefinitions,
    customFields,
    setCustomFields,
    customRelationships,
    setCustomRelationships,
    customObjectsByDefinition,
    updateCustomField,
    resetCustomField,
    projects
  };
};
