"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useLogin } from "./useLogin";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { Loader } from "@/app/ui/Loader";
import { invitationTokenKey } from "@/lib/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loading, login } = useLogin();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading title={t("login")} subtitle={t("login_description")} />
        <div className={styles.fields}>
          <Input
            placeholder={t("email")}
            onChange={(t) => {
              setEmail(t);
            }}
            type="email"
            disabled={loading}
          />
          <Input
            placeholder={t("password")}
            onChange={(t) => setPassword(t)}
            type="password"
            disabled={loading}
          />
        </div>
        <Button
          label={t("login")}
          onClick={() => {
            login(email, password);
          }}
          disabled={!email || !password || loading}
        />
        <div className={styles.buttons}>
          <Button
            variant="tertiary"
            label={t("forgot_password")}
            onClick={() => {
              router.push("/forgot-password");
            }}
          />
          {!!sessionStorage.getItem(invitationTokenKey) && (
            <Button
              variant="tertiary"
              label={t("sign_up")}
              onClick={() => {
                router.push("/signup");
              }}
            />
          )}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default LoginPage;
