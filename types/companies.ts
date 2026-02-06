import { Project } from "./projects";

export type Company = {
  id: string;
  name: string;
  corporate_number: string;
  users: CompanyUser[];
  projects: Project[];
};

export type CreateCompanyRequest = {
  name: string;
  corporate_number: string;
  manager_email?: string;
};

export type InviteUserRequest = {
  email: string;
  company_id: string;
  role: string;
};

export type CompanyUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};
