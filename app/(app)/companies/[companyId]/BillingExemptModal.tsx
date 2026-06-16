import { FC } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button/Button";

interface BillingExemptModalProps {
  isOpen: boolean;
  isEnabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BillingExemptModal: FC<BillingExemptModalProps> = ({
  isOpen,
  isEnabled,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const prefix = isEnabled ? "enable" : "disable";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(`${prefix}_billing`)}
      subtitle={t(`${prefix}_billing_description`)}
    >
      <div className="mt-8 grid lg:grid-col-2 gap-2">
        <Button
          label={t(prefix)}
          onClick={onConfirm}
        />
        <Button
          variant="secondary"
          style={{ height: 60, width: "100%" }}
          label={t("cancel")}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

export default BillingExemptModal;
