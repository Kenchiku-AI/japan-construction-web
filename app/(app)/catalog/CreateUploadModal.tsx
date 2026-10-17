import { FC, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Close, Form } from "@/app/ui/Icons";
import { bgColor5, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";

interface CreateUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

const CreateUploadModal: FC<CreateUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const reset = () => {
    setTimeout(() => {
      removeFile();
    }, 500);
  };

  const closeAndReset = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={t("upload")}
    // width={640}
    >
      <div className="my-8 flex flex-col gap-4">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        {!file ? (
          <div
            style={{
              height: 60,
              borderColor: bgColor5
            }}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer hover:opacity-50 flex w-full items-center rounded-lg border-2 border-dashed px-5 gap-3"
          >
            <Form color={fontColor1} />

            <div style={{ color: fontColor2 }}>
              {t("choose_file")}
            </div>
          </div>
        ) : (
          <div
            className="flex items-center justify-between rounded-lg border-2 px-5"
            style={{
              height: 60,
              borderColor: bgColor5
            }}
          >
            <div
              className="cursor-pointer hover:opacity-50 flex gap-3 items-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Form color={fontColor1} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {file.name}
                </p>
                <p className="text-xs text-base-content/60">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={removeFile}
            >
              <Close color={errorColor1} />
            </div>
          </div>
        )}
      </div>
      <Button
        disabled={!file}
        label={t("upload")}
        onClick={() => {
          if (!file) return;

          onSubmit(file);
          closeAndReset();
        }}
      />
    </Modal>
  );
};

export default CreateUploadModal;