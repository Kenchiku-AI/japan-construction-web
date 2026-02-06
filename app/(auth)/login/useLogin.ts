"use client";

import { useCallback, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { invitationTokenKey } from "@/lib/constants";
import { CurrentUser } from "@/types";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();
  const { t } = useTranslation();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const user = await api.login({ email, password });
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

        if ((err as AxiosError).status === 401) {
          setError(t("invalid_email_password"));
        } else {
          setError(t("login_error"));
        }
      }

      sessionStorage.removeItem(invitationTokenKey);
    },
    [router],
  );

  return {
    loading,
    login,
    error,
  };
};
