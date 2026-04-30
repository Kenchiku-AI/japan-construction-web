"use client";

import { Button } from "@/app/ui/Button/Button";
import Divider from "@/app/ui/Divider";
import { Heading } from "@/app/ui/Heading/Heading";
import { Logout } from "@/app/ui/Icons";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { useApi } from "@/lib/api/ApiContext";
import { emailRegex } from "@/lib/constants";
import { useModal } from "@/lib/modal/ModalContext";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: FC<UserDashboardProps> = ({ userId }) => {
  const { t } = useTranslation();
  const { currentUser, logout, updateUser } = useApi();
  const { showModal } = useModal();
  const [firstName, setFirstName] = useState(currentUser?.first_name ?? "");
  const [lastName, setLastName] = useState(currentUser?.last_name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [isConfirmLogoutShown, setIsConfirmLogoutShown] = useState(false);

  const isDisabled = useMemo(() => {
    if (!email || !firstName || !lastName) return true;
    if (email !== currentUser?.email) return false;
    if (firstName !== currentUser?.first_name) return false;
    if (lastName !== currentUser?.last_name) return false;

    return true;
  }, [firstName, lastName, email]);

  if (
    currentUser &&
    currentUser.role !== UserRole.Admin &&
    currentUser.id !== userId
  ) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("user")} />
        {userId === currentUser?.id && (
          <Button
            variant="tertiary"
            label={t("logout")}
            style={{ height: "auto" }}
            onClick={() => {
              setIsConfirmLogoutShown(true);
            }}
            iconLeft={() => <Logout />}
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Divider />
        <Input
          placeholder={t("first_name")}
          value={firstName}
          onChange={(t) => {
            setFirstName(t);
          }}
        />
        <Input
          placeholder={t("last_name")}
          value={lastName}
          onChange={(t) => {
            setLastName(t);
          }}
        />
        <Input
          placeholder={t("email")}
          value={email}
          onChange={(t) => {
            setEmail(t);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        <Button
          label={t("update_user")}
          onClick={() => {
            if (!emailRegex.test(email)) {
              showModal({
                title: t("invalid_email"),
                subtitle: t("invalid_email_description"),
              });
              return;
            }

            updateUser(userId, {
              first_name: firstName,
              last_name: lastName,
              email: email,
            });
          }}
          disabled={isDisabled}
        />
      </div>
      <Modal
        title={t("confirm_logout")}
        subtitle={t("confirm_logout_description")}
        isOpen={isConfirmLogoutShown}
        onClose={() => setIsConfirmLogoutShown(false)}
      >
        <div className="mt-6 flex flex-col gap-3">
          <Button label={t("logout")} onClick={() => logout()} />
          <Button
            variant="secondary"
            style={{ height: 60 }}
            label={t("cancel")}
            onClick={() => setIsConfirmLogoutShown(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserDashboard;
