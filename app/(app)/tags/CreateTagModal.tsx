import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

const CreateTagModal: FC<CreateTagModalProps> = ({
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
      title={t("create_tag")}
      subtitle={t("create_tag_description")}
      width={640}
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
        disabled={!name || !description}
        label={t("create")}
        onClick={() => {
          reset();
          onSubmit(name, description);
        }}
      />
    </Modal>
  );
};

export default CreateTagModal;
