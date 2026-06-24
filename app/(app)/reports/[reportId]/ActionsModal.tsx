import { FC } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import Divider from "@/app/ui/Divider";
import { Download, Edit, Lock, Trash, Unlock } from "@/app/ui/Icons";
import { buttonColor, errorColor1, fontColor2 } from "@/lib/constants";
import { ReportStatus } from "@/types";

interface ActionsModalProps {
  currentStatus?: ReportStatus;
  isOpen: boolean;
  onClose: () => void;
  onEditName: () => void;
  onUpdateStatus: () => void;
  onDelete: () => void;
  onDownloadExcel: () => void;
  onDownloadPDF: () => void;
}

const ActionsModal: FC<ActionsModalProps> = ({
  currentStatus,
  isOpen,
  onClose,
  onEditName,
  onUpdateStatus,
  onDelete,
  onDownloadExcel,
  onDownloadPDF,
}) => {
  const isReportOpen = currentStatus === ReportStatus.Open;
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("actions")} >
      <Divider />
      {isReportOpen && (
        <>
          <div
            className="flex px-4 py-2 items-center gap-3 hover:opacity-50 cursor-pointer"
            onClick={() => {
              onClose();
              onEditName();
            }}
          >
            <Edit />
            <div style={{ color: buttonColor }}>{t("edit_report_name")}</div>
          </div>
          <Divider style={{ background: fontColor2 }} />
        </>
      )}
      <div
        className="flex px-4 py-2 items-center gap-3 hover:opacity-50 cursor-pointer"
        onClick={() => {
          onClose();
          onUpdateStatus();
        }}
      >
        {isReportOpen ? <Lock color={buttonColor} /> : <Unlock color={buttonColor} />}
        <div style={{ color: buttonColor }}>{t(isReportOpen ? "close_report" : "open_report")}</div>
      </div>
      <Divider style={{ background: fontColor2 }} />
      <div
        className="flex px-4 py-2 items-center gap-3 hover:opacity-50 cursor-pointer"
        onClick={() => {
          onClose();
          onDownloadExcel();
        }}
      >
        <Download color={buttonColor} />
        <div style={{ color: buttonColor }}>{t("download_excel")}</div>
      </div>
      <Divider style={{ background: fontColor2 }} />
      <div
        className="flex px-4 py-2 items-center gap-3 hover:opacity-50 cursor-pointer"
        onClick={() => {
          onClose();
          onDownloadPDF();
        }}
      >
        <Download color={buttonColor} />
        <div style={{ color: buttonColor }}>{t("download_pdf")}</div>
      </div>
      <Divider style={{ background: fontColor2 }} />
      <div
        className="flex px-4 py-2 items-center gap-3 hover:opacity-50 cursor-pointer"
        onClick={() => {
          onClose();
          onDelete();
        }}
      >
        <Trash />
        <div style={{ color: errorColor1 }}>{t("delete_report")}</div>
      </div>
    </Modal >
  );
};

export default ActionsModal;
