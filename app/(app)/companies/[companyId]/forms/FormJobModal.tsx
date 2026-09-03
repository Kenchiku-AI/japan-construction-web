import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Download, Form, Trash } from "@/app/ui/Icons";
import { bgColor5, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { FormJob, FormJobFile, Project, ProjectStatus } from "@/types";

import Divider from "@/app/ui/Divider";
import { useApi } from "@/lib/api/ApiContext";

interface FormJobModalProps {
  formJob?: FormJob;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (fileId?: string) => void;
  onDelete: () => void;
}

const FormJobModal: FC<FormJobModalProps> = ({
  formJob,
  isOpen,
  onClose,
  onDownload,
  onDelete,
}) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState<FormJobFile[]>([]);
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState<string>("");
  const [missingData, setMissingData] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showDownloadAll, setShowDownloadAll] = useState(false);

  useEffect(() => {
    if (!formJob) {
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setProjectName("");
        setFiles([]);
        setStatus("");
        setSummary("");
        setMissingData([]);
        setRecommendations([]);
      }, 500);
      return;
    }

    setTitle(formJob.name);
    setDescription(formJob.description ?? "");
    setStatus(t(formJob.status));

    if (formJob.project_id) {
      const project = currentUser?.projects.find((p) => (
        p.id === formJob.project_id
      ));

      setProjectName(project?.name ?? "");
    } else {
      setProjectName("");
    }

    const completedFiles = formJob.files.filter((f) => !f.is_input);
    setShowDownloadAll(completedFiles.length > 1);
    setFiles(completedFiles.length ? completedFiles : formJob.files);

    if (formJob.result_json?.output) {
      const {
        summary,
        missing_data,
        recommendations
      } = formJob.result_json.output;

      setSummary(summary ?? "");
      setMissingData(missing_data ?? []);
      setRecommendations(recommendations ?? []);
    }
  }, [formJob, currentUser?.projects]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width={640}
    >
      <div className="mt-6 mb-8">
        {showDownloadAll && (
          <div className="flex justify-end pb-4 pr-2">
            <Button
              variant="tertiary"
              label={t("download_all")}
              iconLeft={() => <Download />}
              onClick={onDownload}
              style={{ height: "auto" }}
              textStyle={{
                fontWeight: "300",
              }}
              iconOnlyMobile
            />
          </div>
        )}
        <div
          className="border rounded-xl mb-6 border-2"
          style={{ borderColor: bgColor5 }}
        >
          {files.map((file, i) => (
            <>
              {i > 0 && <Divider style={{ margin: 0, backgroundColor: bgColor5 }} />}
              <div
                className="flex justify-between items-center px-5"
                style={{ minHeight: 60 }}
              >
                <div className="flex gap-3 items-center">
                  <Form />
                  {file.filename}
                </div>
                {!file.is_input && (
                  <div
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => {
                      onDownload(file.id);
                    }}
                  >
                    <Download />
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
        <Row label={t("description")} value={description} hideLabel />
        {!!projectName && (
          <Row label={t("project")} value={projectName} />
        )}
        <Row label={t("status")} value={status} />
        {!!summary && (
          <Row label={t("summary")} value={summary} />
        )}
        {!!missingData.length && (
          <Row label={t("missing_data")} value={missingData} />
        )}
        {!!recommendations.length && (
          <Row label={t("recommendations")} value={recommendations} />
        )}
      </div>
      <div className="mt-4">
        <Button
          variant="secondary"
          iconLeft={() => <Trash />}
          style={{ borderColor: errorColor1, height: 60, width: "100%" }}
          textStyle={{ color: errorColor1 }}
          label={t("delete")}
          onClick={onDelete}
        />
      </div>
    </Modal>
  );
};

interface RowProps {
  label: string;
  value: string | string[];
  hideLabel?: boolean;
}

const Row: FC<RowProps> = ({ label, value, hideLabel }) => (
  <>
    {!hideLabel && <Divider />}
    <div
      className="flex flex-1 items-center"
      style={{ minHeight: 50 }}
    >
      <div className="md:px-3 flex flex-1">
        <div>
          <div
            style={{
              color: fontColor2,
              fontSize: 12
            }}
          >
            {label}
          </div>
          <div
            style={{
              color: fontColor1,
              fontSize: 16
            }}
          >
            {Array.isArray(value) ? (
              value.length > 1 ? (
                <ul className="list-disc pl-5">
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                value[0]
              )
            ) : (
              value
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FormJobModal;