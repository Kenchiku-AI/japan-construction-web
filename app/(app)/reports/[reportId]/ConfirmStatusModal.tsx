import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button/Button";
import { ReportStatus } from "@/types";

interface ConfirmStatusModalProps {
  currentStatus: ReportStatus;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmStatusModal: FC<ConfirmStatusModalProps> = ({
  currentStatus,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [prefix, setPrefix] = useState("disable");

  useEffect(() => {
    if (!isOpen) return;

    const newPrefix = currentStatus === "closed" ? "open" : "close";
    setPrefix(newPrefix);
  }, [currentStatus, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(`${prefix}_report`)}
      subtitle={t(`${prefix}_report_description`)}
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

export default ConfirmStatusModal;
