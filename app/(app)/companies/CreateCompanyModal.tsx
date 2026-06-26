import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { CreateCompanyRequest } from "@/types/companies";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: CreateCompanyRequest) => void;
}

const CreateCompanyModal: FC<CreateCompanyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [corporateNumber, setCorporateNumber] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setCorporateNumber("");
      setManagerEmail("");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_company")}
      subtitle={t("create_company_description")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("name")} onChange={setName} />
        {/* <Input
          value={corporateNumber}
          placeholder={t("corporate_number")}
          onChange={setCorporateNumber}
        /> */}
        <Input
          value={managerEmail}
          placeholder={t("manager_email")}
          onChange={setManagerEmail}
        />
      </div>
      <Button
        disabled={!name || !managerEmail}
        label={t("create")}
        onClick={() => {
          onSubmit({
            name,
            // corporate_number: corporateNumber,
            manager_email: managerEmail,
          });

          reset();
        }}
      />
    </Modal>
  );
};

export default CreateCompanyModal;
