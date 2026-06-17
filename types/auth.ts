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
  invitation_token: string;
};

export type CreateAdminRequest = {
  first_name: string;
  last_name: string;
  email: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  new_password: string;
};

export type User = {
  first_name?: string;
  last_name?: string;
  email: string;
  company_id?: string;
  role: UserRole;
};

export type UpdateUserRequest = {
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: UserRole;
};

export type UserCompany = {
  id: string;
  name: string;
  corporate_number?: string;
  needs_payment_method: boolean;
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
