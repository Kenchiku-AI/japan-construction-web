import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { CreateCompanyRequest } from "@/types/companies";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input";
import { Heading } from "@/app/ui/Heading/Heading";
import { Close } from "@/app/ui/Icons";

interface NewCompanyModalProps {
  onSubmit: (request: CreateCompanyRequest) => void;
}

const NewCompanyModal: FC<NewCompanyModalProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [corporateNumber, setCorporateNumber] = useState("");
  const [managerEmail, setManagerEmail] = useState<string>();
  const { t } = useTranslation();

  const resetFields = () => {
    setTimeout(() => {
      setName("");
      setCorporateNumber("");
      setManagerEmail(undefined);
    }, 500);
  };

  return (
    <dialog id="create_company_modal" className="modal">
      <div className="modal-box">
        <form method="dialog" className="flex flex-col">
          <button
            className="self-end hover:cursor-pointer"
            onClick={() => {
              resetFields();
            }}
          >
            <Close />
          </button>
        </form>
        <Heading
          title={t("create_company")}
          subtitle={t("create_company_description")}
        />
        <div className="my-8 flex flex-col gap-3">
          <Input value={name} placeholder={t("name")} onChange={setName} />
          <Input
            value={corporateNumber}
            placeholder={t("corporate_number")}
            onChange={setCorporateNumber}
          />
          <Input
            value={managerEmail}
            placeholder={t("manager_email")}
            onChange={setManagerEmail}
          />
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex flex-1">
            <Button
              disabled={!name || !corporateNumber}
              label={t("create")}
              onClick={() => {
                onSubmit({
                  name,
                  corporate_number: corporateNumber,
                  manager_email: managerEmail,
                });

                resetFields();
              }}
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default NewCompanyModal;
