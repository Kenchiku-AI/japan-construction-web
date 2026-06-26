"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateCompanyModal from "./CreateCompanyModal";
import { useCompanies } from "./useCompanies";
import { Users, Plus } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { Loader } from "@/app/ui/Loader";

const CompaniesPage = () => {
  const { t } = useTranslation();
  const { companies, createCompany } = useCompanies();
  const router = useRouter();
  const { currentUser } = useApi();
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role !== UserRole.Admin) {
      router.push("/");
    }
  }, [currentUser]);

  return !currentUser ? null : (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("companies")} />
        <Button
          variant="tertiary"
          style={{ height: "auto" }}
          label={t("create_company")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateCompany(true);
          }}
          iconOnlyMobile
        />
      </div>
      <Divider />
      <div className="flex flex-col">
        {companies?.length === 0 && (
          <div className={styles.empty}>{t("empty_companies_description")}</div>
        )}
        {companies?.map((c) => (
          <div key={c.id}>
            <div
              className="hover:opacity-50 cursor-pointer mx-4"
              onClick={() => {
                setShowLoader(true);
                router.push(`/companies/${c.id}?name=${c.name}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div style={{ height: 60 }} className="flex items-center gap-6">
                  <Users />
                  <div>
                    <div>{c.name}</div>
                    <div className={styles.corporateNumber}>
                      {c.corporate_number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider color={fontColor2} />
          </div>
        ))}
      </div>
      <CreateCompanyModal
        isOpen={showCreateCompany}
        onClose={() => {
          setShowCreateCompany(false);
        }}
        onSubmit={(request) => {
          setShowCreateCompany(false);
          createCompany(request);
        }}
      />
      {showLoader && <Loader />}
    </>
  );
};

export default CompaniesPage;
