import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { UpdateActionItemRequest, ActionItem, ActionItemStatus } from "@/types";
import Select from "@/app/ui/Select/Select";

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
  const [description, setDescription] = useState(actionItem?.description ?? "");
  const [status, setStatus] = useState<ActionItemStatus>(actionItem?.status ?? ActionItemStatus.New);
  const { t } = useTranslation();

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
      title={t("edit_work_item")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("name")} onChange={setName} />
        <Input value={description} placeholder={t("description")} onChange={setDescription} />
        <Select
          options={statusOptions}
          placeholder={t("status")}
          onChange={(s) => setStatus(s as any)}
        />
      </div>
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
