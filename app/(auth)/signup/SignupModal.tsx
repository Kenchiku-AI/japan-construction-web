import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { CreateCompanyRequest } from "@/types/companies";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: CreateCompanyRequest) => void;
}

const SignupModal: FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setEmail("");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("sign_up")}
      subtitle={t("sign_up_modal_description")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("company")} onChange={setName} />
        <Input
          value={email}
          placeholder={t("company_email")}
          onChange={setEmail}
        />
      </div>
      <Button
        disabled={!name || !email}
        label={t("send_registration_link")}
        onClick={() => {
          onSubmit({
            name,
            manager_email: email,
          });

          reset();
        }}
      />
    </Modal>
  );
};

export default SignupModal;
