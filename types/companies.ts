import { ConversationItemType, Project } from "./projects";

export type Company = {
  id: string;
  name: string;
  corporate_number: string;
  payment_method_name?: string;
  line_channel_secret_last4?: string;
  line_channel_access_token_last5?: string;
  is_payment_method_valid: boolean;
  free_trial_days_left?: number;
  billing_plan_id?: string;
  users: CompanyUser[];
  projects: Project[];
};

export type CreateCompanyRequest = {
  name: string;
  corporate_number?: string;
  manager_email?: string;
};

export type CreateCompanyResponse = {
  invitation_id?: string;
};

export type UpdateCompanyRequest = {
  name?: string;
  corporate_number?: string;
  line_channel_secret?: string;
  line_channel_access_token?: string;
  billing_plan_id?: string | null;
};

export type UpdateCompanyResponse = {
  name: string;
  corporate_number: string;
  line_channel_secret_last4?: string;
  line_channel_access_token_last5?: string;
  billing_plan_id?: string;
};

export type SetupIntentResponse = {
  client_secret: string;
};

export type BillingCheckResponse = {
  client_secret: string;
};


export type InviteUserRequest = {
  email: string;
  company_id: string;
  role: string;
};

export type InviteGuestRequest = {
  email: string;
  project_id: string;
  first_name?: string;
  last_name?: string;
};

export type CompanyUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type CompanyGuest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  projects: CompanyGuestProject[];
};

export type CompanyGuestProject = {
  project_id: string;
  project_name: string;
  guest_link_id: string;
};

export type InviteProjectGuestRequest = {
  project_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

export type AcceptInvitationRequest = {
  token: string;
};

export type AcceptInvitationResponse = {
  success: boolean;
};
