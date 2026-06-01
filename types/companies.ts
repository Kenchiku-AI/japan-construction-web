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

export type UpdateCompanyRequest = {
  name?: string;
  corporate_number?: string;
};

export type UpdateCompanyResponse = {
  name: string;
  corporate_number: string;
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
