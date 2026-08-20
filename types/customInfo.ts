// Custom Fields

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

export enum CustomRelationshipType {
  One = "one",
  Many = "many"
}

export type CustomFieldDefinition = {
  id: string;
  name: string;
  description: string;
  data_type: CustomFieldDataType;
  entity_type: CustomFieldEntityType;
  custom_object_definition_id?: string;
  sort_order: number;
};

export type CustomField = {
  id?: string;
  value?: string;
  definition: CustomFieldDefinition;
}

export type CreateCustomFieldDefinitionRequest = {
  company_id: string;
  name: string;
  description: string;
  data_type: CustomFieldDataType;
  entity_type: CustomFieldEntityType;
  custom_object_definition_id?: string;
}

export type UpdateCustomFieldDefinitionRequest = {
  name?: string;
  description?: string;
}

export type CustomFieldDefinitionsResponse = {
  project_fields: CustomFieldDefinition[];
  project_relationships: CustomRelationshipDefinition[];
  user_fields: CustomFieldDefinition[];
  user_relationships: CustomRelationshipDefinition[];
  company_fields: CustomFieldDefinition[];
  company_relationships: CustomRelationshipDefinition[];
}


// Custom Relationships

export type CustomRelationshipDefinition = {
  id: string;
  name: string;
  description: string;
  sort_order: number;
  source_entity_type: CustomFieldEntityType;
  source_custom_object_definition_id?: string;
  target_entity_type: CustomFieldEntityType;
  target_custom_object_definition_id?: string;
  cardinality: CustomRelationshipType;
}

export type CustomRelationship = {}

export type CreateCustomRelationshipDefinitionRequest = {
  company_id: string;
  name: string;
  description: string;
  cardinality: CustomRelationshipType;
  source_entity_type: CustomFieldEntityType;
  target_entity_type: CustomFieldEntityType;
  source_custom_object_definition_id?: string;
  target_custom_object_definition_id?: string;
}


// Custom Objects

export type CustomObjectDefinition = {
  id: string;
  name: string;
  description: string;
}

export type CustomObjectDefinitionDetail = {
  id: string;
  company_id: string;
  name: string;
  description: string;
  fields: CustomFieldDefinition[];
  relationships: CustomRelationshipDefinition[];
}

export type CustomObject = {}

export type CreateCustomObjectDefinitionRequest = {
  company_id: string;
  name: string;
  description: string;
}

export type CustomFieldListItem = CustomFieldDefinition | CustomRelationshipDefinition;

export type SortOrderRequest = {
  id: string;
  sort_order: number;
}