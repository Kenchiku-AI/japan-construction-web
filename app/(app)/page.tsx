"use client";

import { UserRole } from "@/types";
import { useApi } from "../../lib/api/ApiContext";
import CompanyDashboard from "./companies/[companyId]/CompanyDashboard";

export default function Home() {
  const { currentUser } = useApi();

  if (!currentUser) {
    return <div />;
  }

  if (!currentUser.company) {
    return <pre>{JSON.stringify(currentUser, null, 2)}</pre>;
  }

  return <CompanyDashboard companyId={currentUser.company.id} />;
}
