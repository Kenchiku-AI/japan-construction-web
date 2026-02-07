import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { Datepicker } from "@/app/ui/Datepicker";

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: Date) => void;
}

const CreateReportModal: FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { t } = useTranslation();

  const resetFields = () => {
    setTimeout(() => {
      setDate(new Date());
    }, 500);
  };

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
      <div className="my-8 flex flex-col gap-3">
        <Datepicker date={date} onSelect={(d) => setDate(d)} />
      </div>
      <Button
        disabled={!date}
        label={t("create")}
        onClick={() => {
          if (!date) return;
          onSubmit(date);
        }}
      />
    </Modal>
  );
};

export default CreateReportModal;
