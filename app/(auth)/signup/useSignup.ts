import { useApi } from "@/lib/api/ApiContext";
import { invitationTokenKey } from "@/lib/constants";
import { useModal } from "@/lib/modal/ModalContext";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();

  const signup = useCallback(
    async (
      first_name: string,
      last_name: string,
      email: string,
      password: string,
    ) => {
      setLoading(true);

      const invitation_token = sessionStorage.getItem(invitationTokenKey);

      if (!invitation_token) {
        throw new Error();
      }

      try {
        const user = await api.signup({
          first_name,
          last_name,
          email,
          password,
          invitation_token,
        });
        api.setCurrentUser(user);
        sessionStorage.removeItem(invitationTokenKey);
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
    },
    [router],
  );

  return {
    loading,
    signup,
  };
};
