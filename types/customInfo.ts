export type CustomFieldDefinition = {
  id: string;
  name: string;
  description: string;
};

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