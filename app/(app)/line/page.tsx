"use client";

import { FC } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import LineDashboard from "./LineDashboard";

const LinePage: FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();

  return (
    <>
      <Heading
        title={t("line_integration")}
      />
      {currentUser?.company?.id && (
        <LineDashboard
          companyId={currentUser?.company?.id}
        />
      )}
    </>
  );
}

export default LinePage;
