"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "./useResetPassword";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { Loader } from "@/app/ui/Loader";
import { useModal } from "@/lib/modal/ModalContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, resetPassword } = useResetPassword();
  const { t } = useTranslation();
  const router = useRouter();
  const { showModal } = useModal();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return !token ? null : (
    <div className="flex flex-col mt-20 sm:mt-0 sm:justify-center items-center h-screen">
      <div className={styles.content}>
        <Heading
          title={t("reset_password")}
          subtitle={t("reset_password_description")}
        />
        <div className={styles.fields}>
          <Input
            placeholder={t("new_password")}
            onChange={(t) => {
              setPassword(t);
            }}
            disabled={loading}
            type="password"
          />
          <Input
            placeholder={t("confirm_new_password")}
            onChange={(t) => {
              setConfirmPassword(t);
            }}
            disabled={loading}
            type="password"
          />
        </div>
        <Button
          label={t("reset_password")}
          onClick={async () => {
            if (password !== confirmPassword) {
              showModal({
                title: t("error"),
                subtitle: t("passwords_do_not_match"),
              });
              return;
            }

            resetPassword(password, token);
          }}
          disabled={!password || !confirmPassword || loading}
        />
        <div className={styles.buttons}>
          <Button
            variant="tertiary"
            label={t("login")}
            onClick={() => {
              router.push("/login");
            }}
          />
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default ResetPassword;
