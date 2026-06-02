import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { errorColor1, existingUserInvitationTokenKey } from "@/lib/constants";

interface ExistingUserInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExistingUserInvitationModal: FC<ExistingUserInvitationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("login_to_accept_invite")}
      subtitle={t("login_to_accept_invite_description")}
    >
      <div className="mt-8 flex flex-col gap-3">
        <Button label={t("ok")} onClick={onClose} />
        <Button
          variant="secondary"
          style={{ height: 60, borderColor: errorColor1 }}
          textStyle={{ color: errorColor1 }}
          label={t("remove_invitation")}
          onClick={() => {
            sessionStorage.removeItem(existingUserInvitationTokenKey);
            onClose();
          }}
        />
      </div>
    </Modal>
  );
};

export default ExistingUserInvitationModal;
