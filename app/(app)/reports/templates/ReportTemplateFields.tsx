import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Select from "@/app/ui/Select/Select";
import { Plus, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import styles from "./page.module.css";
import { TextArea } from "@/app/ui/TextArea/TextArea";

interface ReportTemplateFieldsProps {
  fields: ReportTemplateFieldInfo[];
  onChange: (fields: ReportTemplateFieldInfo[]) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const ReportTemplateFields: FC<ReportTemplateFieldsProps> = ({
  fields,
  onChange,
  fullWidth,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl self-end">{t("fields")}</div>
        {!disabled && (
          <Button
            variant="tertiary"
            onClick={() => {
              const newField = {
                id: crypto.randomUUID(),
                name: "",
                description: "",
              };
              onChange([...fields, newField]);
            }}
            label={t("add_field")}
            iconLeft={() => <Plus />}
            style={{ height: 28 }}
          />
        )}
      </div>
      <Divider style={{ margin: "8px 0 16px" }} />
      {!fields.length && (
        <div className={styles.empty} style={{ height: 80 }}>
          {t("empty_report_template_fields_description")}
        </div>
      )}
      <div
        className={`${fullWidth ? "flex flex-col" : "grid grid-cols-1 lg:grid-cols-2"} gap-4`}
      >
        {fields.map((field, index) => (
          <ReportTemplateFieldCell
            key={field.id}
            field={field}
            index={index}
            onChange={(f) => {
              const newFields = [...fields];
              newFields[index] = f;
              onChange(newFields);
            }}
            onRemove={() => {
              const newFields = fields.filter((_, i) => i !== index);
              onChange(newFields);
            }}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
};

export type ReportTemplateFieldInfo = {
  id: string;
  name: string;
  description: string;
};

interface ReportTemplateFieldCellProps {
  field: ReportTemplateFieldInfo;
  index: number;
  onChange: (field: ReportTemplateFieldInfo) => void;
  onRemove: () => void;
  disabled?: boolean;
}

const ReportTemplateFieldCell: FC<ReportTemplateFieldCellProps> = ({
  field,
  index,
  onChange,
  onRemove,
  disabled,
}) => {
  const { t } = useTranslation();
  const { name, description } = field;

  return (
    <div
      key={`create_report_template_field_${index}`}
      className="flex flex-col"
    >
      <div className="px-4">
        <div
          className="flex justify-between"
          style={{ alignItems: "flex-end" }}
        >
          <div className={styles.subtitle}>{`${t("field")} ${index + 1}`}</div>
          {!disabled && (
            <div className="cursor-pointer" onClick={onRemove}>
              <Trash />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3 mb-6">
          <Input
            defaultValue={name}
            placeholder={t("name")}
            onChange={(n) => {
              onChange({ ...field, name: n });
            }}
            disabled={disabled}
          />
          <TextArea
            defaultValue={description}
            placeholder={t("description")}
            onChange={(d) => {
              onChange({ ...field, description: d });
            }}
            disabled={disabled}
          />
        </div>
      </div>
      <Divider color={fontColor2} style={{ margin: 0 }} />
    </div>
  );
};

export default ReportTemplateFields;
