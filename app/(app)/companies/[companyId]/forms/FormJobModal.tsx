import { FC, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Download, Form, Trash } from "@/app/ui/Icons";
import { errorColor1, fontColor2 } from "@/lib/constants";
import { FormJob, FormJobFile } from "@/types";
import Divider from "@/app/ui/Divider";

interface CreateFormJobModalProps {
  formJob: FormJob
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
  const [showDownloadAll, setShowDownloadAll] = useState(false);

  const files = useMemo(() => {
    const completedFiles = formJob.files.filter((f) => !f.is_input);
    setShowDownloadAll(completedFiles.length > 1);

    if (completedFiles.length) return completedFiles;

    return formJob.files;
  }, [formJob.files]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={formJob.name}
      width={640}
    >
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
      {files.map((file) => (
        <>
          <Divider />
          <div className="flex justify-between">
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
      <Divider />
      <Row label={t("status")} value={t(formJob.status)} />
      <Divider />
      <Button
        variant="secondary"
        iconLeft={() => <Trash />}
        style={{ borderColor: errorColor1, height: 60 }}
        textStyle={{ color: errorColor1 }}
        label={t("delete")}
        onClick={onDelete}
      />
    </Modal>
  );
};

interface RowProps {
  label: string;
  value: string;
}

const Row: FC<RowProps> = ({ label, value }) => (
  <div
    className="flex flex-1 items-center"
    style={{ minHeight: 60 }}
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
        <div style={{ color: fontColor2 }}>
          {value}
        </div>
      </div>
    </div>
  </div>
);

export default FormJobModal;