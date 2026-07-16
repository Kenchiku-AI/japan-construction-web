import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Modal from "@/app/ui/Modal";

interface CreateConversationItemTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const CreateConversationItemTypeModal: FC<CreateConversationItemTypeModalProps> = ({
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
      title={t("create_conversation_item_type")}
      subtitle={t("conversation_item_type_description")}
    >
      <div className="flex flex-col gap-3 my-6">
        <Input
          value={name}
          placeholder={t("name")}
          onChange={(n) => {
            setName(n);
          }}
        />
        <TextArea
          value={description}
          placeholder={t("description")}
          onChange={(d) => {
            setDescription(d);
          }}
        />
      </div>
      <Button
        disabled={!name || !description}
        label={t("create")}
        onClick={() => {
          onCreate(name, description);
          reset();
        }}
      />
    </Modal>
  );
};

export default CreateConversationItemTypeModal;
