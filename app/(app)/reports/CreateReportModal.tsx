import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input";
import Modal from "@/app/ui/Modal";
import { CreateReportRequest, ReportTemplate } from "@/types";
import Select from "@/app/ui/Select";

interface CreateReportModalProps {
  templates: ReportTemplate[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: CreateReportRequest) => void;
}

const CreateReportModal: FC<CreateReportModalProps> = ({
  templates,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [templateId, setTemplateId] = useState("");
  const [name, setName] = useState("");
  const hasEditedName = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (templateId && (!name || !hasEditedName.current)) {
      const template = templates.find((t) => t.id === templateId);

      if (template) {
        const today = new Date();
        setName(`${template.name} (${today.toLocaleDateString("en-US")})`);
      }
    }
  }, [templateId, templates]);

  const resetFields = () => {
    setTimeout(() => {
      setName("");
      setTemplateId("");
      hasEditedName.current = false;
    }, 500);
  };

  const templateOptions = useMemo(
    () =>
      templates.map((t) => ({
        label: t.name,
        value: t.id,
      })),
    [templates],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetFields();
      }}
      title={t("create_report")}
      subtitle={t("create_report_description")}
    >
      <div className="my-8 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl">{t("type")}</div>
          <Select
            options={templateOptions}
            placeholder={t("template")}
            onChange={(id) => setTemplateId(id as string)}
            style={{ width: "auto", paddingRight: 40 }}
          />
        </div>
        <Input
          value={name}
          placeholder={t("name")}
          onChange={(n) => {
            setName(n);
            hasEditedName.current = true;
          }}
        />
      </div>
      <Button
        disabled={!templateId}
        label={t("create")}
        onClick={() => {
          onSubmit({
            name,
          });

          resetFields();
        }}
      />
    </Modal>
  );
};

export default CreateReportModal;
