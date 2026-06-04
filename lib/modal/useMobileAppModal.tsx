import { useCallback, useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { useTranslation } from "react-i18next";
import { androidUrl, iosUrl } from "../constants";
import { Button } from "@/app/ui/Button/Button";
import { Apple, Google } from "@/app/ui/Icons";

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
        <Apple />
      </div>
      <div>{t("or")}</div>
      <div
        className="cursor-pointer"
        onClick={() => (window.location.href = androidUrl)}
      >
        <Google />
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
