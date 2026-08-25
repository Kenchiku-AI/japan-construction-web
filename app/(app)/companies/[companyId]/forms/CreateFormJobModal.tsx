import { FC, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { Form, Trash } from "@/app/ui/Icons";
import { bgColor5, fontColor1 } from "@/lib/constants";

interface CreateFormJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File, name: string, description: string) => void;
}

const CreateFormJobModal: FC<CreateFormJobModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setFile(null);
      setName("");
      setDescription("");
    }, 500);
  };

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("upload_form")}
      subtitle={t("upload_form_description")}
      width={640}
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
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer hover:opacity-50 flex min-h-36 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-base-300 bg-base-100 px-6 py-8 text-center"
          >
            <Form color={fontColor1} />

            <span className="text-sm font-medium">
              {t("choose_file")}
            </span>

            <span className="mt-1 text-xs text-base-content/60">
              {t("choose_file_description")}
            </span>
          </div>
        ) : (
          <div
            className="flex items-center justify-between rounded-lg border px-4 py-3"
            style={{ borderColor: bgColor5 }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <Form />

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
              <Trash />
            </div>
          </div>
        )}

        <Input
          value={name}
          placeholder={t("name")}
          onChange={setName}
        />

        <TextArea
          value={description}
          placeholder={t("description")}
          onChange={setDescription}
        />
      </div>

      <Button
        disabled={!file || !name || !description}
        label={t("upload")}
        onClick={() => {
          if (!file) {
            return;
          }

          reset();
          onSubmit(file, name, description);
        }}
      />
    </Modal>
  );
};

export default CreateFormJobModal;