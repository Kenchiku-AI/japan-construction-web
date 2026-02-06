import { FC } from "react";
import { CompanyUser } from "@/types/companies";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { UserRole } from "@/types";
import { User } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";

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
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-6">
          <User />
          <div className="flex flex-col">
            <div className="text-xl">{`${u.first_name} ${u.last_name}`}</div>
            <div className={styles.subtitle}>{u.email}</div>
          </div>
        </div>
        {u.role === UserRole.Manager && (
          <div className={`${styles.subtitle} mr-8`}>{t("manager")}</div>
        )}
      </div>
      <Divider color={fontColor2} />
    </div>
  ));
};

export default CompanyUsersList;
