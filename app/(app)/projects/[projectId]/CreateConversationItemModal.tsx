import { FC, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Modal from "@/app/ui/Modal";
import { Assignee } from "@/types";
import Select from "@/app/ui/Select/Select";

interface CreateConversationItemModalProps {
  isOpen: boolean;
  title: string;
  assignees: Assignee[];
  onClose: () => void;
  onCreate: (name: string, description: string, assigneeId?: string) => void;
}

const CreateConversationItemModal: FC<CreateConversationItemModalProps> = ({
  isOpen,
  title,
  assignees,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const { t } = useTranslation();

  const assigneeOptions = useMemo(() => {
    return [
      { label: t("none"), value: "none" },
      ...(assignees ?? []).map((a) => ({
        label: `${a.last_name} ${a.first_name}`,
        value: a.id
      }))
    ];
  }, [assignees]);

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={title}
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
        <Select
          options={assigneeOptions}
          value={assigneeId}
          placeholder={t("assignee")}
          onChange={(s) => setAssigneeId(s as any)}
        />
      </div>
      <Button
        disabled={!name || !description}
        label={t("create")}
        onClick={() => {
          const requestAssigneeId = !assigneeId || assigneeId === "none" ? undefined : assigneeId;
          onCreate(name, description, requestAssigneeId);
          reset();
        }}
      />
    </Modal>
  );
};

export default CreateConversationItemModal;
