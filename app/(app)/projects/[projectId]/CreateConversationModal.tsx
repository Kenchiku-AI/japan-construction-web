import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Modal from "@/app/ui/Modal";

interface CreateConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateActionItemModal: FC<CreateConversationModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_action_item")}
    >
      <div className="flex flex-col gap-3 my-6">
        <Input
          value={name}
          placeholder={t("name")}
          onChange={(n) => {
            setName(n);
          }}
        />
      </div>
      <Button
        disabled={!name}
        label={t("create")}
        onClick={() => {
          onCreate(name);
          reset();
        }}
      />
    </Modal>
  );
};

export default CreateActionItemModal;
