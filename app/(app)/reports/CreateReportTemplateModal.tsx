import { FC, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import {
  CreateReportTemplateRequest,
  ReportParentType,
  ReportUniqueBy,
} from "@/types";
import Select from "@/app/ui/Select/Select";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportTemplateFields, {
  ReportTemplateFieldInfo,
} from "./ReportTemplateFields";

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
  const [fields, setFields] = useState<ReportTemplateFieldInfo[]>([]);
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
      <ReportTemplateFields fields={fields} onChange={(f) => setFields(f)} />
      <Button
        disabled={isSubmitDisabled}
        label={t("create")}
        onClick={() => {
          onSubmit({
            name,
            description,
            fields,
            parent_type: parentType,
            unique_by: uniqueBy,
          });

          reset();
        }}
        style={{ marginTop: 8 }}
      />
    </Modal>
  );
};

export default CreateReportTemplateModal;
