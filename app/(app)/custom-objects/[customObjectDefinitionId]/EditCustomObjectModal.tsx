import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import {
  CustomFieldDataType,
  CustomFieldEntityType,
  CustomObject,
  CustomObjectDefinitionDetail,
  CustomObjectsByDefinition,
  Project,
  UserOrGuest
} from "@/types";
import { errorColor1 } from "@/lib/constants";
import Divider from "@/app/ui/Divider";
import { Check, Trash } from "@/app/ui/Icons";
import { FieldsListInput } from "./FieldsListInput";

interface EditCustomObjectModalProps {
  definition: CustomObjectDefinitionDetail;
  object?: CustomObject;
  projects: Project[];
  users: UserOrGuest[];
  customObjects: CustomObject[];
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
  customObjects,
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

  const getLabelValue = useCallback((object: CustomObject) => {
    const labelRelationships = object.relationships.sort((a, b) => (
      a.definition.sort_order - b.definition.sort_order
    ));
    const relationshipIndex = labelRelationships?.[0].definition.sort_order ?? 99999;

    const labelFields = object.fields?.filter((f) => (
      f.definition.data_type !== CustomFieldDataType.Boolean
    )).sort((a, b) => (
      a.definition.sort_order - b.definition.sort_order
    ));
    const fieldIndex = labelFields?.[0].definition.sort_order ?? 99999;

    if (fieldIndex < relationshipIndex) {
      return labelFields[0].value;
    }

    const relationship = labelRelationships[0];
    const entityType = relationship.definition.target_entity_type;

    if (entityType === CustomFieldEntityType.Project) {
      const project = projects.find((p) => p.id === relationship.target_entity_id);
      return project?.name;
    }

    if (entityType === CustomFieldEntityType.User) {
      const user = users.find((u) => u.id === relationship.target_entity_id);
      if (!user) return '';

      return `${user.last_name} ${user.first_name}`;
    }

    if (entityType === CustomFieldEntityType.CustomObject) {
      const customObject = customObjects.find((c) => c.id === relationship.target_entity_id);
      if (!customObject) return '';

      return getLabelValue(customObject);
    }

    return '';
  }, [customObjects, projects, users]);

  useEffect(() => {
    if (!object) return;

    const labelValue = getLabelValue(object);
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
          r.target_entity_id as string
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
            <FieldsListInput
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

export default EditCustomObjectModal;
