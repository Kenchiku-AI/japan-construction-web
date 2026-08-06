import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button/Button";
import { AutofillRequest, Conversation, ConversationRange } from "@/types";
import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2, fontColor3 } from "@/lib/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale";
import { useIsMobile } from "@/lib/useIsMobile";
import styles from "./page.module.css";

interface AutofillModalProps {
  conversations: Conversation[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: AutofillRequest) => void;
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
              key={c.id}
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
                        start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
                        end_time: new Date(),
                      }
                    ]
                  ));
                }
              }}
              onUpdateStartTime={(startTime) => {
                setSelectedConversations(prev =>
                  prev.map(sc =>
                    sc.conversation_id === c.id
                      ? { ...sc, start_time: startTime }
                      : sc
                  )
                );
              }}
              onUpdateEndTime={(endTime) => {
                setSelectedConversations(prev =>
                  prev.map(sc =>
                    sc.conversation_id === c.id
                      ? { ...sc, end_time: endTime }
                      : sc
                  )
                );
              }}
            />
          );
        })}
      </div>
      <div className="grid lg:grid-col-2 gap-2">
        <Button
          label={t("autofill")}
          onClick={() => {
            const request = {
              conversations: selectedConversations.map(c => ({
                conversation_id: c.conversation_id,
                start_time: c.start_time.toISOString(),
                end_time: c.end_time.toISOString(),
              })),
            };

            onSubmit(request);

            setTimeout(() => {
              setSelectedConversations([]);
            }, 500);
          }}
        />
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
  startTime?: Date;
  endTime?: Date;
  onSelect: (isSelected: boolean) => void;
  onUpdateStartTime: (start_time: Date) => void;
  onUpdateEndTime: (end_time: Date) => void;
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
  const { t } = useTranslation();
  const { isMobile } = useIsMobile();

  return (
    <div>
      <label className="label flex gap-4 mx-3 py-2" style={{ color: fontColor1 }}>
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
        className="px-3"
        style={{
          transition: "height 0.1s ease-in-out",
          height: isSelected ? (isMobile ? 155 : 85) : 0,
          overflow: "hidden"
        }}
      >
        <Divider />
        <div className="px-3 py-2 flex gap-4 flex-col md:flex-row md:items-center">
          <div className={`datePicker ${isMobile ? "" : "datePickerLeft"}`}>
            <div className={styles.inputLabel}>
              {t("start_time")}
            </div>
            <DatePicker
              selected={startTime}
              onChange={(d: any) => {
                if (d) {
                  onUpdateStartTime(d);
                }
              }}
              locale={ja}
              timeFormat="HH:mm"
              dateFormat="yyyy/MM/dd HH:mm"
              timeIntervals={15}
              showTimeSelect
            />
          </div>
          <div className="hidden md:block" style={{ color: fontColor3 }}>
            〜
          </div>
          <div className={`datePicker ${isMobile ? "" : "datePickerRight"}`}>
            <div className={styles.inputLabel}>
              {t("end_time")}
            </div>
            <DatePicker
              selected={endTime}
              onChange={(d: any) => {
                if (d) {
                  onUpdateEndTime(d);
                }
              }}
              locale={ja}
              timeFormat="HH:mm"
              dateFormat="yyyy/MM/dd HH:mm"
              timeIntervals={15}
              showTimeSelect
            />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default AutofillModal;
