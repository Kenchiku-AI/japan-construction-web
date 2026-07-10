"use client";

import { useTranslation } from "react-i18next";
import { Heading } from "@/app/ui/Heading/Heading";
import styles from "./page.module.css";
import LineLinkCodeButton from "@/app/ui/LineLinkCodeButton";
import { redirect, useSearchParams } from "next/navigation";

const CopyPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    redirect("/");
  }

  return (
    <div className="flex flex-col mt-20 sm:mt-0 sm:justify-center px-5 items-center h-screen">
      <div className={styles.content}>
        <Heading
          title={t("copy_code")}
          subtitle={t("copy_code_description")}
        />
        <LineLinkCodeButton code={code} shorten />
      </div>
    </div>
  );
};

export default CopyPage;
