"use client";

import { FC, useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Loader } from "@/app/ui/Loader";
import { useCustomObjectDefinition } from "./useCustomObjectDefinition";
import { cardClass, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { Check, Close, Cube, Edit, Plus } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { Input } from "@/app/ui/Input/Input";
import Divider from "@/app/ui/Divider";
import CreateCustomFieldModal from "../../companies/[companyId]/custom-info/CreateCustomFieldModal";
import { CustomFieldDataType, CustomFieldEntityType, CustomFieldDefinitionListItem, CustomRelationshipType, CustomObject } from "@/types";
import CustomFieldDefinitionsList from "./CustomFieldDefinitionsList";
import DeleteCustomFieldModal from "../../companies/[companyId]/custom-info/DeleteCustomFieldModal";
import EditCustomFieldModal from "../../companies/[companyId]/custom-info/EditCustomFieldModal";
import CreateCustomObjectModal from "./CreateCustomObjectModal";
import EditCustomObjectModal from "./EditCustomObjectModal";
import ConfirmDeleteModal from "../../projects/[projectId]/ConfirmDeleteModal";

interface CustomObjectDefinitionDashboardProps {
  customObjectDefinitionId: string;
}

const CustomObjectDefinitionDashboard: FC<CustomObjectDefinitionDashboardProps> = ({ customObjectDefinitionId }) => {
  const [showCreateObject, setShowCreateObject] = useState(false);
  const [editObject, setEditObject] = useState<CustomObject>();
  const [deleteObject, setDeleteObject] = useState<CustomObject>();
  const [name, setName] = useState("");
  const nameInputRef = useRef<any>(null);
  const [description, setDescription] = useState("");
  const [descriptionShouldFocus, setDescriptionShouldFocus] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
  const [editCustomField, setEditCustomField] = useState<CustomFieldDefinitionListItem>();
  const [deleteCustomField, setDeleteCustomField] = useState<CustomFieldDefinitionListItem>();
  const { t } = useTranslation();
  const {
    customObjectDefinition,
    customObjectDefinitions,
    customObjectsByDefinition,
    customObjects,
    projects,
    users,
    fieldListItems,
    updateCustomObjectDefinition,
    createCustomFieldDefinition,
    updateCustomFieldDefinition,
    deleteCustomFieldDefinition,
    createCustomRelationshipDefinition,
    updateCustomRelationshipDefinition,
    deleteCustomRelationshipDefinition,
    onUpdateItemsOrder,
    createCustomObject,
    updateCustomObject,
    deleteCustomObject,
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
            setShowCreateObject(true);
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
            {customObjects.map((object, i) => {
              const objects = customObjectsByDefinition[object.definition.id].objects;
              const labelValue = objects.find((o) => o.id === object.id)?.name;
              const label = labelValue ?? object.definition.name;

              return (
                <div key={object.id}>
                  {i > 0 && <Divider />}
                  <div
                    onClick={() => {
                      setEditObject(object);
                    }}
                    className="hover:opacity-50 cursor-pointer"
                  >
                    <div className="md:mx-3">
                      <div className="flex items-center justify-between gap-4">
                        <div
                          style={{ minHeight: 60, minWidth: 0 }}
                          className="flex flex-1 items-center gap-4 py-1"
                        >
                          <div className="hidden md:block">
                            <Cube />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ color: labelValue ? fontColor1 : fontColor2 }}>{label}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
                marginTop: 12,
                marginBottom: 6,
                marginLeft: 6,
                gap: 24,
              }}
            >
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
          <div className="flex">
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
              className="cursor-pointer md:pr-3 mt-4"
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
                marginTop: 12,
                marginBottom: 6,
                marginLeft: 6,
                gap: 24,
              }}
            >
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
          <div className="flex">
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
              className="cursor-pointer md:pr-3 mt-4"
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
        <CustomFieldDefinitionsList
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
      <CreateCustomObjectModal
        definition={customObjectDefinition}
        projects={projects}
        users={users}
        customObjectsByDefinition={customObjectsByDefinition}
        isOpen={showCreateObject}
        onClose={() => {
          setShowCreateObject(false);
        }}
        onCreate={(fields, relationships) => {
          createCustomObject({
            company_id: customObjectDefinition.company_id,
            custom_object_definition_id: customObjectDefinition.id,
            fields,
            relationships
          });
        }}
      />
      <EditCustomObjectModal
        definition={customObjectDefinition}
        object={editObject}
        projects={projects}
        users={users}
        customObjectsByDefinition={customObjectsByDefinition}
        isOpen={!!editObject}
        onClose={() => {
          setEditObject(undefined);
        }}
        onSubmit={(fields, relationships) => {
          if (!editObject) return;

          const request = {
            custom_object_definition_id: customObjectDefinition.id,
            fields,
            relationships
          };

          updateCustomObject(editObject.id, request);
        }}
        onDelete={() => {
          setDeleteObject(editObject);
          setEditObject(undefined);
        }}
      />
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
      <ConfirmDeleteModal
        isOpen={!!deleteObject}
        onClose={() => {
          setDeleteObject(undefined);
        }}
        onDelete={() => {
          if (!deleteObject) return;

          deleteCustomObject(deleteObject.id);
          setDeleteObject(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default CustomObjectDefinitionDashboard;
