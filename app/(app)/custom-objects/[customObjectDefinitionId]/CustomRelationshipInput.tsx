import { FC, useMemo } from "react";
import {
  CustomFieldEntityType,
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
  customObjects: CustomObjectsByDefinition;
  value?: string[];
  onChange: (value: string[]) => void;
}

const CustomRelationshipInput: FC<CustomRelationshipInputProps> = ({
  definition,
  projects,
  users,
  customObjects,
  value,
  onChange
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

    if (!Object.hasOwn(customObjects, definition.id)) {
      return [];
    }

    const { objects } = customObjects[definition.id];
    return objects.map((o) => (
      { label: o.name, value: o.id }
    ));
  }, [definition, projects, users]);

  const isDisabled = !options.length;

  if (definition.cardinality === CustomRelationshipType.One) {
    return (
      <Select
        placeholder={definition.name}
        options={options}
        value={value?.[0]}
        onChange={(v) => {
          onChange([v as string]);
        }}
        disabled={isDisabled}
      />
    );
  }

  return (
    <Multiselect
      placeholder={definition.name}
      values={value ?? []}
      options={options}
      onChange={onChange}
    />
  )
}

export default CustomRelationshipInput;