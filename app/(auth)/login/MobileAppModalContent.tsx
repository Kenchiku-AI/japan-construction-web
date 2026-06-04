import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import {
  androidUrl,
  appUrl,
  errorColor1,
  existingUserInvitationTokenKey,
  iosUrl,
} from "@/lib/constants";

interface MobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAppModal: FC<MobileAppModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;

    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

    const isAndroid = /Android/i.test(ua);

    setIsMobile(isIOS || isAndroid);
  }, []);

  const descriptionKey = useMemo(() => {
    if (isMobile) return "switch_to_mobile_description";
    return "switch_to_mobile_description_desktop";
  }, [isMobile]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("switch_to_mobile_app")}
      subtitle={t(descriptionKey)}
    >
      {isMobile ? (
        <div>
          <div
            className="cursor-pointer"
            onClick={() => (window.location.href = iosUrl)}
          >
            <img src="/apple.svg" alt="apple" width={192.86} height={70.87} />
          </div>
          <div>{t("or")}</div>
          <div
            className="cursor-pointer"
            onClick={() => (window.location.href = androidUrl)}
          >
            <img src="/google.svg" alt="google" width={239.17} height={70.87} />
          </div>
        </div>
      ) : (
        <Button
          variant="secondary"
          style={{ height: 60, borderColor: errorColor1 }}
          textStyle={{ color: errorColor1 }}
          label={t("go_to_app")}
          onClick={() => {
            sessionStorage.removeItem(existingUserInvitationTokenKey);
            onClose();
          }}
        />
      )}
    </Modal>
  );
};

export default MobileAppModal;
