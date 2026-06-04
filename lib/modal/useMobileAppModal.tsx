import { useCallback, useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { useTranslation } from "react-i18next";
import { androidUrl, fontColor2, iosUrl } from "../constants";
import { Button } from "@/app/ui/Button/Button";
import { Apple, Google } from "@/app/ui/Icons";

export const useMobileAppModal = () => {
  const { showModal } = useModal();
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    const ua = navigator.userAgent;

    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      setPlatform("ios");
    } else if (isAndroid) {
      setPlatform("android");
    }
  }, []);

  const showMobileAppModal = useCallback(() => {
    const isDesktop = platform === "desktop";

    showModal({
      title: "switch_to_mobile_app",
      subtitle: `switch_to_mobile_description${isDesktop ? "_desktop" : ""}`,
      children: isDesktop ? (
        <DesktopContent />
      ) : (
        <MobileContent platform={platform} />
      ),
    });
  }, [platform]);

  return {
    showMobileAppModal,
  };
};

const DesktopContent = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-10 mb-6 gap-3">
      <div
        className="cursor-pointer"
        onClick={() => (window.location.href = iosUrl)}
      >
        <Apple />
      </div>
      <div style={{ color: fontColor2, fontSize: 12, height: 20 }}>
        {t("or")}
      </div>
      <div
        className="cursor-pointer"
        onClick={() => (window.location.href = androidUrl)}
      >
        <Google />
      </div>
    </div>
  );
};

const MobileContent = ({ platform }: { platform: string }) => {
  const { t } = useTranslation();

  return (
    <Button
      label={t("go_to_app")}
      onClick={() => {
        const start = Date.now();

        window.location.href = "kenchikuai://";

        setTimeout(() => {
          if (Date.now() - start < 2000) {
            const url = platform === "ios" ? iosUrl : androidUrl;
            window.location.href = url;
          }
        }, 1500);
      }}
    />
  );
};
