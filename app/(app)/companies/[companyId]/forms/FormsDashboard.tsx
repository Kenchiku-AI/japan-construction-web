"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { FormJob, UserRole } from "@/types";
import FormsList from "./FormsList";
import { redirect } from "next/navigation";
import { cardClass } from "@/lib/constants";
import { useForms } from "./useForms";
import CreateFormJobModal from "./CreateFormJobModal";
import FormJobModal from "./FormJobModal";
import DeleteFormJobModal from "./DeleteFormJobModal";
import { Loader } from "@/app/ui/Loader";

interface FormsDashboardProps {
  companyId: string;
}

const FormsDashboard: FC<FormsDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { loading, formJobs, createFormJob, deleteFormJob } = useForms(companyId);
  const [isCreateFormModalShown, setIsCreateFormModalShown] = useState(false);
  const [showFormJob, setShowFormJob] = useState<FormJob>();
  const [jobToDelete, setJobToDelete] = useState<FormJob>();

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
            onClick={(formJob) => {
              setShowFormJob(formJob);
            }}
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
      <FormJobModal
        formJob={showFormJob}
        isOpen={!!showFormJob}
        onClose={() => {
          setShowFormJob(undefined);
        }}
        onDownload={(files) => {

        }}
        onDelete={() => {
          if (!showFormJob) return;

          setJobToDelete(showFormJob);
          setShowFormJob(undefined);
        }}
      />
      <DeleteFormJobModal
        isOpen={!!jobToDelete}
        onClose={() => {
          setJobToDelete(undefined);
        }}
        onDelete={() => {
          if (!jobToDelete) return;
          deleteFormJob(jobToDelete.id);
          setJobToDelete(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default FormsDashboard;
