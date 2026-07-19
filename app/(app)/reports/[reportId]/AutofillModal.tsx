import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button/Button";
import { Conversation, ConversationRange } from "@/types";
import Divider from "@/app/ui/Divider";
import { fontColor1 } from "@/lib/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale";

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
      <div className="my-8">
        <Divider />
        {conversations.map((c) => {
          const selectedConversation = selectedConversations.find((sc) => sc.conversation_id === c.id);

          return (
            <ConversationRow
              conversation={c}
              isSelected={!!selectedConversation}
              startTime={selectedConversation?.start_time}
              endTime={selectedConversation?.end_time}
              onSelect={(s) => {
                if (!!selectedConversation) {
                  setSelectedConversations((prev) => (
                    prev.filter((sc) => sc.conversation_id !== c.id)
                  ));
                } else {
                  setSelectedConversations((prev) => (
                    [
                      ...prev,
                      {
                        conversation_id: c.id,
                        start_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                        end_time: new Date().toISOString()
                      }
                    ]
                  ));
                }
              }}
              onUpdateStartTime={() => {

              }}
              onUpdateEndTime={() => {

              }}
            />
          );
        })}
      </div>
      <div className="grid lg:grid-col-2 gap-2">
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
  startTime?: string;
  endTime?: string;
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
  const [date, setDate] = useState<Date | null>(new Date());
  //   const [startTimeValue, setStartTimeValue] = useState("")
  //   const getISOstring = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const localValue = e.target.value;

  //   setValue(localValue);

  //   const iso = new Date(localValue).toISOString();

  //   console.log(localValue); // "2026-07-19T21:30"
  //   console.log(iso);        // "2026-07-19T12:30:00.000Z" (example)
  // };

  return (
    <div>
      <label className="label flex gap-4 mx-3 my-5" style={{ color: fontColor1 }}>
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
          transition: "height 0.1s ease-in-out",
          height: isSelected ? 60 : 0,
          overflow: "hidden"
        }}
      >
        {/* <input
          type="datetime-local"
          className="input input-bordered w-full"
        // value={startTime}
        />
        <input
          type="datetime-local"
          className="input input-bordered w-full"
        // value={endTime}
        /> */}
        <DatePicker
          selected={date}
          onChange={(d: any) => setDate(d)}
          locale={ja}
          timeFormat="HH:mm"
          dateFormat="yyyy/MM/dd HH:mm"
          timeIntervals={15}
          className="input input-bordered w-full"
          showTimeSelect
        />
      </div>
      <Divider />
    </div>
  )
}

export default AutofillModal;
