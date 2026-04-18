import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const router = useRouter();

  const resetPassword = useCallback(
    async (new_password: string, token: string) => {
      setLoading(true);

      try {
        await api.resetPassword({
          new_password,
          token,
        });

        router.replace("/");

        showModal({
          title: t("password_reset"),
          subtitle: t("password_reset_description"),
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
            subtitle: t("reset_password_error_description"),
          });
        }
      }

      setLoading(false);
    },
    [api, router],
  );

  return {
    loading,
    resetPassword,
  };
};
