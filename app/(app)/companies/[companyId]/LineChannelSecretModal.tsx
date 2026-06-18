import { FC, useCallback, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";

interface LineChannelSecretModalProps {
  secret?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (secret: string) => void;
}

const LineChannelSecretModal: FC<LineChannelSecretModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [secret, setSecret] = useState("");
  const { t } = useTranslation();

  const closeAndReset = useCallback(() => {
    onClose();

    setTimeout(() => {
      setSecret("");
    }, 500);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={t("line_channel_secret")}
      subtitle={t("line_channel_secret_description")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={secret} placeholder={t("line_channel_secret")} onChange={setSecret} />
      </div>
      <Button
        disabled={!secret}
        label={t("update")}
        onClick={() => {
          if (!secret) return;

          closeAndReset();

          setTimeout(() => {
            onSubmit(secret);
          }, 500);
        }}
      />
    </Modal>
  );
};

export default LineChannelSecretModal;
