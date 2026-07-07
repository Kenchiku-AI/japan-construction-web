"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useCompany } from "../companies/[companyId]/useCompany";
import { cardClass } from "@/lib/constants";
import { Circle, CircleCheck, Edit } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { Button } from "@/app/ui/Button/Button";

interface LineDashboardProps {
  companyId: string;
}

const LineDashboard: FC<LineDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const { company } = useCompany(companyId);

  return (
    <div className={cardClass}>
      {!company?.line_channel_secret_last4 ? (
        <div>
          <Circle />
          <div>{t("add_channel_secret")}</div>
        </div>
      ) : (
        <div>
          <CircleCheck />
          <div>
            {`${t("channel_secret_added")}: ••••${company.line_channel_secret_last4}`}
          </div>
          <Button
            variant="tertiary"
            iconLeft={() => <Edit />}
            onClick={() => {

            }}
          />
        </div>
      )}
      <Divider />
    </div>
  );
}

export default LineDashboard;
