import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CompanyGuest } from "@/types";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { Trash, User } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";

interface GuestsListProps {
  guests: CompanyGuest[];
  isEmpty?: boolean;
  isDisabled?: boolean;
  onDelete: (guest: CompanyGuest) => void;
}

const GuestsList: FC<GuestsListProps> = ({
  guests,
  isEmpty,
  isDisabled,
  onDelete,
}) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_guests_description")}</div>;
  }

  return (
    <>
      {guests.map((guest, i) => {
        const canDelete = !isDisabled && (
          currentUser?.role === "manager" ||
          currentUser?.role === "admin" ||
          currentUser?.id === guest.id
        );

        return (
          <div key={guest.id}>
            {i > 0 && <Divider />}
            <div className="mx-4 flex items-center justify-between">
              <div style={{ height: 60 }} className="flex items-center gap-4">
                <User />
                <div className="flex flex-col">
                  <div>{`${guest.last_name} ${guest.first_name}`}</div>
                  <div className={styles.subtitle}>{guest.email}</div>
                </div>
              </div>
              {canDelete && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onDelete(guest);
                  }}
                >
                  <Trash />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GuestsList;
