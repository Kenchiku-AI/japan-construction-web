import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CompanyGuest } from "@/types";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";
import { Trash, User } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";

interface GuestsListProps {
  guests: CompanyGuest[];
  projectId: string;
  isEmpty?: boolean;
  onDelete: (linkId: string) => void;
}

const GuestsList: FC<GuestsListProps> = ({
  guests,
  projectId,
  isEmpty,
  onDelete,
}) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_guests_description")}</div>;
  }

  return (
    <>
      {guests.map((guest) => {
        const canDelete =
          currentUser?.role === "manager" ||
          currentUser?.role === "admin" ||
          currentUser?.id === guest.id;

        return (
          <div key={guest.id}>
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
                    const project = guest.projects.find((p) => projectId);
                    if (!project) return;

                    onDelete(project.guest_link_id);
                  }}
                >
                  <Trash />
                </div>
              )}
            </div>

            <Divider color={fontColor2} />
          </div>
        );
      })}
    </>
  );
};

export default GuestsList;
