"use client";

import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t } = useTranslation();

  return <Heading title={t("settings")} />;
};

export default SettingsPage;
