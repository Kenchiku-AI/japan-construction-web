import { FC, useCallback, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";

interface LineChannelAccessTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (token: string) => void;
}

const LineChannelAccessTokenModal: FC<LineChannelAccessTokenModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [token, setToken] = useState("");
  const { t } = useTranslation();

  const closeAndReset = useCallback(() => {
    onClose();

    setTimeout(() => {
      setToken("");
    }, 500);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={t("channel_access_token")}
      subtitle={t("channel_access_token_description")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={token} placeholder={t("channel_access_token")} onChange={setToken} />
      </div>
      <Button
        disabled={!token}
        label={t("update")}
        onClick={() => {
          if (!token) return;

          closeAndReset();

          setTimeout(() => {
            onSubmit(token);
          }, 500);
        }}
      />
    </Modal>
  );
};

export default LineChannelAccessTokenModal;
