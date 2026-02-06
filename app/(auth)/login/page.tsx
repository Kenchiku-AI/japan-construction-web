"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogin } from "./useLogin";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { invitationTokenKey } from "@/lib/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvited, setIsInvited] = useState(false);
  const router = useRouter();
  const { loading, login } = useLogin();
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get(invitationTokenKey);

    if (token) {
      setIsInvited(true);
      sessionStorage.setItem(invitationTokenKey, token);
    }
  }, [searchParams]);

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
          />
          <Input
            placeholder={t("password")}
            onChange={(t) => setPassword(t)}
            type="password"
          />
        </div>
        <Button
          label={t("login")}
          onClick={() => {
            login(email, password);
          }}
          disabled={!email || !password}
        />
        <div className={styles.buttons}>
          <Button
            variant="tertiary"
            label={t("forgot_password")}
            onClick={() => {}}
          />
          <Button
            variant="tertiary"
            label={t("sign_up")}
            onClick={() => {
              router.push("/signup");
            }}
          />
        </div>
        {isInvited && (
          <div className="toast toast-start">
            <div role="alert" className="alert alert-warning alert-soft">
              {t("invitation_token_description")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
