import { DailyReport } from "./reports";

export type Project = {
  id: string;
  name: string;
  description: string;
  todays_report?: DailyReport;
  daily_reports?: DailyReport[];
  status: ProjectStatus;
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
