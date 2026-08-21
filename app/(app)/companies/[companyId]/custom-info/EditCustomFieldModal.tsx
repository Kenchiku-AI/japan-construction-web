import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { CustomFieldDefinitionListItem } from "@/types";

interface EditCustomFieldModalProps {
  isOpen: boolean;
  field?: CustomFieldDefinitionListItem;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

const EditCustomFieldModal: FC<EditCustomFieldModalProps> = ({
  isOpen,
  field,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!field) {
      reset();
      return;
    }

    setName(field?.name ?? "");
    setDescription(field?.description ?? "");
  }, [field]);

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
      title={t("edit_custom_field")}
      subtitle={t("custom_field_description")}
      width={640}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("name")} onChange={setName} />
        <TextArea
          value={description}
          placeholder={t("description")}
          onChange={setDescription}
        />
      </div>
      <Button
        disabled={!name || !description}
        label={t("update")}
        onClick={() => {
          reset();
          onSubmit(name, description);
        }}
      />
    </Modal>
  );
};

export default EditCustomFieldModal;
