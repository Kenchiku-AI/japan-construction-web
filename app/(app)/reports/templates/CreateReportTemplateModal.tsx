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
import { useReportTemplate } from "./[reportTemplateId]/useReportTemplate";
import { useReportTemplates } from "./useReportTemplates";

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
  const { parentTypeOptions, uniqueByOptions } = useReportTemplates();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setUniqueBy(undefined);
      setParentType(ReportParentType.Project);
      setFields([]);
    }, 500);
  };

  const isSubmitDisabled = useMemo(() => {
    if (!name) return true;

    return fields.some((f) => !f.name || !f.description);
  }, [name, fields]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title={t("create_report_template")}
      subtitle={t("create_report_template_description")}
    >
      <div className="my-8 flex flex-col gap-3">
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
            value={parentType}
            onChange={(pt) => {
              setParentType(pt as ReportParentType);
            }}
            style={{ width: "auto", paddingRight: 40 }}
            hideLabel
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xl">{t("unique_by")}</div>
          <Select
            options={uniqueByOptions}
            value={uniqueBy}
            onChange={(ub) => {
              setUniqueBy(ub as ReportUniqueBy);
            }}
            style={{ width: "auto", paddingRight: 40 }}
            hideLabel
          />
        </div>
      </div>
      <ReportTemplateFields
        fields={fields}
        onChange={(f) => setFields(f)}
        fullWidth
      />
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
        style={{ marginTop: 24 }}
      />
    </Modal>
  );
};

export default CreateReportTemplateModal;
