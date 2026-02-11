import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { InviteUserRequest } from "@/types/companies";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input";
import Modal from "@/app/ui/Modal";
import Select from "@/app/ui/Select";
import { UserRole } from "@/types";
import { TextArea } from "@/app/ui/TextArea";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description?: string) => void;
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_project")}
      subtitle={t("create_project_description")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("name")} onChange={setName} />
        <TextArea
          value={description}
          placeholder={t("description")}
          onChange={setDescription}
        />
      </div>
      <Button
        disabled={!name}
        label={t("create")}
        onClick={() => {
          reset();
          onSubmit(name, description);
        }}
      />
    </Modal>
  );
};

export default CreateProjectModal;
