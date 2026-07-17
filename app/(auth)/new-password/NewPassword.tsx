"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import { useNewPassword } from "./useNewPassword";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { Loader } from "@/app/ui/Loader";
import { useModal } from "@/lib/modal/ModalContext";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, createPassword } = useNewPassword();
  const { t } = useTranslation();
  const router = useRouter();
  const { showModal } = useModal();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const newUser = searchParams.get("newUser");

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return !token ? null : (
    <div className="flex flex-col pt-20 sm:mt-0 sm:justify-center items-center h-screen">
      <div className={styles.content}>
        <Heading
          title={t("set_password")}
        />
        <ul className="list-disc pl-5 mx-4 my-1 space-y-1 text-sm">
          <li>{t("password_requirement_1")}</li>
          <li>{t("password_requirement_2")}</li>
          <li>{t("password_requirement_3")}</li>
          <li>{t("password_requirement_4")}</li>
        </ul>
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
          label={t("set_password")}
          onClick={async () => {
            if (password !== confirmPassword) {
              showModal({
                title: t("error"),
                subtitle: t("passwords_do_not_match"),
              });
              return;
            }

            if (password.length < 10 || password.length > 64) {
              showModal({
                title: t("error"),
                subtitle: t("invalid_password_error_description"),
              });
              return;
            }

            createPassword(password, token, !!newUser);
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

export default NewPassword;
