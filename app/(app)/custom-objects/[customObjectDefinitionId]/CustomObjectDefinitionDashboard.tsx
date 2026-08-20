"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/ui/Loader";
import { useCustomObjectDefinition } from "./useCustomObjectDefinition";
import { cardClass, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { Check, Close, Edit, Plus } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { Input } from "@/app/ui/Input/Input";
import Divider from "@/app/ui/Divider";
import CreateCustomFieldModal from "../../companies/[companyId]/custom-info/CreateCustomFieldModal";
import { CustomFieldEntityType, CustomRelationshipType } from "@/types";

interface CustomObjectDefinitionDashboardProps {
  customObjectDefinitionId: string;
}

const CustomObjectDefinitionDashboard: FC<CustomObjectDefinitionDashboardProps> = ({ customObjectDefinitionId }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
  const { t } = useTranslation();
  const {
    customObjectDefinition,
    customObjectDefinitions,
    customObjects,
    createCustomRelationshipDefinition,
    loading
  } = useCustomObjectDefinition(customObjectDefinitionId);

  useEffect(() => {
    setName(customObjectDefinition?.name ?? "");
  }, [customObjectDefinition?.name]);

  useEffect(() => {
    setDescription(customObjectDefinition?.description ?? "");
  }, [customObjectDefinition?.description]);

  return !customObjectDefinition ? null : (
    <>
      <div className="flex justify-between items-end">
        <Heading
          title={customObjectDefinition.name}
          topLabel={t("custom_object")}
        />
        <Button
          variant="tertiary"
          label={t("create")}
          iconLeft={() => <Plus />}
          onClick={() => {

          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        {!customObjects.length ? (
          <div className={styles.empty}>
            {t("empty_description")}
          </div>
        ) : (
          <div>
            {customObjects.map((o) => (
              <div></div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between mt-12">
        <div className="self-end">{t("custom_object_settings")}</div>
        <Button
          variant="tertiary"
          label={t("create_field")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateField(true);
          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        {showEditName ? (
          <div className="flex flex-col">
            <Input
              value={name}
              placeholder={t("custom_object_name")}
              onChange={setName}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: 12,
                marginBottom: 6,
                gap: 24,
              }}
            >
              <Button
                variant="tertiary"
                iconLeft={() => <Check />}
                style={{ height: "auto" }}
                label={t("update")}
                onClick={() => {
                  // call update
                  setShowEditName(false);
                }}
              />
              <Button
                variant="tertiary"
                iconLeft={() => (
                  <div style={{ marginRight: -3 }}>
                    <Close color={errorColor1} />
                  </div>
                )}
                style={{ height: "auto" }}
                label={t("cancel")}
                onClick={() => {
                  setName(customObjectDefinition.name ?? "");
                  setShowEditName(false);
                }}
                textStyle={{ color: errorColor1 }}
              />
            </div>
          </div>
        ) : (


          <div className="flex items-center">
            <div className="p-1 md:p-3 flex flex-1">
              <div>
                {!!name && (
                  <div className={styles.label}>{t("custom_object_name")}</div>
                )}
                <div style={{ color: fontColor1 }}>
                  {name ?? ""}
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer md:pr-3"
              onClick={() => {
                setShowEditName(true);
              }}
            >
              <Edit />
            </div>
          </div>
        )}
        <Divider />
        {showEditDescription ? (
          <div className="flex flex-col">
            <TextArea
              value={description}
              placeholder={t("custom_object_description")}
              onChange={setDescription}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: 12,
                marginBottom: 6,
                gap: 24,
              }}
            >
              <Button
                variant="tertiary"
                iconLeft={() => <Check />}
                style={{ height: "auto" }}
                label={t("update")}
                onClick={() => {
                  // call update
                  setShowEditDescription(false);
                }}
              />
              <Button
                variant="tertiary"
                iconLeft={() => (
                  <div style={{ marginRight: -3 }}>
                    <Close color={errorColor1} />
                  </div>
                )}
                style={{ height: "auto" }}
                label={t("cancel")}
                onClick={() => {
                  setDescription(customObjectDefinition.description);
                  setShowEditDescription(false);
                }}
                textStyle={{ color: errorColor1 }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="p-1 md:p-3 flex flex-1">
              <div>
                {!!description && (
                  <div className={styles.label}>{t("custom_object_description")}</div>
                )}
                <div style={{ color: !description ? fontColor2 : fontColor1 }}>
                  {description || t("add_description")}
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer md:pr-3"
              onClick={() => {
                setShowEditDescription(true);
              }}
            >
              <Edit />
            </div>
          </div>
        )}
        {!!customObjects.length && (
          <>
            <Divider />

          </>
        )}
      </div>
      <CreateCustomFieldModal
        isOpen={showCreateField}
        customObjects={customObjectDefinitions}
        onClose={() => {
          setShowCreateField(false);
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
              target_custom_object_definition_id: isCustomObject ? relationshipTarget : undefined;
              cardinality: relationshipType as CustomRelationshipType,
              company_id: companyId
            });


            createCustomRelationshipDefinition(
              name,
              description,
              relationshipTarget as CustomFieldEntityType,
              relationshipType as CustomRelationshipType
            );
          } else {
            // createCustomFieldDefinition({
            //   name,
            //   description,
            //   data_type: fieldType as CustomFieldDataType,
            //   entity_type: createCustomFieldType as CustomFieldEntityType,
            //   company_id: companyId
            // });
          }

          setShowCreateField(false);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default CustomObjectDefinitionDashboard;
