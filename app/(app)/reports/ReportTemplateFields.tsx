import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import { ReportFieldType } from "@/types";
import Select from "@/app/ui/Select";
import { Plus, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import styles from "./page.module.css";

interface ReportTemplateFieldsProps {
  fields: ReportTemplateFieldInfo[];
  onChange: (fields: ReportTemplateFieldInfo[]) => void;
}

const ReportTemplateFields: FC<ReportTemplateFieldsProps> = ({
  fields,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
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
            onChange([...fields, newField]);
          }}
          label={t("add_field")}
          iconLeft={() => <Plus />}
          style={{ height: 28 }}
        />
      </div>
      <Divider style={{ margin: "8px 0" }} />
      {!fields.length && (
        <div className={styles.empty} style={{ height: 80 }}>
          {t("empty_report_template_fields_description")}
        </div>
      )}
      {fields.map((field, index) => (
        <ReportTemplateFieldCell
          key={`create_report_template_field_${index}`}
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
        />
      ))}
    </>
  );
};

export type ReportTemplateFieldInfo = {
  name: string;
  description: string;
  type: ReportFieldType;
};

interface ReportTemplateFieldCellProps {
  field: ReportTemplateFieldInfo;
  index: number;
  onChange: (field: ReportTemplateFieldInfo) => void;
  onRemove: () => void;
}

const ReportTemplateFieldCell: FC<ReportTemplateFieldCellProps> = ({
  field,
  index,
  onChange,
  onRemove,
}) => {
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
          defaultValue={name}
          placeholder={t("name")}
          onChange={(n) => {
            onChange({ ...field, name: n });
          }}
        />
        <Input
          defaultValue={description}
          placeholder={t("description")}
          onChange={(d) => {
            onChange({ ...field, description: d });
          }}
        />
        <Select
          defaultValue={type}
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

export default ReportTemplateFields;
