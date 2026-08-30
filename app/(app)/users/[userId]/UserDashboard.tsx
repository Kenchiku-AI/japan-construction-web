"use client";

import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { Check, Close, Edit, Logout } from "@/app/ui/Icons";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { useApi } from "@/lib/api/ApiContext";
import { cardClass, emailRegex, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { useModal } from "@/lib/modal/ModalContext";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "./useUser";
import { Loader } from "@/app/ui/Loader";
import Select from "@/app/ui/Select/Select";
import Divider from "@/app/ui/Divider";
import CustomFieldListCell from "@/app/ui/CustomFieldListCell/CustomFieldListCell";

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: FC<UserDashboardProps> = ({ userId }) => {
  const { t } = useTranslation();
  const {
    loading,
    user,
    updateUser,
    customFieldDefinitions,
    customFields,
    setCustomFields,
    customRelationships,
    setCustomRelationships,
    customObjectsByDefinition,
    projects,
    users,
    resetCustomField,
    updateCustomField,
  } = useUser(userId);
  const userRef = useRef(user);
  const { currentUser, logout } = useApi();
  const { showModal } = useModal();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isConfirmLogoutShown, setIsConfirmLogoutShown] = useState(false);

  const isEditDisabled = useMemo(() => {
    if (!user || !currentUser) return true;

    if (
      currentUser.role === UserRole.Admin ||
      currentUser.role === UserRole.Manager
    ) return false;

    return currentUser.id !== userId;
  }, [user, currentUser]);

  const isRoleDisabled = useMemo(() => {
    if (!currentUser || !user) return true;

    if (currentUser.id === userId) return true;

    if (currentUser.role === UserRole.Admin) return false;

    if (currentUser.role === UserRole.User) return true;

    return user.role === UserRole.Admin;
  }, [user, currentUser]);

  useEffect(() => {
    if (!!userRef.current || !user) return;

    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setEmail(user.email);
    setRole(user.role);

    userRef.current = user;
  }, [user]);

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
      <div className={cardClass}>
        {!!user && (
          <>
            <div className="flex flex-col">
              <EditableField
                label={t("last_name")}
                value={lastName}
                onChange={(t) => {
                  setLastName(t);
                }}
                onSubmit={() => {
                  updateUser({ last_name: lastName });
                }}
                onCancel={() => {
                  setLastName(user.last_name ?? "");
                }}
                isDisabled={isEditDisabled}
              />
              <Divider />
              <EditableField
                label={t("first_name")}
                value={firstName}
                onChange={(t) => {
                  setFirstName(t);
                }}
                onSubmit={() => {
                  updateUser({ first_name: firstName });
                }}
                onCancel={() => {
                  setFirstName(user.first_name ?? "");
                }}
                isDisabled={isEditDisabled}
              />
              <Divider />
              <EditableField
                label={t("email")}
                value={email}
                onChange={(t) => {
                  setEmail(t);
                }}
                onSubmit={() => {
                  if (!emailRegex.test(email)) {
                    showModal({
                      title: t("invalid_email"),
                      subtitle: t("invalid_email_description"),
                    });
                    return;
                  }

                  updateUser({ email });
                }}
                onCancel={() => {
                  setEmail(user.email ?? "");
                }}
                isDisabled={isEditDisabled}
              />
              <Divider />
              <EditableField
                label={t("role")}
                value={role}
                onChange={(t) => {
                  setRole(t);
                }}
                onSubmit={() => {
                  updateUser({ role: role as UserRole });
                }}
                onCancel={() => {
                  setRole(user.role ?? "");
                }}
                isDisabled={isRoleDisabled}
                isRole
              />
              {customFieldDefinitions.map((item) => (
                <div key={item.id}>
                  <Divider />
                  <CustomFieldListCell
                    fields={customFields}
                    relationships={customRelationships}
                    definition={item}
                    projects={projects}
                    users={users}
                    customObjectsByDefinition={customObjectsByDefinition}
                    onFieldChange={(value) => {
                      setCustomFields((prev) => ({
                        ...prev,
                        [item.id]: value
                      }));
                    }}
                    onRelationshipChange={(value) => {
                      setCustomRelationships((prev) => ({
                        ...prev,
                        [item.id]: value
                      }));
                    }}
                    onCancel={() => {
                      resetCustomField(item.id);
                    }}
                    onSubmit={() => {
                      updateCustomField(item.id);
                    }}
                    isEditable={!isEditDisabled}
                  />
                </div>
              ))}
            </div>
          </>
        )}
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
      {loading && <Loader />}
    </>
  );
};

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isDisabled: boolean;
  isRole?: boolean;
}

const EditableField: FC<EditableFieldProps> = ({
  label,
  value,
  onChange,
  onSubmit,
  onCancel,
  isDisabled,
  isRole
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();

  const roleOptions = [
    { label: t("manager"), value: UserRole.Manager },
    { label: t("user"), value: UserRole.User },
  ];

  if (isEditing) {
    return (
      <div className="flex flex-col">
        {isRole ? (
          <Select
            placeholder={t("role")}
            options={roleOptions}
            value={value}
            onChange={(v) => onChange(v as string)}
            disabled={isDisabled}
          />
        ) : (
          <Input
            value={value}
            placeholder={label}
            onChange={onChange}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginTop: 12,
            marginBottom: 6,
            marginLeft: 6,
            gap: 24,
          }}
        >
          <Button
            variant="tertiary"
            iconLeft={() => <Check />}
            style={{ height: "auto" }}
            label={t("update")}
            onClick={() => {
              setIsEditing(false);
              onSubmit();
            }}
            disabled={!value}
          />
          <Button
            variant="tertiary"
            iconLeft={() => (
              <div style={{ marginRight: -3 }}>
                <Close color={errorColor1} />
              </div>
            )}
            style={{ height: "auto" }}
            label={t("cancel")}
            onClick={() => {
              setIsEditing(false);
              onCancel();
            }}
            textStyle={{ color: errorColor1 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-1 items-center"
      style={{ minHeight: 60 }}
    >
      <div className="md:px-3 flex flex-1">
        <div>
          {!!value && (
            <div
              style={{
                color: fontColor2,
                fontSize: 12
              }}>
              {label}
            </div>
          )}
          <div
            style={{
              color: !value ? fontColor2 : fontColor1,
            }}
          >
            {(isRole ? t(value) : value) || label}
          </div>
        </div>
      </div>
      {!isDisabled && (
        <div
          className="cursor-pointer md:pr-3"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <Edit />
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
