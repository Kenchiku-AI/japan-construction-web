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
      <div className="flex justify-between items-center mt-6">
        <div className="text-xl">{t("users")}</div>
        <Button
          variant="secondary"
          label={t("invite_user")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowInviteUser(true);
          }}
        />
      </div>
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
          } catch (err) {
            console.log("error:", err);
          }
        }}
      />
    </>
  );
};

export default CompanyDashboard;
