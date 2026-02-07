"use client";

import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const InvitationPage = () => {
  const { currentUser, setCurrentUser, acceptInvitation, getCurrentUser } =
    useApi();
  const router = useRouter();
  const { showModal, onClose } = useModal();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const accepted = useRef(false);

  useEffect(() => {}, [currentUser]);

  useEffect(() => {
    if (!currentUser || accepted.current) return;

    if (!!currentUser.company) {
      router.replace("/");
      showModal({
        title: t("invitation_existing_company_error"),
        subtitle: t("invitation_existing_company_error_description"),
      });
      return;
    }

    accepted.current = true;
    const token = searchParams.get("token");

    if (token) {
      (async () => {
        try {
          await acceptInvitation(token);

          const response = await getCurrentUser();
          setCurrentUser(response);
        } catch (err) {
          showModal({
            title: t("accept_invitation_failed"),
            subtitle: t("accept_invitation_failed_description"),
          });
        } finally {
          router.replace("/");
        }
      })();
    }
  }, [searchParams, currentUser]);

  return (
    <div className="flex gap-4 text-2xl opacity-50">
      <span className="loading loading-spinner loading-xl"></span>
      {t("accepting_invitation")}
    </div>
  );
};

export default InvitationPage;
