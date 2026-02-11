"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import CreateCompanyModal from "./CreateCompanyModal";
import { useCompanies } from "./useCompanies";
import { Users, Plus } from "@/app/ui/Icons";
import { Company } from "@/types/companies";
import styles from "./page.module.css";
import { useApi } from "@/lib/api/ApiContext";
import { UserRole } from "@/types";
import { redirect, useRouter } from "next/navigation";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";

const CompaniesPage = () => {
  const { t } = useTranslation();
  const { companies, createCompany } = useCompanies();
  const router = useRouter();
  const { currentUser } = useApi();
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  if (currentUser && currentUser.role !== UserRole.Admin) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between">
        <Heading title={t("companies")} />
        <Button
          variant="secondary"
          label={t("create_company")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateCompany(true);
          }}
        />
      </div>
      <div className="flex flex-col mt-10">
        {companies?.length === 0 && <div></div>}
        {companies?.map((c) => (
          <CompanyListItem
            key={c.id}
            company={c}
            onView={() => {
              router.push(`/companies/${c.id}?name=${c.name}`);
            }}
          />
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
    </>
  );
};

interface CompanyListItemProps {
  company: Company;
  onView: () => void;
}

const CompanyListItem: FC<CompanyListItemProps> = ({ company, onView }) => {
  const { name, corporate_number } = company;
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center h-20 pr-8">
        <div className="flex gap-6">
          <Users />
          <div className="flex flex-col justify-center">
            <div className="text-xl">{name}</div>
            <div className={styles.corporateNumber}>{corporate_number}</div>
          </div>
        </div>
        <Button variant="tertiary" label={t("view")} onClick={onView} />
      </div>
      <Divider color={fontColor2} />
    </>
  );
};

export default CompaniesPage;
