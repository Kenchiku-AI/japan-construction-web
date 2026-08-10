import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";

interface UnarchiveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnarchive: () => void;
}

const UnarchiveProjectModal: FC<UnarchiveProjectModalProps> = ({
  isOpen,
  onClose,
  onUnarchive,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("unarchive_project")}
      subtitle={t("unarchive_project_description")}
    >
      <div className="mt-8 flex flex-col gap-3">
        <Button label={t("unarchive")} onClick={onUnarchive} />
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

export default UnarchiveProjectModal;
