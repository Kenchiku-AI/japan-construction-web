"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "./useForgotPassword";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { Loader } from "@/app/ui/Loader";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { loading, forgotPassword } = useForgotPassword();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col mt-20 sm:mt-0 sm:justify-center items-center px-5 h-screen">
      <div className={styles.content}>
        <Heading
          title={t("forgot_password")}
          subtitle={t("forgot_password_description")}
        />
        <div className={styles.fields}>
          <Input
            placeholder={t("email")}
            value={email}
            onChange={(t) => {
              setEmail(t);
            }}
            type="email"
            disabled={loading}
          />
        </div>
        <Button
          label={t("send_email")}
          onClick={async () => {
            await forgotPassword(email);
            setEmail("");
          }}
          disabled={!email || loading}
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

export default ForgotPasswordPage;
