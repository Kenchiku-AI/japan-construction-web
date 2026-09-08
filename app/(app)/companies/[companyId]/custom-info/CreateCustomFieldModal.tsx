import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Select from "@/app/ui/Select/Select";
import { CustomObjectDefinition } from "@/types";
import styles from "./page.module.css";
import { fontColor2 } from "@/lib/constants";

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
    relationshipTarget?: string,
    isSourceOwner?: boolean,
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
  const [isSourceOwner, setIsSourceOwner] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!ownerType) return;

    setTitle(`create_custom_${ownerType}_field`);
  }, [ownerType]);

  const showRelationshipConfig = useMemo(() => {
    return fieldType === "relationship";
  }, [fieldType]);

  const showIsSourceOwner = useMemo(() => {
    if (fieldType !== "relationship") return false;

    if (["project", "user"].includes(relationshipTarget)) {
      return false;
    }

    return relationshipType === "many";
  }, [fieldType, relationshipType, relationshipTarget]);

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
      setIsSourceOwner(false);
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
          className="flex flex-col gap-3"
          style={{
            paddingTop: showRelationshipConfig ? 12 : 0,
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
        <div
          style={{
            paddingTop: showIsSourceOwner ? 20 : 0,
            height: showIsSourceOwner ? "auto" : 0,
            opacity: showIsSourceOwner ? 1 : 0,
            pointerEvents: showIsSourceOwner ? undefined : "none",
            transition: "height 0.1s ease-in-out, opacity 0.1s ease-in-out",
          }}
        >
          <div className="flex flex-row items-center">
            <div className="px-4">
              <input
                type="checkbox"
                className="checkbox checkbox-neutral"
                checked={isSourceOwner}
                onChange={(e) => setIsSourceOwner(e.target.checked)}
              />
            </div>
            <div>
              <div>{t("is_source_owner")}</div>
              <div style={{ color: fontColor2, fontSize: 14 }}>
                {t("is_source_owner_description")}
              </div>
            </div>
          </div>
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
            relationshipTarget,
            isSourceOwner
          );
        }}
      />
    </Modal>
  );
};

export default CreateCustomFieldModal;
