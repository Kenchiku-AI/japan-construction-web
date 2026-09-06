import { FC, useMemo } from "react";
import {
  CustomFieldEntityType,
  CustomObjectListItem,
  CustomObjectsByDefinition,
  CustomRelationshipDefinition,
  CustomRelationshipType,
  Project,
  UserOrGuest
} from "@/types";
import Select from "@/app/ui/Select/Select";
import Multiselect from "@/app/ui/Multiselect/Multiselect";

interface CustomRelationshipInputProps {
  definition: CustomRelationshipDefinition;
  projects: Project[];
  users: UserOrGuest[];
  customObjectsByDefinition: CustomObjectsByDefinition;
  value?: string[];
  onChange: (value: string[]) => void;
  onEdit?: (value: string) => void;
}

const CustomRelationshipInput: FC<CustomRelationshipInputProps> = ({
  definition,
  projects,
  users,
  customObjectsByDefinition,
  value,
  onChange,
  onEdit
}) => {
  const options = useMemo(() => {
    const entityType = definition.target_entity_type;

    if (entityType === CustomFieldEntityType.Project) {
      return projects.map((p) => (
        { label: p.name, value: p.id }
      ));
    }

    if (entityType === CustomFieldEntityType.User) {
      return users.map((u) => (
        { label: `${u.last_name} ${u.first_name}`, value: u.id }
      ));
    }

    const entityDefinitionId = definition.target_custom_object_definition_id;
    if (!entityDefinitionId) {
      return [];
    }

    const customObjects = customObjectsByDefinition?.[entityDefinitionId]?.objects;
    return customObjects?.map((o) => ({ label: o.name, value: o.id })) ?? [];
  }, [definition, customObjectsByDefinition, projects, users]);

  if (definition.cardinality === CustomRelationshipType.One) {
    return (
      <Select
        placeholder={definition.name}
        options={options}
        value={value?.[0]}
        onChange={(v) => {
          onChange([v as string]);
        }}
      />
    );
  }

  return (
    <Multiselect
      placeholder={definition.name}
      values={value?.filter((v) => v != null) ?? []}
      options={options}
      onChange={onChange}
      onEdit={onEdit}
    />
  )
}

export default CustomRelationshipInput;