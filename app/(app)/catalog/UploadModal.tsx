import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Form, Trash } from "@/app/ui/Icons";
import { bgColor5, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { FormJob } from "@/types";
import Divider from "@/app/ui/Divider";

interface UploadModalProps {
  formJob?: FormJob;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const UploadModal: FC<UploadModalProps> = ({
  formJob,
  isOpen,
  onClose,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!formJob) {
      setTimeout(() => {
        setTitle("");
        setStatus("");
      }, 500);
      return;
    }

    setTitle(formJob.name);
    setStatus(t(formJob.status));

    if (formJob.result_json) {

    }
  }, [formJob]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    // width={640}
    >
      <div
        className="border rounded-xl mb-6 border-2"
        style={{ borderColor: bgColor5 }}
      >
        <div
          className="flex justify-between items-center px-5"
          style={{ minHeight: 60 }}
        >
          <div className="flex gap-3 items-center">
            <Form />
            {title}
          </div>
        </div>
      </div>
      <div className="mt-6 mb-8">
        <Row label={t("status")} value={status} />
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
  hideDivider?: boolean;
}

const Row: FC<RowProps> = ({ label, value, hideDivider }) => (
  <>
    {!hideDivider && <Divider />}
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

export default UploadModal;