import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import {
  CreateReportRequest,
  ProjectStatus,
  ReportTemplate,
} from "@/types";
import Select from "@/app/ui/Select/Select";
import { useApi } from "@/lib/api/ApiContext";

interface CreateReportModalProps {
  templates: ReportTemplate[];
  forceProjectId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: CreateReportRequest) => void;
}

const CreateReportModal: FC<CreateReportModalProps> = ({
  templates,
  forceProjectId,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { currentUser } = useApi();
  const [templateId, setTemplateId] = useState("");
  const [projectId, setProjectId] = useState("none");
  const [name, setName] = useState("");
  const hasEditedName = useRef(false);
  const { t } = useTranslation();

  const toFullWidth = (num: number) =>
    String(num).replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 0xfee0));

  useEffect(() => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    if (!name || !hasEditedName.current) {
      const now = new Date();
      const date = `${toFullWidth(now.getMonth() + 1)}月${toFullWidth(now.getDate())}日`;

      setName(`${template.name} ${date}`);
      hasEditedName.current = false;
    }
  }, [templateId, templates]);

  const reset = () => {
    setTimeout(() => {
      setName("");
      setTemplateId("");
      setProjectId("");
      hasEditedName.current = false;
    }, 500);
  };

  const templateOptions = useMemo(
    () =>
      templates
        .map((t) => ({
          label: t.name,
          value: t.id,
        })),
    [templates],
  );

  const projectOptions = useMemo(() => {
    const projects = currentUser?.projects
      .filter((p) => p.status === ProjectStatus.Active)
      .map((p) => ({
        label: p.name,
        value: p.id,
      })) ?? [];

    return [
      { label: t("none"), value: "none" },
      ...projects
    ]
  }, [currentUser?.projects]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_report")}
      subtitle={t("create_report_description")}
    >
      <div className="my-6 flex flex-col gap-3">
        <Select
          options={templateOptions}
          value={templateId}
          placeholder={t("type")}
          onChange={(id) => setTemplateId(id as string)}
        />
        <Input
          value={name}
          placeholder={t("name")}
          onChange={(n) => {
            setName(n);
            hasEditedName.current = true;
          }}
        />
        {!forceProjectId && (
          <Select
            options={projectOptions}
            value={projectId}
            placeholder={t("project")}
            onChange={(id) => setProjectId(id as string)}
            style={{ paddingRight: 40 }}
          />
        )}
      </div>
      <Button
        disabled={!templateId || !name}
        label={t("create")}
        onClick={() => {
          if (currentUser?.company?.id) {
            const request: CreateReportRequest = {
              template_id: templateId,
              company_id: currentUser.company.id,
              name,
            };

            if (forceProjectId) {
              request.project_id = forceProjectId;
            } else if (!!projectId && projectId !== "none") {
              request.project_id = projectId;
            }

            onSubmit(request);
          }

          reset();
        }}
      />
    </Modal>
  );
};

export default CreateReportModal;
