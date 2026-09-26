import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";

interface DeleteCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCompanyModal: FC<DeleteCompanyModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("delete_company")}
      subtitle={t("delete_company_description")}
    >
      <div className="mt-8 flex flex-col gap-3">
        <Button label={t("delete")} onClick={onDelete} />
        <Button
          variant="secondary"
          style={{ height: 60 }}
          label={t("cancel")}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

export default DeleteCompanyModal;
