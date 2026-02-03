"use client";

import { FC } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import NewCompanyModal from "./NewCompanyModal";
import { useCompanies } from "./useCompanies";
import { Plus } from "@/app/ui/Icons";
import { Company } from "@/types/companies";
import styles from "./companies.module.css";

const CompaniesPage = () => {
  const { t } = useTranslation();
  const { companies, createCompany } = useCompanies();

  return (
    <>
      <div className="flex justify-between">
        <Heading title={t("companies")} />
        <Button
          variant="secondary"
          label={t("create_company")}
          iconLeft={() => <Plus />}
          onClick={() => {
            // @ts-expect-error
            document.getElementById("create_company_modal").showModal();
          }}
        />
      </div>
      <div className="flex flex-col mt-10">
        {companies?.length === 0 && <div></div>}
        {companies?.map((c, i) => (
          <CompanyListItem
            key={c.id}
            company={c}
            onView={() => {}}
            showDivider={i !== 0}
          />
        ))}
      </div>
      <NewCompanyModal
        onSubmit={async (request) => {
          createCompany(request);
        }}
      />
    </>
  );
};

interface CompanyListItemProps {
  company: Company;
  onView: () => void;
  showDivider?: boolean;
}

const CompanyListItem: FC<CompanyListItemProps> = ({
  company,
  onView,
  showDivider,
}) => {
  const { name, corporate_number } = company;
  const { t } = useTranslation();

  return (
    <>
      {showDivider && <div className="divider"></div>}
      <div className="flex justify-between items-center h-">
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.corporateNumber}>{corporate_number}</div>
        </div>
        <Button variant="tertiary" label={t("view")} onClick={onView} />
      </div>
    </>
  );
};

export default CompaniesPage;
