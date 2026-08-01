import { FC, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import {
  CreateReportTemplateRequest,
  ReportTemplateFieldInfo,
} from "@/types";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportTemplateFields from "./ReportTemplateFields";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title={t("create_report_template")}
      subtitle={t("create_report_template_description")}
      width={640}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("report_name")} onChange={setName} />
        <TextArea
          value={description}
          placeholder={t("description")}
          onChange={setDescription}
        />
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
          });

          reset();
        }}
        style={{ marginTop: 24 }}
      />
    </Modal>
  );
};

export default CreateReportTemplateModal;
