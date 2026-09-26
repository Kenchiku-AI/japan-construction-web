"use client";

import { useCallback, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { UserRole } from "@/types";
import { createCompanyInvitationIdKey, existingUserInvitationTokenKey } from "@/lib/constants";
import posthog from "posthog-js";
import { posthogLogger } from "@/lib/posthogLogger";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      const token = sessionStorage.getItem(existingUserInvitationTokenKey);

      try {
        let user = await api.login({ email, password });

        if (token) {
          await api.acceptInvitation({ token });
          sessionStorage.removeItem(existingUserInvitationTokenKey);
          sessionStorage.removeItem(createCompanyInvitationIdKey);

          const userResponse = await api.getCurrentUser();

          if (!userResponse) {
            throw new Error();
          } else {
            user = userResponse;
          }
        }

        // if (api.validateCurrentUser(user)) {
        api.setCurrentUser(user);

        posthog.capture("user_logged_in", {
          invitation_accepted: Boolean(token),
        });

        const url = user.role === UserRole.Admin ? "/companies" : "/home";
        posthogLogger.info("user login completed", {
          invitation_accepted: Boolean(token),
          destination: url,
        });
        router.push(url);
        // }
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: parseError(err),
        });
      }

      setLoading(false);
    },
    [router],
  );

  const parseError = (error: any) => {
    const status = (error as AxiosError).status;

    if (status === 410) {
      sessionStorage.removeItem(existingUserInvitationTokenKey);
      return t("expired_invitation_login");
    }

    if (status === 409) {
      sessionStorage.removeItem(existingUserInvitationTokenKey);
      return t("existing_company_invitation_login");
    }

    if (status === 404) {
      sessionStorage.removeItem(existingUserInvitationTokenKey);
      return t("invalid_invitation_login");
    }

    if (status === 403) return t("wrong_user_invitation");
    if (status === 401) return t("invalid_email_password");

    return t("login_error");
  };

  return {
    loading,
    login,
  };
};
