import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { UpdateActionItemRequest, ActionItem, ActionItemStatus } from "@/types";
import Select from "@/app/ui/Select/Select";
import Divider from "@/app/ui/Divider";
import { Check, Close, Edit, Trash } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { errorColor1, fontColor2 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { useDate } from "@/public/date/useDate";

interface EditActionItemModalProps {
  isOpen: boolean;
  actionItem?: ActionItem;
  onClose: () => void;
  onSubmit: (request: UpdateActionItemRequest) => void;
  onDelete: (actionItem: ActionItem) => void;
}

const EditActionItemModal: FC<EditActionItemModalProps> = ({
  isOpen,
  actionItem,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [name, setName] = useState(actionItem?.name ?? "");
  const [showEditName, setShowEditName] = useState(false);
  const [description, setDescription] = useState(actionItem?.description ?? "");
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [lineMessage, setLineMessage] = useState(actionItem?.source_message_text ?? "");
  const [lineMessageTimestamp, setLineMessageTimestamp] = useState(actionItem?.line_timestamp ?? "");
  const [status, setStatus] = useState<ActionItemStatus>(actionItem?.status ?? ActionItemStatus.New);
  const { t } = useTranslation();
  const { formatDateAndTime } = useDate();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setStatus(ActionItemStatus.New);
      setLineMessage("");
      setLineMessageTimestamp("");
    }, 500);
  };

  useEffect(() => {
    if (isOpen && actionItem) {
      setName(actionItem.name);
      setDescription(actionItem.description);
      setStatus(actionItem.status);
      setLineMessage(actionItem.source_message_text ?? "");
      setLineMessageTimestamp(actionItem.line_timestamp ?? "");
    }
  }, [isOpen]);

  const statusOptions = useMemo(() => {
    const values = Object.values(ActionItemStatus);

    return values.map((v) => ({
      label: t(v),
      value: v
    }));
  }, [t]);

  const unchanged = useMemo(() => {
    return name === actionItem?.name &&
      description === actionItem?.description &&
      status === actionItem?.status;
  }, [
    name,
    actionItem?.name,
    description,
    actionItem?.description,
    status,
    actionItem?.status
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("action_item")}
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
              setName(actionItem?.name ?? "");
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
              setDescription(actionItem?.description ?? "");
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
              {`${t("line_message")}`}
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
      <div className="mt-6 grid lg:grid-col-2 gap-2">
        <Button
          disabled={!name || !description || !status || unchanged}
          iconLeft={() => <Check color="white" />}
          label={t("update")}
          onClick={() => {
            onSubmit({
              name,
              description,
              status
            });

            reset();
          }}
        />
        <Button
          variant="secondary"
          iconLeft={() => <Trash />}
          style={{ borderColor: errorColor1, height: 60 }}
          textStyle={{ color: errorColor1 }}
          label={t("delete")}
          onClick={() => {
            if (actionItem) {
              onDelete(actionItem);
            }

            reset();
          }}
        />
      </div>
    </Modal >
  );
};

export default EditActionItemModal;
