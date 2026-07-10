"use client";

import { useTranslation } from "react-i18next";
import { Heading } from "@/app/ui/Heading/Heading";
import { Button } from "@/app/ui/Button/Button";
import LineLinkCodeButton from "@/app/ui/LineLinkCodeButton";
import styles from "./page.module.css";

interface CopyPageContentProps {
  code: string;
}

export default function CopyPageContent({
  code,
}: CopyPageContentProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col mt-20 sm:mt-0 sm:justify-center items-center h-screen">
      <div className={styles.content}>
        <Heading
          title={t("copy_code")}
          subtitle={t("copy_code_description")}
        />
        <div className="mt-16 mb-18 flex justify-center">
          <LineLinkCodeButton
            code={code}
            fontSize={30}
            shorten
          />
        </div>
        <Button
          label={t("open_line")}
          onClick={() => {
            window.location.href = "line://";
          }}
        />
      </div>
    </div>
  );
}