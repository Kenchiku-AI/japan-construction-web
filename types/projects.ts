import { Report } from "./reports";

export type Project = {
  id: string;
  name: string;
  description: string;
  line_link_code: string;
  reports?: Report[];
  action_items?: ActionItem[];
  status: ProjectStatus;
  company_id: string;
  company_name?: string;
};

export enum ProjectStatus {
  Active = "active",
  Completed = "completed",
  Requested = "request",
}

export type CreateProjectRequest = {
  company_id: string;
  name: string;
  description?: string;
};

export type UpdateProjectRequest = {
  name?: string;
  description?: string;
  status?: string;
};

export type ActionItem = {
  id: string;
  name: string;
  description: string;
  source_message_text?: string;
  line_timestamp?: string;
  status: ActionItemStatus;
  created_at: string;
  updated_at: string;
}

export type CreateActionItemRequest = {
  project_id: string;
  name: string;
  description: string;
}

export type UpdateActionItemRequest = {
  name: string;
  description: string;
  status: ActionItemStatus;
}

export enum ActionItemStatus {
  New = "new",
  Scheduled = "scheduled",
  InProgress = "in_progress",
  Closed = "closed"
}
