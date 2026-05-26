export type Report = {
  id: string;
  name: string;
  template_id: string;
  parent_type: ReportParentType;
  parent_id: string;
  project_name?: string;
  company_id?: string;
  company_name?: string;
  fields: ReportField[];
  created_at: string;
  updated_at: string;
};

export type ReportField = {
  id: string;
  report_id: string;
  name: string;
  value: string;
  order: number;
};

export type ReportImage = {
  id: string;
  report_id: string;
  status: string;
  download_url: string;
  created_at: string;
  width: number;
  height: number;
  description?: string;
  tags: ReportImageTagLink[];
};

export type ReportImagePollResponse = {
  id: string;
  status: string;
  description?: string;
  tags: ReportImageTagLink[];
};

export type CreateImageResponse = {
  id: string;
  report_id: string;
  status: string;
  upload_url: string;
  download_url: string;
  created_at: string;
  width: number;
  height: number;
  tags: ReportImageTagLink[];
};

export type ReportImageCreateRequest = {
  width: number;
  height: number;
};

export type ReportImageTagLink = {
  tag_id: string;
  link_id: string;
  name: string;
};

export type CreateReportRequest = {
  template_id: string;
  parent_id: string;
  name: string;
};

export type ReportImageUpdateRequest = {
  description: string;
};

export type AddTagRequest = {
  tag_id: string;
};

export type ReportTemplateFieldInfo = {
  id: string;
  name: string;
  description: string;
  order: number;
};

export type CreateReportTemplateRequest = {
  name: string;
  description: string;
  fields: ReportTemplateFieldInfo[];
  parent_type: ReportParentType;
};

export type ReportRequest = {
  name?: string;
  field_values?: ReportFieldValues;
};

export type ReportFieldValues = { [key: string]: string };

export type ReportTemplate = {
  id: string;
  name: string;
  description: string;
  parent_type: ReportParentType;
  company_name?: string;
  fields: ReportTemplateField[];
  is_global: boolean;
};

export type ReportTemplateField = {
  id: string;
  name: string;
  description: string;
  order: number;
  template_id: string;
};

export type ReportTemplateRequest = {
  name?: string;
  description?: string;
  fields?: ReportTemplateRequestField[];
  parent_type?: ReportParentType;
};

export type ReportTemplateRequestField = {
  name: string;
  description: string;
};

export type ShareReportTemplateRequest = {
  company_id: string;
  template_id: string;
};

export enum ReportParentType {
  Company = "company",
  Project = "project",
}

export type ReportImageTag = {
  id: string;
  name: string;
  description: string;
};

export type ReportImageTagRequest = {
  name?: string;
  description?: string;
};
