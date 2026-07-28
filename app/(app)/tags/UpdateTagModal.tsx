import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { ImageTag } from "@/types";

interface UpdateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag?: ImageTag;
  onSubmit: (name?: string, description?: string) => void;
}

const UpdateTagModal: FC<UpdateTagModalProps> = ({
  isOpen,
  onClose,
  tag,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!tag) return;

    setName(tag.name);
    setDescription(tag.description);
  }, [tag]);

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
      title={t("update_tag")}
      subtitle={t("update_tag_description")}
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

export default UpdateTagModal;
