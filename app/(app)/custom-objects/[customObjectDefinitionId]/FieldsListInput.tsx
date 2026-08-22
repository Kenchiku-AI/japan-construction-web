import { CustomFieldDataType, CustomFieldDefinitionListItem, CustomObjectsByDefinition, Project, UserOrGuest } from "@/types";
import { FC } from "react";
import CustomRelationshipInput from "./CustomRelationshipInput";
import { fontColor1 } from "@/lib/constants";
import { Input } from "@/app/ui/Input/Input";

export interface FieldsListInputProps {
  fields: Record<string, string>;
  relationships: Record<string, string[]>;
  definition: CustomFieldDefinitionListItem;
  projects: Project[];
  users: UserOrGuest[];
  customObjectsByDefinition: CustomObjectsByDefinition;
  onFieldChange: (value: string) => void;
  onRelationshipChange: (values: string[]) => void;
}

export const FieldsListInput: FC<FieldsListInputProps> = ({
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