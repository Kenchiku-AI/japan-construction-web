import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button/Button";
import { Conversation, ConversationRange } from "@/types";
import Divider from "@/app/ui/Divider";

interface AutofillModalProps {
  conversations: Conversation[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const AutofillModal: FC<AutofillModalProps> = ({
  conversations,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedConversations, setSelectedConversations] = useState<ConversationRange[]>([]);
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      title={t("autofill_from_chat")}
      subtitle={t("autofill_from_chat_description")}
    >
      {conversations.map((c) => (

      ))}
      <div className="mt-8 grid lg:grid-col-2 gap-2">
        <Button label={t("delete_report")} onClick={onSubmit} />
        <Button
          variant="secondary"
          style={{ height: 60, width: "100%" }}
          label={t("cancel")}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

interface ConversationRowProps {
  conversation: Conversation;
  isSelected: boolean;
  startTime: string;
  endTime: string;
  onSelect: (isSelected: boolean) => void;
  onUpdateStartTime: (start_time: string) => void;
  onUpdateEndTime: (end_time: string) => void;
}

const ConversationRow: FC<ConversationRowProps> = ({
  conversation,
  isSelected,
  startTime,
  endTime,
  onSelect,
  onUpdateStartTime,
  onUpdateEndTime
}) => {
  return (
    <div>
      <label className="label flex gap-4 mx-3 my-5">
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={isSelected}
          onChange={() => {
            onSelect(!isSelected);
          }}
        />
        {conversation.name}
      </label>
      <div
        style={{
          transition: "height 0.5s ease-in-out",
          height: isSelected ? 60 : 0
        }}
      >
      </div>
      <Divider />
    </div>
  )
}

export default AutofillModal;
