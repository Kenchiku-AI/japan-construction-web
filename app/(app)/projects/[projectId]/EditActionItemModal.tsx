import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { UpdateActionItemRequest, ActionItem, ActionItemStatus } from "@/types";
import Select from "@/app/ui/Select/Select";
import Divider from "@/app/ui/Divider";
import { Close, Edit } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { errorColor1 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { useDate } from "@/public/date/useDate";

interface EditActionItemModalProps {
  isOpen: boolean;
  actionItem?: ActionItem;
  onClose: () => void;
  onSubmit: (request: UpdateActionItemRequest) => void;
}

const EditActionItemModal: FC<EditActionItemModalProps> = ({
  isOpen,
  actionItem,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(actionItem?.name ?? "");
  const [showEditName, setShowEditName] = useState(false);
  const [description, setDescription] = useState(actionItem?.description ?? "");
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [status, setStatus] = useState<ActionItemStatus>(actionItem?.status ?? ActionItemStatus.New);
  const { t } = useTranslation();
  const { formatDateAndTime } = useDate();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setStatus(ActionItemStatus.New);
    }, 500);
  };

  useEffect(() => {
    if (isOpen && actionItem) {
      setName(actionItem.name);
      setDescription(actionItem.description);
      setStatus(actionItem.status);
    }
  }, [isOpen]);

  const statusOptions = useMemo(() => {
    const values = Object.values(ActionItemStatus);

    return values.map((v) => ({
      label: t(v),
      value: v
    }));
  }, [t]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("action_item")}
    >
      <Divider />
      {showEditName ? (
        <div className="flex flex-row">
          <Input value={name} placeholder={t("name")} onChange={setName} />
          <div
            className="hover:opacity-50 cursor-pointer"
            onClick={() => {
              setShowEditName(false);
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
      {actionItem?.source_message_text && (
        <div>
          <div className={styles.subtitle}>
            {`${t("line_message")}${actionItem.line_timestamp ? ` (${t('sent_at')}: ${formatDateAndTime(actionItem.line_timestamp)})` : ''}`}
          </div>
          <div>{actionItem.source_message_text}</div>
        </div>
      )}
      <Divider />
      <Select
        options={statusOptions}
        placeholder={t("status")}
        onChange={(s) => setStatus(s as any)}
      />
      <Button
        disabled={!name || !description || !status}
        label={t("create")}
        onClick={() => {
          onSubmit({
            name,
            description,
            status
          });

          reset();
        }}
      />
    </Modal>
  );
};

export default EditActionItemModal;
