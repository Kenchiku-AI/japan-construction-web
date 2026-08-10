import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";

interface ArchiveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArchive: () => void;
}

const ArchiveProjectModal: FC<ArchiveProjectModalProps> = ({
  isOpen,
  onClose,
  onArchive,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("archive_project")}
      subtitle={t("archive_project_description")}
    >
      <div className="mt-8 flex flex-col gap-3">
        <Button label={t("archive")} onClick={onArchive} />
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

export default ArchiveProjectModal;
