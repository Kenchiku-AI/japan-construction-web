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
import { useModal } from "@/lib/modal/ModalContext";
import { Loader } from "@/app/ui/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loading, login, error } = useLogin();
  const { showModal, onClose } = useModal();
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get(invitationTokenKey);

    if (token) {
      showModal({
        title: t("invitation_accepted"),
        subtitle: t("invitation_accepted_description"),
        children: (
          <div className="mt-10">
            <Button label={t("ok")} onClick={onClose} />
          </div>
        ),
      });
      sessionStorage.setItem(invitationTokenKey, token);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading title={t("login")} subtitle={t("login_description")} />
        {error && <div className={styles.error}>{error}</div>}
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
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default LoginPage;
