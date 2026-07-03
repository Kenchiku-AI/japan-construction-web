import { Report } from "./reports";

export type Project = {
  id: string;
  name: string;
  description: string;
  line_link_code: string;
  reports?: Report[];
  workItems?: WorkItem[];
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

export type WorkItem = {
  id: string;
  name: string;
  description: string;
  status: WorkItemStatus;
  created_at: string;
  updated_at: string;
}

export type CreateWorkItemRequest = {
  name: string;
  description: string;
}

export type UpdateWorkItemRequest = {
  name: string;
  description: string;
  status: WorkItemStatus;
}

export enum WorkItemStatus {
  New = "new",
  Scheduled = "scheduled",
  InProgress = "in_progress",
  Closed = "closed"
}
