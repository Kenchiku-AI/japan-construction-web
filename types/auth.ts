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

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  new_password: string;
};

export type UserCompany = {
  id: string;
  name: string;
  corporate_number?: string;
};

export type CurrentUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  company?: UserCompany;
  projects: Project[];
};

export enum UserRole {
  Admin = "admin",
  Manager = "manager",
  User = "user",
}
