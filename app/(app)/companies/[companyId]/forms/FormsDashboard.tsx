"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import FormsList from "./FormsList";
import { redirect } from "next/navigation";
import { cardClass } from "@/lib/constants";
import { useForms } from "./useForms";
import CreateFormJobModal from "./CreateFormJobModal";

interface FormsDashboardProps {
  companyId: string;
}

const FormsDashboard: FC<FormsDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { loading, formJobs, createFormJob } = useForms(companyId);
  const [isCreateFormModalShown, setIsCreateFormModalShown] = useState(false);

  if (currentUser?.role === UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("forms")} />
        <Button
          variant="tertiary"
          style={{ height: "auto" }}
          label={t("upload_form")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setIsCreateFormModalShown(true);
          }}
          iconOnlyMobile
        />
      </div>
      {!!formJobs && (
        <div className={cardClass}>
          <FormsList
            forms={formJobs ?? []}
            isEmpty={!loading && formJobs?.length === 0}
          />
        </div>
      )}
      <CreateFormJobModal
        isOpen={isCreateFormModalShown}
        onClose={() => {
          setIsCreateFormModalShown(false);
        }}
        onSubmit={(file, name, description) => {
          createFormJob(file, name, description);
          setIsCreateFormModalShown(false);
        }}
      />
    </>
  );
};

export default FormsDashboard;
