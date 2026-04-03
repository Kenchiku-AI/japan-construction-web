import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { CreateReportRequest, ReportParentType, ReportTemplate } from "@/types";
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
  const [projectId, setProjectId] = useState("");
  const [requireProjectId, setRequireProjectId] = useState(false);
  const [name, setName] = useState("");
  const hasEditedName = useRef(false);
  const { t } = useTranslation();
  const showProjectSelect = requireProjectId && !forceProjectId;

  useEffect(() => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    if (!name || !hasEditedName.current) {
      const today = new Date();
      setName(`${template.name} (${today.toLocaleDateString("en-US")})`);
      hasEditedName.current = false;
    }

    const isProjectType = template.parent_type === ReportParentType.Project;
    setRequireProjectId(isProjectType);

    if (!isProjectType) {
      setProjectId("");
    }
  }, [templateId, templates]);

  const reset = () => {
    setTimeout(() => {
      setName("");
      setTemplateId("");
      setProjectId("");
      setRequireProjectId(false);
      hasEditedName.current = false;
    }, 500);
  };

  const templateOptions = useMemo(
    () =>
      templates
        .filter((t) =>
          !forceProjectId ? true : t.parent_type === ReportParentType.Project,
        )
        .map((t) => ({
          label: t.name,
          value: t.id,
        })),
    [templates],
  );

  const projectOptions = useMemo(
    () =>
      currentUser?.projects.map((p) => ({
        label: p.name,
        value: p.id,
      })) ?? [],
    [currentUser?.projects],
  );

  const parentId = useMemo(() => {
    if (forceProjectId) return forceProjectId;
    if (requireProjectId) return projectId;
    return currentUser?.company?.id;
  }, [forceProjectId, requireProjectId, projectId, currentUser?.company]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_report")}
      subtitle={t("create_report_description")}
      size="xl"
    >
      <div className="mt-8 flex flex-col">
        <div className="flex justify-between items-center">
          <div>{t("type")}</div>
          <Select
            options={templateOptions}
            value={templateId}
            placeholder={t("select_template")}
            hidePlaceholder
            onChange={(id) => setTemplateId(id as string)}
            style={{ width: "auto", paddingRight: 40 }}
            hideLabel
          />
        </div>
        <div
          className="flex items-end"
          style={{
            height: showProjectSelect ? 76 : 0,
            opacity: showProjectSelect ? 1 : 0,
            pointerEvents: showProjectSelect ? undefined : "none",
            transition: "height 0.1s ease-in-out, opacity 0.1s ease-in-out",
          }}
        >
          <div className="flex flex-1 justify-between items-center">
            <div>{t("project")}</div>
            <Select
              options={projectOptions}
              value={projectId}
              placeholder={t("select_project")}
              hidePlaceholder
              onChange={(id) => setProjectId(id as string)}
              style={{ width: "auto", paddingRight: 40 }}
              hideLabel
            />
          </div>
        </div>
      </div>
      <div className="mt-4 mb-8 flex flex-col gap-2">
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
        disabled={!templateId || !parentId || !name}
        label={t("create")}
        onClick={() => {
          onSubmit({
            template_id: templateId,
            parent_id: parentId!,
            name,
          });

          reset();
        }}
      />
    </Modal>
  );
};

export default CreateReportModal;
