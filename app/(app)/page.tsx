"use client";

import { UserRole } from "@/types";
import { useApi } from "../../lib/api/ApiContext";
import CompanyDashboard from "./companies/[companyId]/CompanyDashboard";
import { redirect } from "next/navigation";

export default function Home() {
  const { currentUser } = useApi();

  if (!currentUser) {
    return null;
  }

  if (currentUser.role === UserRole.Admin) {
    redirect("/companies");
  }

  if (!currentUser.company) {
    redirect("/projects");
  }

  return <CompanyDashboard companyId={currentUser.company.id} />;
}
