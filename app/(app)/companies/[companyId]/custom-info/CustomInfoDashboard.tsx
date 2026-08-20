"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/ui/Loader";
import { useFeatures } from "@/lib/useFeatures";
import { cardClass } from "@/lib/constants";
import CustomFieldsList from "../../../custom-objects/[customObjectDefinitionId]/CustomFieldsList";
import { useCustomInfo } from "./useCustomInfo";
import CreateCustomFieldModal from "./CreateCustomFieldModal";
import EditCustomFieldModal from "./EditCustomFieldModal";
import { CustomFieldDataType, CustomFieldDefinition, CustomFieldEntityType, CustomRelationshipType } from "@/types";
import CustomObjectsList from "./CustomObjectsList";
import CreateCustomObjectModal from "./CreateCustomObjectModal";

interface CustomInfoDashboardProps {
  companyId: string;
}

const CustomInfoDashboard: FC<CustomInfoDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isFormsEnabled } = useFeatures();
  const { currentUser } = useApi();
  const {
    companyItems,
    onUpdateCompanyItemsOrder,
    projectItems,
    onUpdateProjectItemsOrder,
    userItems,
    onUpdateUserItemsOrder,
    customObjectDefinitions,
    createCustomFieldDefinition,
    createCustomRelationshipDefinition,
    createCustomObjectDefinition,
    loading
  } = useCustomInfo(companyId);
  const [showCreateCustomObject, setShowCreateCustomObject] = useState(false);
  const [createCustomFieldType, setCreateCustomFieldType] = useState("");
  const [editCustomField, setEditCustomField] = useState<CustomFieldDefinition>();

  useEffect(() => {
    if (!isFormsEnabled) {
      router.push("/home");
    }
  }, [isFormsEnabled]);

  return !currentUser ? null : (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("custom_info")} />
        <Button
          variant="tertiary"
          label={t("create_custom_object")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateCustomObject(true);
          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        <CustomObjectsList
          objects={customObjectDefinitions}
          isEmpty={customObjectDefinitions.length === 0 && !loading}
          onClickObject={(o) => {
            router.push(`/custom-objects/${o.id}`)
          }}
        />
      </div>
      <div>
        {/* Company */}
        <div className="flex justify-between mt-12">
          <div className="self-end">{t("custom_company_fields")}</div>
          <Button
            variant="tertiary"
            label={t("create_field")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setCreateCustomFieldType("company");
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        </div>
        <div className={cardClass}>
          <CustomFieldsList
            items={companyItems}
            customObjects={customObjectDefinitions}
            isEmpty={companyItems.length === 0 && !loading}
            onChangeOrder={(newItems) => {
              onUpdateCompanyItemsOrder(newItems);
            }}
            onEdit={(i) => {

            }}
            onDelete={(i) => {

            }}
          />
        </div>

        {/* User */}
        <div className="flex justify-between mt-12">
          <div className="self-end">{t("custom_user_fields")}</div>
          <Button
            variant="tertiary"
            label={t("create_field")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setCreateCustomFieldType("user");
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        </div>
        <div className={cardClass}>
          <CustomFieldsList
            items={userItems}
            customObjects={customObjectDefinitions}
            isEmpty={userItems.length === 0 && !loading}
            onChangeOrder={(newItems) => {
              onUpdateUserItemsOrder(newItems);
            }}
            onEdit={(i) => {

            }}
            onDelete={(i) => {

            }}
          />
        </div>

        {/* Project */}
        <div className="flex justify-between mt-12">
          <div className="self-end">{t("custom_project_fields")}</div>
          <Button
            variant="tertiary"
            label={t("create_field")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setCreateCustomFieldType("project");
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        </div>
        <div className={cardClass}>
          <CustomFieldsList
            items={projectItems}
            customObjects={customObjectDefinitions}
            isEmpty={projectItems.length === 0 && !loading}
            onChangeOrder={(newItems) => {
              onUpdateProjectItemsOrder(newItems)
            }}
            onEdit={(i) => {

            }}
            onDelete={(i) => {

            }}
          />
        </div>
      </div>
      <CreateCustomObjectModal
        isOpen={showCreateCustomObject}
        onClose={() => {
          setShowCreateCustomObject(false);
        }}
        onCreate={async (name, description) => {
          setShowCreateCustomObject(false);
          createCustomObjectDefinition({
            name,
            description,
            company_id: companyId
          });
        }}
      />
      <CreateCustomFieldModal
        isOpen={!!createCustomFieldType}
        ownerType={createCustomFieldType}
        customObjects={customObjectDefinitions}
        onClose={() => {
          setCreateCustomFieldType("");
        }}
        onCreate={async (name, description, fieldType, relationshipType, relationshipTarget) => {
          if (fieldType === "relationship") {
            const entityTypes: string[] = [
              CustomFieldEntityType.Company,
              CustomFieldEntityType.Project,
              CustomFieldEntityType.User
            ];
            const isCustomObject = !entityTypes.includes(relationshipTarget ?? "");
            const target_entity_type = isCustomObject ? CustomFieldEntityType.CustomObject : relationshipTarget as CustomFieldEntityType;

            createCustomRelationshipDefinition({
              name,
              description,
              source_entity_type: createCustomFieldType as CustomFieldEntityType,
              target_entity_type,
              target_custom_object_definition_id: isCustomObject ? relationshipTarget : undefined,
              cardinality: relationshipType as CustomRelationshipType,
              company_id: companyId
            });
          } else {
            createCustomFieldDefinition({
              name,
              description,
              data_type: fieldType as CustomFieldDataType,
              entity_type: createCustomFieldType as CustomFieldEntityType,
              company_id: companyId
            });
          }

          setCreateCustomFieldType("");
        }}
      />
      <EditCustomFieldModal
        isOpen={!!editCustomField}
        field={editCustomField}
        onClose={() => {
          setEditCustomField(undefined);
        }}
        onSubmit={() => {
          setEditCustomField(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default CustomInfoDashboard;
