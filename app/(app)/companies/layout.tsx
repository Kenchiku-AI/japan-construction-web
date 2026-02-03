"use client";

import { useApi } from "../../../lib/api/ApiContext";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useApi();

  if (currentUser && currentUser.role !== UserRole.Admin) {
    redirect("/");
  }

  return !currentUser ? null : children;
}
