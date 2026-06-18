import { FC, useCallback, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import LineWebhookButton from "./LineWebhookButton";

interface LineWebookModalProps {
  companyId: string;
  isOpen: boolean;
  onClose: () => void;
}

const LineWebhookModal: FC<LineWebookModalProps> = ({
  companyId,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("line_webhook")}
      subtitle={t("line_webhook_description")}
    >
      <div className="my-12 flex justify-center">
        <LineWebhookButton companyId={companyId} />
      </div>
      <Button
        label={t("ok")}
        onClick={onClose}
      />
    </Modal>
  );
};

export default LineWebhookModal;
