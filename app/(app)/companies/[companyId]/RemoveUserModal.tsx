import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";

interface RemoveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveUserModal: FC<RemoveUserModalProps> = ({
  isOpen,
  onClose,
  onRemove,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("remove_user")}
      subtitle={t("remove_user_description")}
    >
      <div className="mt-8 flex flex-col gap-3">
        <Button label={t("remove")} onClick={onRemove} />
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

export default RemoveUserModal;
