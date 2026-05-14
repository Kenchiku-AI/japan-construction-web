"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useModal } from "@/lib/modal/ModalContext";
import { User } from "@/types";

export const useUser = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const { currentUser, setCurrentUser, ...api } = useApi();
  const router = useRouter();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const getUser = useCallback(
    async (userId: string) => {
      if (userId === currentUser?.id) {
        setUser({
          company_id: currentUser.company?.id,
          ...currentUser,
        });
        setLoading(false);
        return;
      }

      try {
        const response = await api.getUser(userId);
        setUser(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_user_error_description"),
        });

        router.replace("/");
      }

      setLoading(false);
    },
    [currentUser, userId],
  );

  const updateUser = useCallback(
    async (request: User) => {
      if (!currentUser) return;

      try {
        const response = await api.updateUser(userId, request);
        setUser(response);

        if (userId === currentUser.id) {
          setCurrentUser({
            ...currentUser,
            ...response,
          });
        }

        showModal({
          title: t("success"),
          subtitle: t("user_updated"),
        });
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_user_error_description"),
        });
      }
    },
    [userId, currentUser],
  );

  return {
    loading,
    user,
    updateUser,
  };
};
