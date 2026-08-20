"use client";

import { FC, useEffect, useState, useRef } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Loader } from "@/app/ui/Loader";
import { useCustomObjectDefinition } from "./useCustomObjectDefinition";
import { cardClass, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { Check, Close, Edit, Plus } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { Input } from "@/app/ui/Input/Input";
import Divider from "@/app/ui/Divider";
import CreateCustomFieldModal from "../../companies/[companyId]/custom-info/CreateCustomFieldModal";
import { CustomFieldDataType, CustomFieldEntityType, CustomFieldListItem, CustomRelationshipType } from "@/types";
import CustomFieldsList from "./CustomFieldsList";
import DeleteCustomFieldModal from "../../companies/[companyId]/custom-info/DeleteCustomFieldModal";
import EditCustomFieldModal from "../../companies/[companyId]/custom-info/EditCustomFieldModal";

interface CustomObjectDefinitionDashboardProps {
  customObjectDefinitionId: string;
}

const CustomObjectDefinitionDashboard: FC<CustomObjectDefinitionDashboardProps> = ({ customObjectDefinitionId }) => {
  const [name, setName] = useState("");
  const nameInputRef = useRef<any>(null);
  const [description, setDescription] = useState("");
  const [descriptionShouldFocus, setDescriptionShouldFocus] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
  const [editCustomField, setEditCustomField] = useState<CustomFieldListItem>();
  const [deleteCustomField, setDeleteCustomField] = useState<CustomFieldListItem>();
  const { t } = useTranslation();
  const {
    customObjectDefinition,
    customObjectDefinitions,
    customObjects,
    fieldListItems,
    updateCustomObjectDefinition,
    createCustomFieldDefinition,
    updateCustomFieldDefinition,
    deleteCustomFieldDefinition,
    createCustomRelationshipDefinition,
    updateCustomRelationshipDefinition,
    deleteCustomRelationshipDefinition,
    onUpdateItemsOrder,
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
      </div>
      <div className={cardClass}>
        {showEditName ? (
          <div className="flex flex-col">
            <Input
              ref={nameInputRef}
              value={name}
              placeholder={t("custom_object_name")}
              onChange={setName}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginTop: 12,
                marginBottom: 6,
                marginLeft: 6,
                gap: 24,
              }}
            >
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
              <Button
                variant="tertiary"
                iconLeft={() => <Check />}
                style={{ height: "auto" }}
                label={t("update")}
                disabled={!name || name === customObjectDefinition.name}
                onClick={() => {
                  updateCustomObjectDefinition({ name });
                  setShowEditName(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="p-1 md:py-2 md:px-3 flex flex-1">
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
                setTimeout(() => {
                  nameInputRef.current?.focus();
                }, 1);
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
              shouldFocus={descriptionShouldFocus}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginTop: 12,
                marginBottom: 6,
                marginLeft: 6,
                gap: 24,
              }}
            >
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
              <Button
                variant="tertiary"
                iconLeft={() => <Check />}
                style={{ height: "auto" }}
                label={t("update")}
                disabled={!description || description === customObjectDefinition.description}
                onClick={() => {
                  updateCustomObjectDefinition({ description });
                  setShowEditDescription(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="px-1 py-2 md:px-3 flex flex-1">
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

                setTimeout(() => {
                  setDescriptionShouldFocus(true);

                  setTimeout(() => {
                    setDescriptionShouldFocus(false);
                  }, 1);
                }, 1);
              }}
            >
              <Edit />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-12">
        <div className="self-end">{t("custom_object_fields")}</div>
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
        <CustomFieldsList
          items={fieldListItems}
          isEmpty={!fieldListItems.length}
          customObjects={customObjectDefinitions ?? []}
          onChangeOrder={(newItems) => {
            onUpdateItemsOrder(newItems);
          }}
          onEdit={(f) => {
            setEditCustomField(f);
          }}
          onDelete={(f) => {
            setDeleteCustomField(f);
          }}
        />
      </div>
      <CreateCustomFieldModal
        isOpen={showCreateField}
        customObjects={customObjectDefinitions}
        onClose={() => {
          setShowCreateField(false);
        }}
        onCreate={async (name, description, fieldType, relationshipType, relationshipTarget) => {
          if (fieldType === "relationship") {
            createCustomRelationshipDefinition(
              name,
              description,
              relationshipTarget as CustomFieldEntityType,
              relationshipType as CustomRelationshipType
            );
          } else {
            createCustomFieldDefinition(
              name,
              description,
              fieldType as CustomFieldDataType
            );
          }

          setShowCreateField(false);
        }}
      />
      <EditCustomFieldModal
        isOpen={!!editCustomField}
        field={editCustomField}
        onClose={() => {
          setEditCustomField(undefined);
        }}
        onSubmit={(name, description) => {
          if (!editCustomField) return;

          const request = { name, description };

          if ("source_entity_type" in editCustomField) {
            updateCustomRelationshipDefinition(
              editCustomField.id,
              request
            );
          } else {
            updateCustomFieldDefinition(
              editCustomField.id,
              request
            );
          }

          setEditCustomField(undefined);
        }}
      />
      <DeleteCustomFieldModal
        isOpen={!!deleteCustomField}
        onClose={() => {
          setDeleteCustomField(undefined);
        }}
        onDelete={() => {
          if (!deleteCustomField) return;

          if ("source_entity_type" in deleteCustomField) {
            deleteCustomRelationshipDefinition(deleteCustomField.id);
          } else {
            deleteCustomFieldDefinition(deleteCustomField.id);
          }

          setDeleteCustomField(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default CustomObjectDefinitionDashboard;
