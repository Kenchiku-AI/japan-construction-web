import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import {
  CreateCustomObjectRequest,
  CustomFieldDataType,
  CustomFieldDefinitionListItem,
  CustomFieldListItem,
  CustomObjectDefinitionDetail,
  CustomObjectsByDefinition,
  Project,
  UserOrGuest
} from "@/types";
import { Input } from "@/app/ui/Input/Input";
import CustomRelationshipInput from "./CustomRelationshipInput";
import { fontColor1 } from "@/lib/constants";
import Divider from "@/app/ui/Divider";

interface CreateCustomObjectModalProps {
  definition: CustomObjectDefinitionDetail;
  projects: Project[];
  users: UserOrGuest[];
  customObjects: CustomObjectsByDefinition;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (request: CreateCustomObjectRequest) => void;
}

const CreateCustomObjectModal: FC<CreateCustomObjectModalProps> = ({
  definition,
  projects,
  users,
  customObjects,
  isOpen,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();
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

  const closeAndReset = useCallback(() => {
    onClose();
    setTimeout(() => {
      setFields({});
      setRelationships({});
    }, 500);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={t("create_custom_object_modal_title", { name: definition.name })}
    >
      <div className="my-8 flex flex-col">
        {fieldDefinitions.map((definition, i) => (
          <div key={definition.id}>
            {i > 0 && <Divider />}
            <CustomObjectFieldsListItem
              fields={fields}
              relationships={relationships}
              definition={definition}
              projects={projects}
              users={users}
              customObjects={customObjects}
              onFieldChange={(value) => {
                setFields((prev) => ({
                  ...prev,
                  [definition.id]: value
                }));
              }}
              onRelationshipChange={(value) => {
                setRelationships((prev) => ({
                  ...prev,
                  [definition.id]: value
                }));
              }}
            />
          </div>
        ))}
      </div>
      <Button
        label={t("create")}
        onClick={() => {
          closeAndReset();
        }}
      />
    </Modal>
  );
};

interface CustomObjectFieldsListItemProps {
  fields: Record<string, string>;
  relationships: Record<string, string[]>;
  definition: CustomFieldDefinitionListItem;
  projects: Project[];
  users: UserOrGuest[];
  customObjects: CustomObjectsByDefinition;
  onFieldChange: (value: string) => void;
  onRelationshipChange: (values: string[]) => void;
}

const CustomObjectFieldsListItem: FC<CustomObjectFieldsListItemProps> = ({
  fields,
  relationships,
  definition,
  projects,
  users,
  customObjects,
  onFieldChange,
  onRelationshipChange
}) => {
  if ("target_entity_type" in definition) {
    return (
      <CustomRelationshipInput
        definition={definition}
        projects={projects}
        users={users}
        customObjects={customObjects}
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


export default CreateCustomObjectModal;
