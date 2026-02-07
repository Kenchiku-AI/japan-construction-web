import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input";
import Modal from "@/app/ui/Modal";
import Select from "@/app/ui/Select";
import { UserRole } from "@/types";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, role: UserRole) => void;
}

const NewCompanyModal: FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.User);
  const { t } = useTranslation();

  const resetFields = () => {
    setTimeout(() => {
      setEmail("");
      setRole(UserRole.User);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetFields();
      }}
      title={t("invite_user")}
      subtitle={t("invite_user_description")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={email} placeholder={t("email")} onChange={setEmail} />
        <Select
          placeholder={t("role")}
          value={role}
          options={[
            { value: UserRole.User, label: t("user") },
            { value: UserRole.Manager, label: t("manager") },
          ]}
          onChange={(value) => {
            setRole(value as UserRole);
          }}
        />
      </div>
      <Button
        disabled={!email || !role}
        label={t("invite")}
        onClick={() => {
          resetFields();
          onSubmit(email, role);
        }}
      />
    </Modal>
  );
};

export default NewCompanyModal;
