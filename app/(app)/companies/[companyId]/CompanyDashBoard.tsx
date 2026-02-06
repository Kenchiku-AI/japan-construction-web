"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useCompany } from "./useCompany";
import { Plus } from "@/app/ui/Icons";
import InviteUserModal from "./InviteUserModal";
import CompanyUsersList from "./CompanyUsersList";
import CreateProjectModal from "./CreateProjectModal";
import CompanyProjectsList from "./CompanyProjectsList";

interface CompanyDashboardProps {
  companyId: string;
}

const CompanyDashboard: FC<CompanyDashboardProps> = ({ companyId }) => {
  const { currentUser, inviteUser } = useApi();
  const { t } = useTranslation();
  const { company } = useCompany(companyId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const shouldRedirect =
    currentUser &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company?.id !== companyId;

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading title={company?.name ?? searchParams.get("name") ?? ""} />
      {company && (
        <>
          <div className="flex justify-between mt-8">
            <div className="text-2xl self-end">{t("projects")}</div>
            {currentUser?.role === UserRole.Admin && (
              <Button
                variant="secondary"
                label={t("create_project")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowCreateProject(true);
                }}
                style={{ height: 40 }}
              />
            )}
          </div>
          <div className="divider divider-neutral my-1 opacity-30" />
          <CompanyProjectsList projects={company.projects} />
          <div className="flex justify-between mt-8">
            <div className="text-2xl self-end">{t("users")}</div>
            {(currentUser?.role === UserRole.Admin ||
              currentUser?.role === UserRole.Manager) && (
              <Button
                variant="secondary"
                label={t("invite_user")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowInviteUser(true);
                }}
                style={{ height: 40 }}
              />
            )}
          </div>
          <div className="divider divider-neutral my-1 opacity-30" />
          <CompanyUsersList users={company.users} />
        </>
      )}
      <InviteUserModal
        isOpen={showInviteUser}
        onClose={() => {
          setShowInviteUser(false);
        }}
        onSubmit={async (email, role) => {
          setShowInviteUser(false);

          try {
            await inviteUser({
              email,
              role,
              company_id: companyId,
            });
          } catch (err) {}
        }}
      />
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false);
        }}
        onSubmit={async (email, role) => {
          setShowCreateProject(false);

          try {
          } catch (err) {}
        }}
      />
    </>
  );
};

export default CompanyDashboard;
