"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSignup } from "./useSignup";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { emailRegex, invitationTokenKey } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/app/ui/Loader";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const { loading, signup } = useSignup();
  const router = useRouter();
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const token = searchParams.get(invitationTokenKey);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      sessionStorage.setItem(invitationTokenKey, token);
    }
  }, [token, router]);

  return !token ? null : (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading title={t("welcome")} subtitle={t("sign_up_description")} />
        <div className={styles.fields}>
          <Input
            placeholder={t("last_name")}
            onChange={(t) => {
              setLastName(t);
            }}
          />
          <Input
            placeholder={t("first_name")}
            onChange={(t) => {
              setFirstName(t);
            }}
          />
          <Input
            placeholder={t("email")}
            onChange={(t) => {
              setEmail(t);
              setIsEmailInvalid(false);
            }}
            error={isEmailInvalid}
          />
          <Input
            placeholder={t("password")}
            onChange={(t) => {
              setPassword(t);
              setIsPasswordInvalid(false);
            }}
            error={isPasswordInvalid}
            type="password"
          />
          <Input
            placeholder={t("confirm_password")}
            onChange={(t) => {
              setConfirmPassword(t);
              setIsPasswordInvalid(false);
            }}
            error={isPasswordInvalid}
            type="password"
          />
        </div>
        <Button
          label={t("sign_up")}
          onClick={async () => {
            if (!emailRegex.test(email)) {
              setIsEmailInvalid(true);
              return;
            }

            if (password !== confirmPassword) {
              setIsPasswordInvalid(true);
              return;
            }

            if (password.length < 8) {
              setIsPasswordInvalid(true);
              return;
            }

            await signup(firstName, lastName, email, password);
          }}
          disabled={
            !firstName || !lastName || !email || !password || !confirmPassword
          }
        />
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Signup;
