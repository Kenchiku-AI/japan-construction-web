"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApi } from "@/lib/api/ApiContext";
import {
  existingUserInvitationTokenKey,
  invitationTokenKey,
} from "@/lib/constants";
import { Loader } from "@/app/ui/Loader";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { UserRole } from "@/types";
// import { useMobileAppModal } from "@/lib/modal/useMobileAppModal";

const AcceptInvitation = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get(invitationTokenKey);
  const router = useRouter();
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();
  // const { showMobileAppModal } = useMobileAppModal();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    sessionStorage.setItem(existingUserInvitationTokenKey, token);

    (async () => {
      try {
        const response = await api.acceptInvitation({ token });

        if (!response?.success) {
          throw new Error();
        }

        sessionStorage.removeItem(existingUserInvitationTokenKey);
        const user = await api.getCurrentUser();

        // if (user?.role === UserRole.User) {
        //   showMobileAppModal();
        // }

        if (!user) {
          router.replace("/login");
          return;
        }

        api.setCurrentUser(user);
      } catch (error) {
        const message = parseError(error);

        if (message) {
          showModal({
            title: t("error"),
            subtitle: message,
          });
        }
      }

      router.replace("/");
    })();
  }, [token, router]);

  const parseError = (error: any) => {
    const status = (error as AxiosError).status;

    if (!status || status === 401) return null;
    if (status === 403) return t("wrong_user_invitation");

    sessionStorage.removeItem(existingUserInvitationTokenKey);

    if (status === 410) return t("expired_invitation");
    if (status === 409) return t("existing_company_invitation");
    if (status === 404) return t("invalid_invitation");

    return t("invitation_error_description");
  };

  return <Loader />;
};

export default AcceptInvitation;
