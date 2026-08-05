import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Modal from "@/app/ui/Modal";
import { ConversationItemType } from "@/types";
import { Check, Trash } from "@/app/ui/Icons";
import { errorColor1 } from "@/lib/constants";

interface EditConversationItemTypeModalProps {
  conversationItemType?: ConversationItemType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  onDelete: (conversationItemType: ConversationItemType) => void;
}

const EditConversationItemTypeModal: FC<EditConversationItemTypeModalProps> = ({
  conversationItemType,
  isOpen,
  onClose,
  onSubmit,
  onDelete
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  const closeAndReset = () => {
    onClose();

    setTimeout(() => {
      setName("");
      setDescription("");
    }, 500);
  };

  useEffect(() => {
    if (isOpen && conversationItemType) {
      setName(conversationItemType.name);
      setDescription(conversationItemType.description);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={t("edit_conversation_item_type")}
      subtitle={t("conversation_item_type_description")}
      width={640}
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          disabled={!conversationItemType || !name || !description}
          iconLeft={() => <Check color="white" />}
          label={t("update")}
          onClick={() => {
            onSubmit(name, description);
            closeAndReset();
          }}
        />
        <Button
          variant="secondary"
          iconLeft={() => <Trash />}
          style={{ borderColor: errorColor1, height: 60 }}
          textStyle={{ color: errorColor1 }}
          label={t("delete")}
          onClick={() => {
            if (conversationItemType) {
              onDelete(conversationItemType);
            }

            closeAndReset();
          }}
        />
      </div>
    </Modal>
  );
};

export default EditConversationItemTypeModal;
