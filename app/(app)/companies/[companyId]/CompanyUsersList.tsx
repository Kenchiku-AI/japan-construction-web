import { FC } from "react";
import { CompanyUser } from "@/types/companies";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";

interface CompanyUsersListProps {
  users: CompanyUser[];
}

const CompanyUsersList: FC<CompanyUsersListProps> = ({ users }) => {
  const { t } = useTranslation();

  if (!users.length) {
    return <div className={styles.empty}>{t("empty_users_description")}</div>;
  }

  return users.map((u) => (
    <div className="md:ml-10 ml-6 mt-4" key={u.id}>
      <div className="text-xl">{`${u.first_name} ${u.last_name}`}</div>
      <div className={styles.subtitle}>{u.email}</div>
      <div className="divider m-0 mt-4" />
    </div>
  ));
};

export default CompanyUsersList;
