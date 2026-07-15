import { Report } from "./reports";

export type Project = {
  id: string;
  name: string;
  description: string;
  line_link_code: string;
  line_group_id?: string;
  reports?: Report[];
  action_items?: ActionItem[];
  status: ProjectStatus;
  company_id: string;
  company_name?: string;
  conversations: Conversation[];
  conversation_items: ProjectConversationItems[];
};

export type ProjectConversationItems = {
  conversation_item_type_id: string;
  conversation_item_type_name: string;
  items: ConversationItem[];
}

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

export type Conversation = {
  id: string;
  name: string;
  line_group_id?: string;
  line_link_code: string;
  last_message_text: string;
  item_types: ConversationItemType[];
}

export type CreateConversationRequest = {
  project_id: string;
  company_id: string; // must send company id in case admin creates conversation that's not tied to a project
  name: string;
  item_type_ids: string[];
}

export type UpdateConversationRequest = {
  name: string;
  item_type_ids: string[];
}

export type ConversationItem = {
  id: string;
  name: string;
  description: string;
  source_message_text?: string;
  line_timestamp?: string;
  status: ConversationItemStatus;
  created_at: string;
  updated_at: string;
}

export type CreateConversationItemRequest = {
  project_id: string;
  conversation_item_type_id: string;
  name: string;
  description: string;
}

export type UpdateConversationItemRequest = {
  name: string;
  description: string;
  status: ConversationItemStatus;
}

export enum ConversationItemStatus {
  New = "new",
  InProgress = "in_progress",
  Closed = "closed"
}

export type ConversationItemType = {
  id: string;
  name: string;
  description: string;
}

export type ConversationItemTypeRequest = {
  name: string;
  description: string;
}
