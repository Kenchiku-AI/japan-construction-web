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
import CustomFieldsList from "../../../custom-object-definitions/[customObjectDefinitionId]/CustomFieldsList";
import { useCustomInfo } from "./useCustomInfo";
import CreateCustomFieldModal from "./CreateCustomFieldModal";
import EditCustomFieldModal from "./EditCustomFieldModal";
import { CustomFieldDataType, CustomFieldDefinition, CustomFieldEntityType, CustomRelationshipType } from "@/types";
import CustomObjectsList from "./CustomObjectsList";

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
    customObjects,
    createCustomFieldDefinition,
    createCustomRelationshipDefinition,
    loading
  } = useCustomInfo(companyId);
  const [showLoader, setShowLoader] = useState(false);
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
          objects={customObjects}
          isEmpty={customObjects.length === 0 && !loading}
          onClickObject={(o) => {

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
            isEmpty={companyItems.length === 0 && !loading}
            onChangeOrder={() => {

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
      <CreateCustomFieldModal
        isOpen={!!createCustomFieldType}
        ownerType={createCustomFieldType}
        customObjects={customObjects}
        onClose={() => {
          setCreateCustomFieldType("");
        }}
        onCreate={async (name, description, fieldType, relationshipType, relationshipTarget) => {
          if (fieldType === "relationship") {
            createCustomRelationshipDefinition({
              name,
              description,
              source_entity_type: createCustomFieldType as CustomFieldEntityType,
              target_entity_type: relationshipTarget as CustomFieldEntityType,
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
      {showLoader && <Loader />}
    </>
  );
};

export default CustomInfoDashboard;
