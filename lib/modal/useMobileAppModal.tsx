import { useCallback, useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { useTranslation } from "react-i18next";
import { androidUrl, iosUrl } from "../constants";
import { Button } from "@/app/ui/Button/Button";

export const useMobileAppModal = () => {
  const { showModal } = useModal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;

    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

    const isAndroid = /Android/i.test(ua);

    setIsMobile(isIOS || isAndroid);
  }, []);

  const showMobileAppModal = useCallback(() => {
    showModal({
      title: "switch_to_mobile_app",
      subtitle: `switch_to_mobile_description${isMobile ? "" : "_desktop"}`,
      children: isMobile ? <MobileContent /> : <DesktopContent />,
    });
  }, [isMobile]);

  return {
    showMobileAppModal,
  };
};

const DesktopContent = () => {
  const { t } = useTranslation();

  return (
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
  );
};

const MobileContent = () => {
  const { t } = useTranslation();

  return (
    <Button
      label={t("go_to_app")}
      onClick={() => {
        window.location.href = "kenchikuai://";
      }}
    />
  );
};
