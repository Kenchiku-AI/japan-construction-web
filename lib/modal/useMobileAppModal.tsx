import { useCallback, useEffect, useRef, useState } from "react";
import { useModal } from "./ModalContext";
import { useTranslation } from "react-i18next";
import { androidUrl, fontColor2, iosUrl } from "../constants";
import { Button } from "@/app/ui/Button/Button";
import { Apple, Google } from "@/app/ui/Icons";

export const useMobileAppModal = () => {
  const { showModal } = useModal();
  const { t } = useTranslation();

  const showMobileAppModal = () => {
    let platform = "desktop";
    const ua = navigator.userAgent;

    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      platform = "ios";
    } else if (isAndroid) {
      platform = "android";
    }

    const isDesktop = platform === "desktop";

    showModal({
      title: t("switch_to_mobile_app"),
      subtitle: t(
        `switch_to_mobile_app_description${isDesktop ? "_desktop" : ""}`,
      ),
      children: isDesktop ? (
        <DesktopContent />
      ) : (
        <MobileContent platform={platform} />
      ),
    });
  };

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
  const appOpenedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpenedRef.current = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="mt-6">
      <Button
        label={t("use_app")}
        onClick={() => {
          appOpenedRef.current = false;

          window.location.href = "kenchikuai://";

          setTimeout(() => {
            if (!appOpenedRef.current) {
              const url = platform === "ios" ? iosUrl : androidUrl;
              window.location.href = url;
            }
          }, 1500);
        }}
      />
    </div>
  );
};
