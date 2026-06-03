"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api/ApiContext";
import {
  existingUserInvitationTokenKey,
  invitationTokenKey,
} from "@/lib/constants";
import { Loader } from "@/app/ui/Loader";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";

interface AcceptInvitationPageProps {
  searchParams: Promise<{ [invitationTokenKey]?: string }>;
}

const AcceptInvitationPage: FC<AcceptInvitationPageProps> = async ({
  searchParams,
}) => {
  const params = await searchParams;
  const token = params[invitationTokenKey];
  const router = useRouter();
  const { acceptInvitation, setCurrentUser } = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    sessionStorage.setItem(existingUserInvitationTokenKey, token);

    (async () => {
      try {
        const response = await acceptInvitation({ token });

        if (!response?.success) {
          throw new Error();
        } else {
          router.replace("/");
        }
      } catch (error) {
        const message = parseError(error);

        if (message) {
          showModal({
            title: t("error"),
            subtitle: message,
          });
        }
      }
    })();
  }, [token, router]);

  const parseError = (error: any) => {
    const status = (error as AxiosError).status;

    if (status === 410) {
      sessionStorage.removeItem(existingUserInvitationTokenKey);
      return t("expired_invitation");
    }

    if (status === 409) {
      sessionStorage.removeItem(existingUserInvitationTokenKey);
      return t("existing_company_invitation");
    }

    if (status === 404) {
      sessionStorage.removeItem(existingUserInvitationTokenKey);
      return t("invalid_invitation");
    }

    if (status === 403) return t("wrong_user_invitation");

    if (status === 401) {
      setCurrentUser(undefined);
      router.replace("/login");
      return null;
    }

    return t("invitation_error_description");
  };

  return <Loader />;
};

export default AcceptInvitationPage;
