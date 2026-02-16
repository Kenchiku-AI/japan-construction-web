"use client";

import { FC, useState } from "react";
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
import Divider from "@/app/ui/Divider";
import { useModal } from "@/lib/modal/ModalContext";

interface CompanyDashboardProps {
  companyId: string;
}

const CompanyDashboard: FC<CompanyDashboardProps> = ({ companyId }) => {
  const { currentUser, inviteUser } = useApi();
  const { t } = useTranslation();
  const { company, createProject } = useCompany(companyId);
  const searchParams = useSearchParams();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const { showModal } = useModal();

  const shouldRedirect =
    currentUser &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company?.id !== companyId;

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={company?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("company")}
        placeholder={t("company_name")}
        isEditable={currentUser?.role === UserRole.Admin}
        onEdit={(n) => {}}
      />
      {company && (
        <div className="flex flex-col gap-12">
          <div>
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
            <Divider />
            <CompanyProjectsList projects={company.projects} />
          </div>
          <div>
            <div className="flex justify-between">
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
            <Divider />
            <CompanyUsersList users={company.users} />
          </div>
        </div>
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
            showModal({
              title: t("invitation_sent"),
              subtitle: t("invitation_sent_description"),
            });
          } catch (err) {
            showModal({
              title: t("error"),
              subtitle: t("invitation_send_error_description"),
            });
          }
        }}
      />
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false);
        }}
        onSubmit={async (name, description) => {
          setShowCreateProject(false);

          try {
            await createProject(name, description);
          } catch (err) {}
        }}
      />
    </>
  );
};

export default CompanyDashboard;
