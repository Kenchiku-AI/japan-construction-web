import { useApi } from "@/lib/api/ApiContext";
import { invitationTokenKey } from "@/lib/constants";
import { CurrentUser } from "@/types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();
  const { t } = useTranslation();

  const signup = useCallback(
    async (
      first_name: string,
      last_name: string,
      email: string,
      password: string,
    ) => {
      setLoading(true);

      try {
        const user = await api.signup({
          first_name,
          last_name,
          email,
          password,
        });
        api.setCurrentUser(user);

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
          setError(t("email_registered"));
        } else {
          setError(t("sign_up_error"));
        }
      }

      sessionStorage.removeItem(invitationTokenKey);
    },
    [router],
  );

  return {
    loading,
    signup,
    error,
  };
};
