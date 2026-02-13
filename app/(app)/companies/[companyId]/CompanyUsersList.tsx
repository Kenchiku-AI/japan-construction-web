import { FC, useState } from "react";
import { CompanyUser } from "@/types/companies";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { UserRole } from "@/types";
import { User } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface CompanyUsersListProps {
  users: CompanyUser[];
}

const CompanyUsersList: FC<CompanyUsersListProps> = ({ users }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  if (!users.length) {
    return <div className={styles.empty}>{t("empty_users_description")}</div>;
  }

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: showAll ? 2500 : 500,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {users.map((u) => (
          <div className="md:ml-10 ml-6" key={u.id}>
            <div className="flex items-center justify-between">
              <div style={{ height: 68 }} className="flex items-center gap-6">
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
        ))}
      </div>
      {users.length > 5 && (
        <Button
          variant="tertiary"
          style={{ marginLeft: 40 }}
          label={showAll ? t("show_less") : t("show_more")}
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      )}
    </>
  );
};

export default CompanyUsersList;
