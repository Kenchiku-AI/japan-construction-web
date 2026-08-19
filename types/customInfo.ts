export type CustomFieldDefinition = {
  id: string;
  name: string;
  description: string;
};

export enum CustomFieldDataType {
  Text = "text",
  Boolean = "boolean",
}

export enum CustomFieldEntityType {
  Company = "company",
  User = "user",
  Project = "project",
  CustomObject = "custom_object"
}

export type CreateCustomFieldDefinitionRequest = {
  company_id: string;
  name: string;
  description: string;
  data_type: CustomFieldDataType;
  entity_type: CustomFieldEntityType;
  custom_object_definition_id?: string;
}

export type CustomRelationshipDefinition = {
  id: string;
  name: string;
  description: string;
}

export type CustomObjectDefinition = {
  id: string;
  name: string;
  description: string;
  fields: CustomFieldDefinition[];
}

export type CustomFieldDefinitionsResponse = {
  project_fields: CustomFieldDefinition[];
  user_fields: CustomFieldDefinition[];
  company_fields: CustomFieldDefinition[];
  custom_objects: CustomObjectDefinition[];
}

export type CustomObject = {}

export type CustomField = {
  id: string;
}

