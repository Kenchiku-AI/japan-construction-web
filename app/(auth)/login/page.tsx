"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useLogin } from "./useLogin";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import {
  existingUserInvitationTokenKey,
  invitationTokenKey,
} from "@/lib/constants";
import { Loader } from "@/app/ui/Loader";
import { Logo } from "@/app/ui/Icons";
import ExistingUserInvitationModal from "./ExistingUserInvitationModal";
import { useMobileAppModal } from "@/lib/modal/useMobileAppModal";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const router = useRouter();
  const { loading, login } = useLogin();
  const { t } = useTranslation();
  const { showMobileAppModal } = useMobileAppModal();

  useEffect(() => {
    const token = sessionStorage.getItem(invitationTokenKey);
    setInvitationToken(token);

    if (sessionStorage.getItem(existingUserInvitationTokenKey)) {
      setShowInvitationModal(true);
    }

    showMobileAppModal();
  }, []);

  return (
    <>
      <div className="flex flex-col sm:justify-center items-center px-5 h-screen">
        <div className={styles.content}>
          <div className="flex justify-center mt-14 sm:mt-0 mb-4">
            <Logo />
          </div>
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
            handleEnter
          />
          <div className={styles.buttons}>
            <Button
              variant="tertiary"
              label={t("forgot_password")}
              onClick={() => {
                router.push("/forgot-password");
              }}
            />
            {invitationToken && (
              <Button
                variant="tertiary"
                label={t("sign_up")}
                onClick={() => {
                  router.push(`/signup?invitationToken=${invitationToken}`);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <ExistingUserInvitationModal
        isOpen={showInvitationModal}
        onClose={() => {
          setShowInvitationModal(false);
        }}
      />
    </>
  );
};

export default LoginPage;
