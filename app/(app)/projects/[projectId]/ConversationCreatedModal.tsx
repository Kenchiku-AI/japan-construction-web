import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import LineLinkCodeButton from "@/app/ui/LineLinkCodeButton";
import Divider from "@/app/ui/Divider";
import QRCode from "react-qr-code";
import { fontColor3 } from "@/lib/constants";

interface ConversationCreatedModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationCreatedModal: FC<ConversationCreatedModalProps> = ({
  code,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("conversation_created")}
      subtitle={t("conversation_created_description")}
    >
      <div className="py-12 md:py-8 flex flex-col items-center">
        <LineLinkCodeButton code={code} />
        <div className="hidden md:block">
          <div className="py-8" style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${process.env.NEXT_PUBLIC_SITE_URL}copy?code=${code}`}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="px-12" style={{ color: fontColor3, textAlign: "center" }}>
            {t("scan_to_copy")}
          </div>
        </div>
      </div>
      <Button
        label={t("ok")}
        onClick={onClose}
      />
    </Modal>
  );
};

export default ConversationCreatedModal;
