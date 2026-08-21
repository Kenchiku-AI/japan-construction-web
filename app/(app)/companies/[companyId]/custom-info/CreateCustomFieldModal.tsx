import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Select from "@/app/ui/Select/Select";
import { CustomObjectDefinition } from "@/types";

interface CreateCustomFieldModalProps {
  isOpen: boolean;
  ownerType?: string;
  customObjects?: CustomObjectDefinition[];
  onClose: () => void;
  onCreate: (
    name: string,
    description: string,
    fieldType: string,
    relationshipType?: string,
    relationshipTarget?: string
  ) => void;
}

const CreateCustomFieldModal: FC<CreateCustomFieldModalProps> = ({
  isOpen,
  ownerType,
  customObjects,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [relationshipType, setRelationshipType] = useState("one");
  const [relationshipTarget, setRelationshipTarget] = useState("project");
  const { t } = useTranslation();

  useEffect(() => {
    if (!ownerType) return;

    setTitle(`create_custom_${ownerType}_field`);
  }, [ownerType]);

  const showRelationshipConfig = useMemo(() => {
    return fieldType === "relationship";
  }, [fieldType]);

  const relationshipTargetOptions = useMemo(() => {
    const options = [
      { label: t("project"), value: "project" },
      { label: t("user"), value: "user" },
    ];

    if (!customObjects?.length) {
      return options;
    }

    return [
      ...options,
      ...customObjects.map((co) => {
        return {
          label: co.name,
          value: co.id
        }
      })
    ]
  }, [customObjects]);

  const reset = () => {
    setTimeout(() => {
      setTitle("");
      setName("");
      setDescription("");
      setFieldType("text");
      setRelationshipType("one");
      setRelationshipTarget("project");
      setTitle(`create_field`);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t(title)}
      subtitle={t("custom_field_description")}
      width={640}
    >
      <div className="my-8">
        <div className="flex flex-col gap-3">
          <Input value={name} placeholder={t("name")} onChange={setName} />
          <TextArea
            value={description}
            placeholder={t("description")}
            onChange={setDescription}
          />
          <Select
            value={fieldType}
            placeholder={t("type")}
            onChange={(t) => setFieldType(t as any)}
            options={[
              { label: t("text"), value: "text" },
              { label: t("checkbox"), value: "boolean" },
              { label: t("relationship"), value: "relationship" },
            ]}
          />
        </div>
        <div
          className="flex flex-col gap-3 pt-3"
          style={{
            height: showRelationshipConfig ? 144 : 0,
            opacity: showRelationshipConfig ? 1 : 0,
            pointerEvents: showRelationshipConfig ? undefined : "none",
            transition: "height 0.1s ease-in-out, opacity 0.1s ease-in-out",
          }}
        >
          <Select
            value={relationshipType}
            placeholder={t("relationship_type")}
            onChange={(t) => setRelationshipType(t as any)}
            options={[
              { label: t("has_one"), value: "one" },
              { label: t("has_many"), value: "many" },
            ]}
          />
          <Select
            value={relationshipTarget}
            placeholder={t("relationship_target")}
            onChange={(t) => setRelationshipTarget(t as any)}
            options={relationshipTargetOptions}
          />
        </div>

      </div>
      <Button
        disabled={!name || !description}
        label={t("create")}
        onClick={() => {
          reset();
          onCreate(
            name,
            description,
            fieldType,
            relationshipType,
            relationshipTarget
          );
        }}
      />
    </Modal>
  );
};

export default CreateCustomFieldModal;
