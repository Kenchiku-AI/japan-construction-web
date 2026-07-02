import { FC, useState } from "react";
import { CompanyUser } from "@/types/companies";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { UserRole } from "@/types";
import { Trash, User } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api/ApiContext";

interface CompanyUsersListProps {
  users: CompanyUser[];
  onRemove: (userId: string) => void;
  onClickUser: (user: CompanyUser) => void;
}

const CompanyUsersList: FC<CompanyUsersListProps> = ({
  users,
  onRemove,
  onClickUser,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useApi();
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
          <div key={u.id}>
            <div className="md:mx-3 flex items-center justify-between gap-4">
              <div
                onClick={() => {
                  onClickUser?.(u);
                  router.push(`/users/${u.id}`);
                }}
                className="hover:opacity-50 cursor-pointer flex flex-1"
              >
                <div
                  style={{ height: 60 }}
                  className="flex items-center gap-3"
                >
                  <User />
                  <div className="flex flex-col">
                    <div>{`${u.last_name} ${u.first_name}`}</div>
                    <div
                      className={styles.subtitle}
                    >{`${u.email}${u.role === UserRole.Manager ? ` • ${t("manager")}` : ""}`}</div>
                  </div>
                </div>
              </div>
              {currentUser?.role !== "user" && (
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(u.id);
                  }}
                >
                  <Trash />
                </div>
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
