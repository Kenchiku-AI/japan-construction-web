import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input";
import Modal from "@/app/ui/Modal";
import {
  CreateReportTemplateRequest,
  ReportFieldType,
  ReportParentType,
  ReportUniqueBy,
} from "@/types";
import Select from "@/app/ui/Select";
import { Plus, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import styles from "./page.module.css";
import { TextArea } from "@/app/ui/TextArea";

interface CreateReportTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: CreateReportTemplateRequest) => void;
}

const CreateReportTemplateModal: FC<CreateReportTemplateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentType, setParentType] = useState<ReportParentType>(
    ReportParentType.Project,
  );
  const [uniqueBy, setUniqueBy] = useState<ReportUniqueBy>();
  const [fields, setFields] = useState<Field[]>([]);
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setFields([]);
    }, 500);
  };

  const isSubmitDisabled = useMemo(() => {
    if (!name) return true;

    return fields.some((f) => !f.name || !f.description);
  }, [name, fields]);

  const parentTypeOptions = [
    { label: t("project"), value: "projects" },
    { label: t("company"), value: "company" },
  ];

  const uniqueByOptions = [
    { label: t("none") },
    { label: t("day"), value: "day" },
    { label: t("week"), value: "week" },
    { label: t("month"), value: "month" },
    { label: t("year"), value: "year" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_report_template")}
      subtitle={t("create_report_template_description")}
    >
      <div className="mt-8 mb-16 flex flex-col gap-3">
        <Input value={name} placeholder={t("report_name")} onChange={setName} />
        <TextArea
          value={description}
          placeholder={t("description")}
          onChange={setDescription}
        />
        <div className="flex justify-between items-center">
          <div className="text-xl">{t("type")}</div>
          <Select
            options={parentTypeOptions}
            onChange={(pt) => {
              setParentType(pt as ReportParentType);
            }}
            style={{ width: "auto", paddingRight: 40 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xl">{t("unique_by")}</div>
          <Select
            options={uniqueByOptions}
            onChange={(ub) => {
              setUniqueBy(ub as ReportUniqueBy);
            }}
            style={{ width: "auto", paddingRight: 40 }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="text-xl self-end">{t("fields")}</div>
        <Button
          variant="tertiary"
          onClick={() => {
            const newField = {
              name: "",
              description: "",
              type: ReportFieldType.String,
            };
            setFields([...fields, newField]);
          }}
          label={t("add_field")}
          iconLeft={() => <Plus />}
          style={{ padding: 0, height: 28 }}
        />
      </div>
      <Divider style={{ margin: "8px 0" }} />
      {!fields.length && (
        <div className={styles.empty} style={{ height: 80 }}>
          {t("empty_reports_description")}
        </div>
      )}
      {fields.map((field, index) => (
        <FieldCell
          key={`create_report_template_field_${index}`}
          field={field}
          index={index}
          onChange={(f) => {
            setFields((prev) => {
              const newFields = [...prev];
              newFields[index] = f;
              return newFields;
            });
          }}
          onRemove={() => {
            setFields((prev) => {
              return prev.filter((_, i) => i !== index);
            });
          }}
        />
      ))}
      <Button
        disabled={isSubmitDisabled}
        label={t("create")}
        onClick={() => {
          onSubmit({
            name,
            description,
            fields,
            parent_type: parentType,
          });

          reset();
        }}
        style={{ marginTop: 8 }}
      />
    </Modal>
  );
};

type Field = {
  name: string;
  description: string;
  type: ReportFieldType;
};

interface FieldProps {
  field: Field;
  index: number;
  onChange: (field: Field) => void;
  onRemove: () => void;
}

const FieldCell: FC<FieldProps> = ({ field, index, onChange, onRemove }) => {
  const { t } = useTranslation();
  const { name, description, type } = field;

  const typeOptions = [
    {
      label: t("text"),
      value: ReportFieldType.String,
    },
    {
      label: t("number"),
      value: ReportFieldType.Number,
    },
    {
      label: t("boolean"),
      value: ReportFieldType.Boolean,
    },
    {
      label: t("date"),
      value: ReportFieldType.Date,
    },
  ];

  return (
    <div
      key={`create_report_template_field_${index}`}
      className="flex flex-col ml-4 my-4"
    >
      <div className="flex justify-between" style={{ alignItems: "flex-end" }}>
        <div className={styles.subtitle}>{`${t("field")} ${index + 1}`}</div>
        <div className="cursor-pointer" onClick={onRemove}>
          <Trash />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3 mb-6">
        <Input
          placeholder={t("name")}
          onChange={(n) => {
            onChange({ ...field, name: n });
          }}
        />
        <Input
          placeholder={t("description")}
          onChange={(d) => {
            onChange({ ...field, description: d });
          }}
        />
        <Select
          placeholder={t("type")}
          options={typeOptions}
          onChange={(t) => {
            onChange({ ...field, type: t as ReportFieldType });
          }}
        />
      </div>
      <Divider color={fontColor2} style={{ margin: 0 }} />
    </div>
  );
};

export default CreateReportTemplateModal;
