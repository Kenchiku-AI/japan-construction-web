"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import { useCompany } from "../useCompany";
import { Plus } from "@/app/ui/Icons";
import InviteUserModal from "../InviteUserModal";
import CompanyUsersList from "../CompanyUsersList";
import { useModal } from "@/lib/modal/ModalContext";
import RemoveUserModal from "../RemoveUserModal";
import { Loader } from "@/app/ui/Loader";
import { cardClass } from "@/lib/constants";
import { Heading } from "@/app/ui/Heading/Heading";

interface UsersDashboardProps {
  companyId: string;
}

const UsersDashboard: FC<UsersDashboardProps> = ({ companyId }) => {
  const { currentUser, inviteUser } = useApi();
  const { t } = useTranslation();
  const {
    loading: companyLoading,
    company,
    removeUser,
  } = useCompany(companyId);
  const [showInviteUser, setShowInviteUser] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const { showModal } = useModal();

  const isAdmin = currentUser?.role === UserRole.Admin;
  const isAdminOrManager = isAdmin || currentUser?.role === UserRole.Manager;

  if (!!currentUser && !currentUser.company?.id) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("users")} />
        <Button
          variant="tertiary"
          style={{ height: "auto" }}
          label={t("invite_user")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowInviteUser(true);
          }}
          iconOnlyMobile
        />
      </div>
      {company && (
        <div className={cardClass}>
          <CompanyUsersList
            users={company.users}
            onRemove={(userId) => setUserIdToRemove(userId)}
            onClickUser={() => {
              setShowLoader(true);
            }}
            forceShowAll
          />
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
      <RemoveUserModal
        isOpen={!!userIdToRemove}
        onClose={() => {
          setUserIdToRemove("");
        }}
        onRemove={() => {
          removeUser(userIdToRemove);
          setUserIdToRemove("");
        }}
      />
      {(showLoader || companyLoading) && <Loader />}
    </>
  );
};




export default UsersDashboard;
