import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
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
    async (new_passord: string, token: string) => {
      setLoading(true);

      try {
        await api.resetPassword({
          new_passord,
          token,
        });

        router.replace("/");

        showModal({
          title: t("password_reset"),
          subtitle: t("password_reset_description"),
        });
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("reset_password_error_description"),
        });
        console.log("err", err);
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
