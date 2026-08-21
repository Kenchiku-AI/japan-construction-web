import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import {
  CustomFieldDataType,
  CustomFieldDefinitionListItem,
  CustomObject,
  CustomObjectDefinitionDetail,
  CustomObjectsByDefinition,
  Project,
  UserOrGuest
} from "@/types";
import { Input } from "@/app/ui/Input/Input";
import CustomRelationshipInput from "./CustomRelationshipInput";
import { errorColor1, fontColor1 } from "@/lib/constants";
import Divider from "@/app/ui/Divider";
import { Check, Trash } from "@/app/ui/Icons";

interface EditCustomObjectModalProps {
  definition: CustomObjectDefinitionDetail;
  object?: CustomObject;
  projects: Project[];
  users: UserOrGuest[];
  customObjectsByDefinition: CustomObjectsByDefinition;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fields: Record<string, string>, relationships: Record<string, string[]>) => void;
  onDelete: () => void;
}

const EditCustomObjectModal: FC<EditCustomObjectModalProps> = ({
  definition,
  object,
  projects,
  users,
  customObjectsByDefinition,
  isOpen,
  onClose,
  onSubmit,
  onDelete
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [relationships, setRelationships] = useState<Record<string, string[]>>({});

  const fieldDefinitions = useMemo(() => {
    return [
      ...definition.fields,
      ...definition.relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [definition]);

  useEffect(() => {
    if (!object) return;

    const sortedFields = object.fields?.sort((a, b) => a.definition.sort_order - b.definition.sort_order);
    const labelValue = sortedFields?.[0]?.value;
    const name = labelValue ?? object.definition.name;
    setTitle(t("edit_custom_object_modal_title", { name }));

    const newFields: Record<string, string> = {};
    object.fields.forEach((f) => {
      const definitionHasField = definition.fields.some((df) => df.id === f.definition.id);
      if (definitionHasField && !!f.value) newFields[f.definition.id] = f.value;
    });
    setFields(newFields);

    const newRelationships: Record<string, string[]> = {};
    object.relationships.forEach((r) => {
      const definitionHasRelationship = definition.relationships.some((dr) => dr.id === r.definition.id);

      if (definitionHasRelationship) {
        newRelationships[r.definition.id] = [
          ...(newRelationships?.[r.definition.id] ?? []),
          r.target_entity_id
        ];
      }
    });

    setRelationships(newRelationships);
  }, [object, definition]);

  const closeAndReset = useCallback(() => {
    onClose();
    setTimeout(() => {
      setTitle("");
      setFields({});
      setRelationships({});
    }, 500);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={title}
    >
      <div className="my-8 flex flex-col">
        {fieldDefinitions.map((item, i) => (
          <div key={item.id}>
            {i > 0 && <Divider />}
            <CustomObjectFieldsListItem
              fields={fields}
              relationships={relationships}
              definition={item}
              projects={projects}
              users={users}
              customObjectsByDefinition={customObjectsByDefinition}
              onFieldChange={(value) => {
                setFields((prev) => ({
                  ...prev,
                  [item.id]: value
                }));
              }}
              onRelationshipChange={(value) => {
                setRelationships((prev) => ({
                  ...prev,
                  [item.id]: value
                }));
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          iconLeft={() => <Check color="white" />}
          label={t("update")}
          onClick={() => {
            onSubmit(fields, relationships);
            closeAndReset();
          }}
        />
        <Button
          variant="secondary"
          iconLeft={() => <Trash />}
          style={{ borderColor: errorColor1, height: 60 }}
          textStyle={{ color: errorColor1 }}
          label={t("delete")}
          onClick={() => {
            onDelete();
            closeAndReset();
          }}
        />
      </div>
    </Modal>
  );
};

interface CustomObjectFieldsListItemProps {
  fields: Record<string, string>;
  relationships: Record<string, string[]>;
  definition: CustomFieldDefinitionListItem;
  projects: Project[];
  users: UserOrGuest[];
  customObjectsByDefinition: CustomObjectsByDefinition;
  onFieldChange: (value: string) => void;
  onRelationshipChange: (values: string[]) => void;
}

const CustomObjectFieldsListItem: FC<CustomObjectFieldsListItemProps> = ({
  fields,
  relationships,
  definition,
  projects,
  users,
  customObjectsByDefinition,
  onFieldChange,
  onRelationshipChange
}) => {
  if ("target_entity_type" in definition) {
    return (
      <CustomRelationshipInput
        definition={definition}
        projects={projects}
        users={users}
        customObjectsByDefinition={customObjectsByDefinition}
        value={relationships?.[definition.id]}
        onChange={onRelationshipChange}
      />
    )
  }

  if (definition.data_type === CustomFieldDataType.Boolean) {
    return (
      <label className="label flex gap-4 mx-3 py-2" style={{ color: fontColor1 }}>
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={fields?.[definition.id] === "true"}
          onChange={(e) => {
            const newValue = e.target.checked.toString();
            onFieldChange(newValue);
          }}
        />
        {definition.name}
      </label>
    );
  }

  return (
    <Input
      placeholder={definition.name}
      value={fields?.[definition.id] ?? ""}
      onChange={onFieldChange}
    />
  )
}


export default EditCustomObjectModal;
