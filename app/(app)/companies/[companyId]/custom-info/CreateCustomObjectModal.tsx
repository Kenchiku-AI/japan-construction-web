import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";

interface CreateCustomObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const CreateCustomFieldModal: FC<CreateCustomObjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
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
      title={t("create_custom_object")}
      subtitle={t("custom_object_description")}
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
          onCreate(name, description,);
        }}
      />
    </Modal>
  );
};

export default CreateCustomFieldModal;
