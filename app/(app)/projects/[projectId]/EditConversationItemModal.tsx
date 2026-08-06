import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { ConversationItemStatus, ConversationItem, UpdateConversationItemRequest, User, Assignee } from "@/types";
import Divider from "@/app/ui/Divider";
import { Check, Close, Edit, Trash } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { errorColor1 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { useDate } from "@/public/date/useDate";
import Select from "@/app/ui/Select/Select";

interface EditConversationItemModalProps {
  isOpen: boolean;
  title: string;
  conversationItem?: ConversationItem;
  assignees: Assignee[];
  onClose: () => void;
  onSubmit: (request: UpdateConversationItemRequest) => void;
  onDelete: (conversationItem: ConversationItem) => void;
}

const EditConversationItemModal: FC<EditConversationItemModalProps> = ({
  isOpen,
  title,
  conversationItem,
  assignees,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [name, setName] = useState(conversationItem?.name ?? "");
  const [showEditName, setShowEditName] = useState(false);
  const [description, setDescription] = useState(conversationItem?.description ?? "");
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [lineMessage, setLineMessage] = useState(conversationItem?.source_message_text ?? "");
  const [lineMessageTimestamp, setLineMessageTimestamp] = useState(conversationItem?.line_timestamp ?? "");
  const [status, setStatus] = useState<ConversationItemStatus>(conversationItem?.status ?? ConversationItemStatus.New);
  const [assigneeId, setAssigneeId] = useState(conversationItem?.assignee?.id ?? "");
  const { t } = useTranslation();
  const { formatDateAndTime } = useDate();

  const closeAndReset = () => {
    onClose();

    setTimeout(() => {
      setName("");
      setDescription("");
      setStatus(ConversationItemStatus.New);
      setLineMessage("");
      setLineMessageTimestamp("");
      setAssigneeId("");
    }, 500);
  };

  useEffect(() => {
    if (isOpen && conversationItem) {
      setName(conversationItem.name);
      setDescription(conversationItem.description);
      setStatus(conversationItem.status);
      setLineMessage(conversationItem.source_message_text ?? "");
      setLineMessageTimestamp(conversationItem.line_timestamp ?? "");
      setAssigneeId(conversationItem.assignee?.id ?? "");
    }
  }, [isOpen]);

  const statusOptions = useMemo(() => {
    const values = Object.values(ConversationItemStatus);

    return values.map((v) => ({
      label: t(v),
      value: v
    }));
  }, [t]);

  const assigneeOptions = useMemo(() => {
    return [
      { label: t("none"), value: "none" },
      ...(assignees ?? []).map((a) => ({
        label: `${a.last_name} ${a.first_name}`,
        value: a.id
      }))
    ];
  }, [assignees]);

  const unchanged = useMemo(() => {
    return name === conversationItem?.name &&
      description === conversationItem?.description &&
      status === conversationItem?.status;
  }, [
    name,
    conversationItem?.name,
    description,
    conversationItem?.description,
    status,
    conversationItem?.status
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={title}
      width={640}
    >
      <Divider />
      {showEditName ? (
        <div className="flex flex-row gap-2">
          <Input value={name} placeholder={t("name")} onChange={setName} />
          <div
            className="hover:opacity-50 cursor-pointer"
            onClick={() => {
              setShowEditName(false);
              setName(conversationItem?.name ?? "");
            }}>
            <Close color={errorColor1} size={32} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <div>
            <div className={styles.subtitle}>{t("name")}</div>
            <div>{name}</div>
          </div>
          <div
            className="hover:opacity-50 cursor-pointer"
            onClick={() => {
              setShowEditName(true);
            }}>
            <Edit />
          </div>
        </div>
      )}
      <Divider />
      {showEditDescription ? (
        <div className="flex flex-row gap-2">
          <TextArea value={description} placeholder={t("description")} onChange={setDescription} />
          <div
            className="hover:opacity-50 cursor-pointer"
            onClick={() => {
              setShowEditDescription(false);
              setDescription(conversationItem?.description ?? "");
            }}>
            <Close color={errorColor1} size={32} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <div>
            <div className={styles.subtitle}>{t("description")}</div>
            <div>{description}</div>
          </div>
          <div
            className="hover:opacity-50 cursor-pointer"
            onClick={() => {
              setShowEditDescription(true);
            }}>
            <Edit />
          </div>
        </div>
      )}
      {lineMessage && (
        <>
          <Divider />
          <div className="flex flex-row justify-between">
            <div className={styles.subtitle}>
              {`${t("original_line_message")}`}
            </div>
            {lineMessageTimestamp && (
              <div className={styles.subtitle}>
                {formatDateAndTime(lineMessageTimestamp)}
              </div>
            )}
          </div>
          <div className="pt-1">
            「{lineMessage}」
          </div>
        </>
      )
      }
      <Divider />
      <Select
        options={statusOptions}
        value={status}
        placeholder={t("status")}
        onChange={(s) => setStatus(s as any)}
      />
      <Select
        options={assigneeOptions}
        value={assigneeId}
        placeholder={t("assignee")}
        onChange={(s) => setAssigneeId(s as any)}
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          disabled={!conversationItem || !name || !description || !status || unchanged}
          iconLeft={() => <Check color="white" />}
          label={t("update")}
          onClick={() => {
            const request: UpdateConversationItemRequest = {
              name,
              description,
              status
            };

            if (assigneeId === "none") {
              request.assignee_id = null;
            }

            onSubmit(request);

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
            if (conversationItem) {
              onDelete(conversationItem);
            }

            closeAndReset();
          }}
        />
      </div>
    </Modal >
  );
};

export default EditConversationItemModal;
