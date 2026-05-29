import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { ProjectStatus, ReportParentType, ReportTemplate } from "@/types";
import Select from "@/app/ui/Select/Select";
import { useApi } from "@/lib/api/ApiContext";

interface DownloadExcelModalProps {
  templates: ReportTemplate[];
  disableProject?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (templateId: string, projectId?: string) => void;
}

const DownloadExcelModal: FC<DownloadExcelModalProps> = ({
  templates,
  disableProject,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { currentUser } = useApi();
  const [templateId, setTemplateId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [showProject, setShowProject] = useState(false);
  const [name, setName] = useState("");
  const hasEditedName = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (disableProject) return;

    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    const isProjectType = template.parent_type === ReportParentType.Project;
    setShowProject(isProjectType);

    if (!isProjectType) {
      setProjectId("");
    }
  }, [templateId, templates, disableProject]);

  const reset = () => {
    setTimeout(() => {
      setName("");
      setTemplateId("");
      setProjectId("");
      setShowProject(false);
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

  const projectOptions = useMemo(() => {
    const options =
      currentUser?.projects
        .filter((p) => p.status === ProjectStatus.Active)
        .map((p) => ({
          label: p.name,
          value: p.id,
        })) ?? [];

    return [
      {
        label: t("none"),
        value: "",
      },
      ...options,
    ];
  }, [currentUser?.projects]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("download_excel")}
      subtitle={t("download_excel_description")}
    >
      <div className="my-4 flex flex-col gap-3">
        <Select
          options={templateOptions}
          value={templateId}
          placeholder={t("type")}
          onChange={(id) => setTemplateId(id as string)}
        />
        <div
          style={{
            height: showProject ? 72 : 0,
            opacity: showProject ? 1 : 0,
            pointerEvents: showProject ? undefined : "none",
            transition: "height 0.1s ease-in-out, opacity 0.1s ease-in-out",
          }}
        >
          <Select
            options={projectOptions}
            value={projectId}
            placeholder={t("project")}
            onChange={(id) => setProjectId(id as string)}
            style={{ paddingRight: 40 }}
          />
        </div>
      </div>
      <Button
        disabled={!templateId}
        label={t("download")}
        onClick={() => {
          onSubmit(templateId, disableProject ? undefined : projectId);
          reset();
        }}
      />
    </Modal>
  );
};

export default DownloadExcelModal;
