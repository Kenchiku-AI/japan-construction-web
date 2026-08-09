export type Report = {
  id: string;
  name: string;
  template_id: string;
  status: ReportStatus;
  project_ids: string[];
  project_name?: string;
  company_id?: string;
  company_name?: string;
  fields: ReportField[];
  created_at: string;
  updated_at: string;
  disabled?: boolean;
};

export type ReportField = {
  id: string;
  report_id: string;
  name: string;
  value: string;
  order: number;
};

export type Image = {
  id: string;
  status: string;
  download_url: string;
  created_at: string;
  width: number;
  height: number;
  description?: string;
  tags: ImageTagLink[];
};

export type ImagePollResponse = {
  id: string;
  status: string;
  description?: string;
  tags: ImageTagLink[];
};

export type CreateImageResponse = {
  id: string;
  status: string;
  upload_url: string;
  download_url: string;
  created_at: string;
  width: number;
  height: number;
  tags: ImageTagLink[];
};

export type ImageCreateRequest = {
  width: number;
  height: number;
};

export type ImageTagLink = {
  tag_id: string;
  link_id: string;
  name: string;
};

export type CreateReportRequest = {
  template_id: string;
  company_id: string;
  project_id?: string;
  name: string;
};

export type ImageUpdateRequest = {
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
};

export type ReportRequest = {
  name?: string;
  field_values?: ReportFieldValues;
  status?: ReportStatus;
};

export type ReportFieldValues = { [key: string]: string };

export type ReportTemplate = {
  id: string;
  name: string;
  description: string;
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
};

export type ReportTemplateRequestField = {
  name: string;
  description: string;
};

export type ShareReportTemplateRequest = {
  company_id: string;
  template_id: string;
};

export enum ReportStatus {
  Open = "open",
  Closed = "closed",
}

export type ImageTag = {
  id: string;
  name: string;
  description: string;
};

export type ImageTagRequest = {
  name?: string;
  description?: string;
};

export type ConversationRangeRequest = {
  conversation_id: string;
  start_time: string;
  end_time: string;
}

export type AutofillRequest = {
  conversations: ConversationRangeRequest[];
}

export type AutofillResponse = {
  field_values: ReportFieldValues;
  image_sync_failed: boolean;
};
