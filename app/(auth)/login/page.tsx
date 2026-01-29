"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "./useLogin";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            onClick={() => {
              // navigation.navigate("ForgotPasswordScreen");
            }}
          />
          <Button
            variant="tertiary"
            label={t("sign_up")}
            onClick={() => {
              // navigation.navigate("SignUpScreen");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
