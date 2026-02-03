"use client";

import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";

const ProjectsPage = () => {
  const { t } = useTranslation();

  return <Heading title={t("sites")} />;
};

export default ProjectsPage;
