import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button/Button";

interface UpdateBillingPlanModalProps {
  billingPlanId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const UpdateBillingPlanModal: FC<UpdateBillingPlanModalProps> = ({
  billingPlanId,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [prefix, setPrefix] = useState("disable");

  useEffect(() => {
    if (!isOpen) return;

    const newPrefix = billingPlanId === "none" ? "cancel" : "update";
    setPrefix(newPrefix);
  }, [billingPlanId, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(`${prefix}_billing_plan`)}
      subtitle={t(`${prefix}_billing_plan_description`)}
    >
      <div className="mt-8 grid lg:grid-col-2 gap-2">
        <Button
          label={t(`${prefix}_billing_plan_button`)}
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

export default UpdateBillingPlanModal;
