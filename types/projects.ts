import { DailyReport } from "./reports";

export type Project = {
  id: string;
  name: string;
  description: string;
  todays_report?: DailyReport;
};

export type CreateProjectRequest = {
  company_id: string;
  name: string;
  description?: string;
};
