import { FC } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import CompanySearch from "../CompanySearch";

interface ShareReportTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (companyId: string) => void;
}

const ShareReportTemplateModal: FC<ShareReportTemplateModalProps> = ({
  isOpen,
  onClose,
  onShare,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      title={t("share_report_template")}
      subtitle={t("share_report_template_description")}
    >
      <CompanySearch
        onSelect={(companyId) => {
          onShare(companyId);
        }}
      />
    </Modal>
  );
};

export default ShareReportTemplateModal;
