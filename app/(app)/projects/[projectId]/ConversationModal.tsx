import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { Conversation, ConversationItemType } from "@/types";
import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor3 } from "@/lib/constants";

interface ConversationModalProps {
  conversation?: Conversation;
  conversationItemTypes: ConversationItemType[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, itemTypes: ConversationItemType[]) => void;
}

const CreateActionItemModal: FC<ConversationModalProps> = ({
  conversation,
  conversationItemTypes,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [selectedItemTypes, setSelectedItemTypes] = useState<ConversationItemType[]>([]);
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setSelectedItemTypes([]);
    }, 500);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (conversation) {
      setName(conversation.name);
      setSelectedItemTypes(conversation.item_types);
    } else {
      setSelectedItemTypes(conversationItemTypes);
    }
  }, [isOpen, conversation]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={conversation ? t("update_conversation") : t("create_conversation")}
    >
      <div className="flex flex-col gap-3 my-6">
        <Input
          value={name}
          placeholder={t("name")}
          onChange={(n) => {
            setName(n);
          }}
        />
        {(conversationItemTypes?.length ?? 0) > 0 && (
          <div className="mt-8">
            <div style={{ color: fontColor3 }}>{t("conversation_item_types")}</div>
            <Divider />
            {conversationItemTypes.map((c) => {
              const isChecked = selectedItemTypes.some((it) => it.id === c.id);

              return (
                <div key={c.id}>
                  <label className="label flex gap-4 mx-3 my-5" style={{ color: fontColor1 }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-neutral"
                      checked={isChecked}
                      onChange={() => {
                        setSelectedItemTypes((prevSelected) => {
                          if (isChecked) {
                            return prevSelected.filter((p) => p.id !== c.id);
                          } else {
                            return [...prevSelected, c];
                          }
                        });
                      }}
                    />
                    {c.name}
                  </label>
                  <Divider />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Button
        disabled={!name}
        label={conversation ? t("update") : t("create")}
        onClick={() => {
          onSubmit(name, selectedItemTypes);
          reset();
        }}
      />
    </Modal>
  );
};

export default CreateActionItemModal;
