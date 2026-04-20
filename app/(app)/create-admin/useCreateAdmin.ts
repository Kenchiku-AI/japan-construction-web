import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useCreateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const { showModal } = useModal();

  const createAdmin = useCallback(
    async (first_name: string, last_name: string, email: string) => {
      setLoading(true);

      try {
        await api.createAdmin({
          first_name,
          last_name,
          email,
        });

        showModal({
          title: "Success",
          subtitle: "The admin was created.",
        });
      } catch (err) {
        setLoading(false);

        if ((err as AxiosError).status === 400) {
          showModal({
            title: "Error",
            subtitle: "That email is already registered.",
          });
        } else {
          showModal({
            title: "Error",
            subtitle: "There was an error creating the admin",
          });
        }
      }
    },
    [api],
  );

  return {
    loading,
    createAdmin,
  };
};
