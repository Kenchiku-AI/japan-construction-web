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
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "./useUser";
import { Loader } from "@/app/ui/Loader";
import Select from "@/app/ui/Select/Select";

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: FC<UserDashboardProps> = ({ userId }) => {
  const { t } = useTranslation();
  const { loading, user, updateUser } = useUser(userId);
  const userRef = useRef(user);
  const { currentUser, logout } = useApi();
  const { showModal } = useModal();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>();
  const [isConfirmLogoutShown, setIsConfirmLogoutShown] = useState(false);

  const isEditDisabled = useMemo(() => {
    if (!user || !currentUser) return true;

    if (currentUser.role === UserRole.Admin) return false;

    return currentUser.id !== userId;
  }, [user, currentUser]);

  const isRoleDisabled = useMemo(() => {
    if (!currentUser || !user) return true;

    if (currentUser.role === UserRole.Admin) return false;

    if (currentUser.role === UserRole.User) return true;

    return user.role === UserRole.Admin;
  }, [user, currentUser]);

  const isUpdateDisabled = useMemo(() => {
    if (!email || !firstName || !lastName || !user) return true;
    if (email !== user.email) return false;
    if (firstName !== user.first_name) return false;
    if (lastName !== user.last_name) return false;
    if (role !== user.role) return false;

    return true;
  }, [firstName, lastName, email, user, role]);

  useEffect(() => {
    if (!!userRef.current || !user) return;

    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setEmail(user.email);
    setRole(user.role);

    userRef.current = user;
  }, [user]);

  const roleOptions = [
    { label: t("manager"), value: UserRole.Manager },
    { label: t("user"), value: UserRole.User },
  ];

  const showUpdateButton = !isEditDisabled || !isRoleDisabled;

  if (
    user &&
    currentUser &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company?.id !== user.company_id
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
      <Divider />
      {!!user && (
        <>
          <div className="flex flex-col gap-3 mt-3">
            <Input
              placeholder={t("last_name")}
              value={lastName}
              onChange={(t) => {
                setLastName(t);
              }}
              disabled={isEditDisabled}
            />
            <Input
              placeholder={t("first_name")}
              value={firstName}
              onChange={(t) => {
                setFirstName(t);
              }}
              disabled={isEditDisabled}
            />
            <Input
              placeholder={t("email")}
              value={email}
              onChange={(t) => {
                setEmail(t);
              }}
              disabled={isEditDisabled}
            />
            <Select
              placeholder={t("role")}
              options={roleOptions}
              value={role}
              onChange={(r) => setRole(r as UserRole)}
              disabled={isRoleDisabled}
            />
          </div>
          {showUpdateButton && (
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
              <Button
                label={t("update_user")}
                onClick={() => {
                  if (!role) return;

                  if (!emailRegex.test(email)) {
                    showModal({
                      title: t("invalid_email"),
                      subtitle: t("invalid_email_description"),
                    });
                    return;
                  }

                  updateUser({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    role: role,
                  });
                }}
                disabled={isUpdateDisabled}
              />
            </div>
          )}
        </>
      )}
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
      {loading && <Loader />}
    </>
  );
};

export default UserDashboard;
