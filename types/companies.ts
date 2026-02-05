export type Company = {
  id: string;
  name: string;
  corporate_number: string;
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
