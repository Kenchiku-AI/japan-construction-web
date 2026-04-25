"use client";

import { useCallback, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { UserRole } from "@/types";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const user = await api.login({ email, password });
        api.setCurrentUser(user);
        const url = user.role === UserRole.Admin ? "/companies" : "/";
        router.push(url);
      } catch (err) {
        setLoading(false);

        if ((err as AxiosError).status === 401) {
          showModal({
            title: t("error"),
            subtitle: t("invalid_email_password"),
          });
        } else {
          showModal({
            title: t("error"),
            subtitle: t("login_error"),
          });
        }
      }
    },
    [router],
  );

  return {
    loading,
    login,
  };
};
