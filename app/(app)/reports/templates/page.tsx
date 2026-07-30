"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateReportTemplateModal from "./CreateReportTemplateModal";
import { useReportTemplates } from "./useReportTemplates";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import ReportTemplatesList from "./ReportTemplatesList";
import { redirect } from "next/navigation";
import Divider from "@/app/ui/Divider";
import { Loader } from "@/app/ui/Loader";
import { cardClass } from "@/lib/constants";

const ReportTemplatesPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { reportTemplates, getReportTemplates, createReportTemplate, loading } =
    useReportTemplates();
  const [showCreateReportTemplate, setShowCreateReportTemplate] =
    useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getReportTemplates();
  }, []);

  if (currentUser?.role === UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("report_templates")} />
        <Button
          variant="tertiary"
          style={{ height: "auto" }}
          label={t("create_template")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateReportTemplate(true);
          }}
          iconOnlyMobile
        />
      </div>
      {(!loading || !!reportTemplates?.length) && (
        <div className={cardClass}>
          <ReportTemplatesList
            templates={reportTemplates ?? []}
            isEmpty={!loading && reportTemplates?.length === 0}
            onClickTemplate={() => {
              setShowLoader(true);
            }}
          />
        </div>
      )}
      <CreateReportTemplateModal
        isOpen={showCreateReportTemplate}
        onClose={() => {
          setShowCreateReportTemplate(false);
        }}
        onSubmit={(request) => {
          setShowCreateReportTemplate(false);
          createReportTemplate(request);
        }}
      />
      {showLoader && <Loader />}
    </>
  );
};

export default ReportTemplatesPage;
