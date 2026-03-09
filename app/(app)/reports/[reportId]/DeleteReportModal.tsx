import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { Company } from "@/types";
import { useApi } from "@/lib/api/ApiContext";
import { Users } from "@/app/ui/Icons";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface DeleteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteReportModal: FC<DeleteReportModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      title={t("delete_report")}
      subtitle={t("delete_report_description")}
    >
      <div className="mt-8 grid lg:grid-col-2 gap-2">
        <Button label={t("delete_report")} onClick={onDelete} />
        <Button
          variant="secondary"
          style={{ height: 60, width: "100%" }}
          label={t("cancel")}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

export default DeleteReportModal;
