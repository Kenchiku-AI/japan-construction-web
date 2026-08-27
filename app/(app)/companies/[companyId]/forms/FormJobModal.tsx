import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Download, Form, Trash } from "@/app/ui/Icons";
import { bgColor5, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { FormJob, FormJobFile } from "@/types";
import Divider from "@/app/ui/Divider";

interface CreateFormJobModalProps {
  formJob?: FormJob
  isOpen: boolean;
  onClose: () => void;
  onDownload: (files: FormJobFile[]) => void;
  onDelete: () => void;
}

const FormJobModal: FC<CreateFormJobModalProps> = ({
  formJob,
  isOpen,
  onClose,
  onDownload,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
        setFiles([]);
        setStatus("");
        setSummary("");
        setMissingData([]);
        setRecommendations([]);
      }, 500);
      return;
    }

    setTitle(formJob.name);
    setStatus(t(formJob.status));
    setDescription(formJob.description ?? "");

    const completedFiles = formJob.files.filter((f) => !f.is_input);
    setShowDownloadAll(completedFiles.length > 1);
    setFiles(completedFiles.length ? completedFiles : formJob.files);

    const {
      summary,
      missing_data,
      recommendations
    } = formJob.result_json.output;

    setSummary(summary ?? "");
    setMissingData(missing_data ?? []);
    setRecommendations(recommendations ?? []);
  }, [formJob]);

  console.log("missing data", missingData);
  console.log("recommendations", recommendations);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="mt-6 mb-8">
        {showDownloadAll && (
          <Button
            variant="tertiary"
            label={t("download_all")}
            iconLeft={() => <Download />}
            onClick={() => {
              onDownload(files);
            }}
            style={{ height: "auto" }}
            textStyle={{
              fontWeight: "300",
            }}
            iconOnlyMobile
          />
        )}
        <div
          className="border rounded-xl mb-6"
          style={{ borderColor: bgColor5 }}
        >
          {files.map((file, i) => (
            <>
              {i > 0 && <Divider />}
              <div
                className="flex justify-between items-center px-5"
                style={{ minHeight: 60 }}
              >
                <div className="flex gap-3">
                  <Form />
                  <div>
                    {file.filename}
                  </div>
                </div>
                {!file.is_input && (
                  <div
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => {
                      onDownload([file]);
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
          <div style={{ color: fontColor1 }}>
            {Array.isArray(value) ? (
              <ul className="list-disc pl-5">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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