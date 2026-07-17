import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
// import { useMobileAppModal } from "@/lib/modal/useMobileAppModal";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useNewPassword = () => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const router = useRouter();
  // const { showMobileAppModal } = useMobileAppModal();

  const createPassword = useCallback(
    async (new_password: string, token: string) => {
      setLoading(true);

      try {
        await api.resetPassword({
          new_password,
          token,
        });

        router.replace("/login");

        showModal({
          title: t("new_password_created"),
          subtitle: t("new_password_created_description"),
        });
      } catch (err) {
        if ((err as AxiosError).status === 400) {
          showModal({
            title: t("expired_link"),
            subtitle: t("expired_link_description"),
          });
        } else {
          showModal({
            title: t("error"),
            subtitle: t("error_description"),
          });
        }
      }

      setLoading(false);
    },
    [api, router],
  );

  return {
    loading,
    createPassword,
  };
};
