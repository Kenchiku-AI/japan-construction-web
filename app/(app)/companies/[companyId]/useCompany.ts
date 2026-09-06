"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { Company, CompanyGuest } from "@/types/companies";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { CustomFieldEntityType, CustomObjectsByDefinition, ReportTemplate, ReportTemplateRequest } from "@/types";

export const useCompany = (companyId: string) => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>();
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [customRelationships, setCustomRelationships] = useState<Record<string, string[]>>({});
  const [customObjectsByDefinition, setCustomObjectsByDefinition] = useState<CustomObjectsByDefinition>({});
  const [guests, setGuests] = useState<CompanyGuest[]>();
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser, ...api } = useApi();
  const { showModal } = useModal();

  useEffect(() => {
    getCompany(companyId);

    if (currentUser?.role === "admin") {
      getTemplates(companyId);
    }
  }, [companyId]);

  useEffect(() => {
    if (!company) return;
    const relationshipDefs = company.custom_relationships.map((r) => r.definition);

    const needsGuests = guests == null && relationshipDefs.find((r) => (
      r.target_entity_type === CustomFieldEntityType.User
    ));
    if (needsGuests) {
      getGuests();
    }

    const targetIds = relationshipDefs.map((r) => r.target_custom_object_definition_id);
    const definitionIds = targetIds.filter((id) => id != null);

    console.log("relationship defs", relationshipDefs);
    console.log("DEFINITION IDS", definitionIds);

    if (!!definitionIds.length) {
      getCustomObjectsByDefinitionId(company.id, definitionIds);
    }
  }, [company?.custom_relationships]);

  const getGuests = async () => {
    if (!companyId) return;

    try {
      const guestResponse = await api.getGuests(companyId);
      setGuests(guestResponse);
    } catch (err) {
      // console.log(err);
    }
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

  const customFieldDefinitions = useMemo(() => {
    if (!company) return [];

    const fields = company?.custom_fields.map((f) => f.definition);

    const relationships = Array.from(
      new Map(
        company?.custom_relationships.map((r) => [r.definition.id, r.definition])
      ).values()
    );

    return [
      ...fields,
      ...relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [
    company?.custom_fields,
    company?.custom_relationships
  ]);

  useEffect(() => {
    if (!company) return;

    const newFields: Record<string, string> = {};
    company.custom_fields.forEach((f) => {
      if (f.value) newFields[f.definition.id] = f.value;
    });
    setCustomFields(newFields);

    const newRelationships: Record<string, string[]> = {};
    company.custom_relationships.forEach((r) => {
      newRelationships[r.definition.id] = [
        ...(newRelationships?.[r.definition.id] ?? []),
        r.target_entity_id as string
      ];
    });
    setCustomRelationships(newRelationships);
  }, [company?.custom_fields, company?.custom_relationships]);

  const updateCustomField = useCallback(async (itemId: string) => {
    if (!company) return;
    const field = company.custom_fields.find((f) => f.definition.id === itemId);

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
          response = await api.createCompanyCustomField(company.id, request);
        }

        if (response) {
          setCompany((prev) => {
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
        source_entity_id: company.id,
        target_entity_ids: customRelationships[itemId].filter(Boolean)
      };

      try {
        const response = await api.updateCustomRelationship(itemId, request);

        if (response) {
          setCompany((prev) => {
            if (!prev) return prev;

            const otherRelationships = prev.custom_relationships.filter((r) => r.definition.id !== itemId);
            const newRelationships = response;

            if (!newRelationships.length) {
              const definition = prev.custom_relationships.find((r) => r.definition.id === itemId)?.definition;

              if (definition) {
                newRelationships.push(
                  {
                    source_entity_id: companyId,
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
  }, [company, customFields, customRelationships]);

  const resetCustomField = useCallback((itemId: string) => {
    if (!company) return;
    const field = company.custom_fields.find((f) => f.definition.id === itemId);

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
      const relationships = company.custom_relationships.filter((r) => r.definition.id === itemId);
      const targetIds = relationships.map((r) => r.target_entity_id);
      setCustomRelationships((prev) => ({
        ...prev,
        [itemId]: targetIds as string[]
      }));
    }
  }, [company]);

  const getCompany = useCallback(
    async (companyId: string) => {
      setLoading(true);

      try {
        const response = await api.getCompany(companyId);
        setCompany(response);
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  const getTemplates = useCallback(
    async (companyId: string) => {
      try {
        const response = await api.getReportTemplates(companyId);
        setTemplates(response ?? []);
      } catch (err) { }
    },
    [companyId],
  );

  const updateName = useCallback(
    async (name: string) => {
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { name });

        if (company && response) {
          setCompany({
            ...company,
            name: response.name,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [company, companyId],
  );

  const updateLineChannelSecret = useCallback(
    async (line_channel_secret: string) => {
      let success = true;
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { line_channel_secret });

        if (company && response) {
          setCompany({
            ...company,
            line_channel_secret_last4: response.line_channel_secret_last4,
          });
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description")
        });
        success = false;
      }

      setLoading(false);
      return success;
    },
    [company, companyId],
  );

  const updateLineChannelAccessToken = useCallback(
    async (line_channel_access_token: string) => {
      let success = true;
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { line_channel_access_token });

        if (company && response) {
          setCompany({
            ...company,
            line_channel_access_token_last5: response.line_channel_access_token_last5,
            line_channel_access_token_invalid: response.line_channel_access_token_invalid
          });
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description")
        });
        success = false;
      }

      setLoading(false);
      return success;
    },
    [company, companyId],
  );

  const updateBillingPlan = useCallback(
    async (billingPlanId: string) => {
      setLoading(true);

      try {
        const billing_plan_id = billingPlanId === "none" ? null : billingPlanId;
        const response = await api.updateCompany(companyId, { billing_plan_id });

        if (company && response) {
          setCompany({
            ...company,
            billing_plan_id: response.billing_plan_id,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [company, companyId],
  );

  const updatePaidFeaturesDisabled = useCallback(
    async (paid_features_force_disabled: boolean) => {
      setLoading(true);

      try {
        const response = await api.updateCompany(companyId, { paid_features_force_disabled });

        if (company && response) {
          setCompany({
            ...company,
            paid_features_force_disabled: response.paid_features_force_disabled,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [company, companyId],
  );

  const createProject = useCallback(
    async (name: string, description?: string) => {
      if (!company) return;

      setLoading(true);

      try {
        const request = { name, description, company_id: company.id };
        const response = await api.createProject(request);

        if (!response) {
          throw Error();
        }

        router.push(`/projects/${response.id}?name=${response.name}`);
      } catch (err) {
        setLoading(false);
        showModal({
          title: t("error"),
          subtitle: t("create_project_error_description"),
        });
      }
    },
    [company],
  );

  const createTemplate = useCallback(
    async (request: ReportTemplateRequest) => {
      setLoading(true);

      try {
        await api.createReportTemplate(request, companyId);
        await getTemplates(companyId);
      } finally {
        setLoading(false);
      }
    },
    [companyId, getTemplates],
  );

  const removeUser = useCallback(
    async (userId: string) => {
      setLoading(true);

      try {
        await api.removeUser(userId);

        if (userId === currentUser?.id) {
          await api.refreshCurrentUser();
          router.replace("/");
        } else {
          getCompany(companyId);
        }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_user_error_description"),
        });
      }

      setLoading(true);
    },
    [currentUser],
  );



  return {
    loading,
    company,
    createProject,
    updateName,
    updateLineChannelSecret,
    updateLineChannelAccessToken,
    updateBillingPlan,
    updatePaidFeaturesDisabled,
    templates,
    createTemplate,
    removeUser,
    getCompany,
    customFieldDefinitions,
    customFields,
    setCustomFields,
    customRelationships,
    setCustomRelationships,
    customObjectsByDefinition,
    updateCustomField,
    resetCustomField,
    guests,
  };
};
