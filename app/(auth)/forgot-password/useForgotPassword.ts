import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();

  const forgotPassword = useCallback(
    async (email: string) => {
      setLoading(true);

      try {
        await api.forgotPassword({
          email,
        });

        showModal({
          title: t("email_sent"),
          subtitle: t("email_sent_description"),
        });
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("forgot_password_error_description"),
        });
        console.log("err", err);
      }

      setLoading(false);
    },
    [api],
  );

  return {
    loading,
    forgotPassword,
  };
};
