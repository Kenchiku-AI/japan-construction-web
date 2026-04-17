import { useApi } from "@/lib/api/ApiContext";
import { invitationTokenKey } from "@/lib/constants";
import { useModal } from "@/lib/modal/ModalContext";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignup = () => {
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

        const invitationToken = sessionStorage.getItem(invitationTokenKey);
        if (invitationToken) {
          await api.acceptInvitation(invitationToken);

          const response = await api.getCurrentUser();
          api.setCurrentUser(response);
        }

        router.push("/");
      } catch (err) {
        setLoading(false);

        if ((err as AxiosError).status === 400) {
          showModal({
            title: t("error"),
            subtitle: t("email_registered"),
          });
        } else {
          showModal({
            title: t("error"),
            subtitle: t("sign_up_error"),
          });
        }
      }

      sessionStorage.removeItem(invitationTokenKey);
    },
    [router],
  );

  return {
    loading,
    signup,
  };
};
