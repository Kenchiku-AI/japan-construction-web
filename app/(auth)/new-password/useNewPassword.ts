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
    async (new_password: string, token: string, newUser: boolean) => {
      setLoading(true);

      try {
        await api.resetPassword({
          new_password,
          token,
        });

        router.replace("/login");

        if (newUser) {
          // new user will always be guest
          // showMobileAppModal();
        } else {
          showModal({
            title: t("password_reset"),
            subtitle: t("password_reset_description"),
          });
        }
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
