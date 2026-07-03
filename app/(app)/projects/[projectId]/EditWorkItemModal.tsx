import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { UpdateWorkItemRequest, WorkItem, WorkItemStatus } from "@/types";
import Select from "@/app/ui/Select/Select";

interface EditWorkItemModalProps {
  isOpen: boolean;
  workItem?: WorkItem;
  onClose: () => void;
  onSubmit: (request: UpdateWorkItemRequest) => void;
}

const EditWorkItemModal: FC<EditWorkItemModalProps> = ({
  isOpen,
  workItem,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(workItem?.name ?? "");
  const [description, setDescription] = useState(workItem?.description ?? "");
  const [status, setStatus] = useState<WorkItemStatus>(workItem?.status ?? WorkItemStatus.New);
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setStatus(WorkItemStatus.New);
    }, 500);
  };

  useEffect(() => {
    if (isOpen && workItem) {
      setName(workItem.name);
      setDescription(workItem.description);
      setStatus(workItem.status);
    }
  }, [isOpen]);

  const statusOptions = useMemo(() => {
    const values = Object.values(WorkItemStatus);

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

export default EditWorkItemModal;
