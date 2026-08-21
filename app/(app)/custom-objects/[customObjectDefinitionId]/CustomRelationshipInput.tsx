import { CustomFieldEntityType, CustomObject, CustomObjectDefinition, CustomRelationshipDefinition, Project, UserOrGuest } from "@/types";
import { FC, useMemo } from "react";



interface CustomRelationshipInputProps {
  definition: CustomRelationshipDefinition;
  projects: Project[];
  users: UserOrGuest[];
  customObjects: CustomObject[];
}

const CustomRelationshipInput: FC<CustomRelationshipInputProps> = ({
  definition,
  projects,
  users,
  customObjects
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

    return customObjects.filter((c) => (
      definition.target_custom_object_definition_id === c.
    ));
  }, [definition, projects, users]);

  return (
    <></>
  )
}