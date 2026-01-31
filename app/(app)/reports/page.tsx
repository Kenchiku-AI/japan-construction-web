"use client";

import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";

const ReportsPage = () => {
  const { t } = useTranslation();

  return <Heading title={t("reports")} />;
};

export default ReportsPage;
