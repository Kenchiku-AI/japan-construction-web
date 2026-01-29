import { Project } from "./projects";

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type CompanyResponse = {
  company_id: string;
  company_name: string;
  role: string;
};

export type CurrentUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  projects: Project[];
};
