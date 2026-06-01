import { FC, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { CompanyGuest } from "@/types";
import Select from "@/app/ui/Select/Select";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";

interface AddGuestModalProps {
  knownGuests: CompanyGuest[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, firstName?: string, lastName?: string) => void;
}

const AddGuestModal: FC<AddGuestModalProps> = ({
  knownGuests,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const { t } = useTranslation();
  const showKnownGuests = knownGuests.length > 0;

  const reset = () => {
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelectedEmail("");
    }, 500);
  };

  const guestOptions = useMemo(
    () =>
      knownGuests.map((g) => ({
        label: `${g.last_name} ${g.first_name} (${g.email})`,
        value: g.email,
      })),
    [knownGuests],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("add_guest")}
      subtitle={t("add_guest_description")}
    >
      <div className="mt-6">
        {showKnownGuests && (
          <>
            <div className="mb-3">{t("select_existing_guest")}</div>
            <div className="mb-6">
              <Select
                options={guestOptions}
                value={selectedEmail}
                placeholder={t("select_guest")}
                onChange={(e) => setSelectedEmail(e as string)}
              />
            </div>
            <Button
              disabled={!selectedEmail}
              label={t("add_existing_guest")}
              onClick={() => {
                onSubmit(selectedEmail);
                reset();
              }}
            />
            <div className="flex gap-4 my-8 items-center">
              <Divider style={{ background: fontColor2 }} />
              <div className="flex flex-none" style={{ color: fontColor2 }}>
                {t("or")}
              </div>
              <Divider style={{ background: fontColor2 }} />
            </div>
            <div className="mb-3">{t("create_new_guest")}</div>
          </>
        )}
        <div className="flex flex-col gap-3 mb-6">
          <Input
            value={lastName}
            placeholder={t("last_name")}
            onChange={(l) => {
              setLastName(l);
            }}
          />
          <Input
            value={firstName}
            placeholder={t("first_name")}
            onChange={(f) => {
              setFirstName(f);
            }}
          />
          <Input
            value={email}
            placeholder={t("email")}
            onChange={(e) => {
              setEmail(e);
            }}
          />
        </div>
        <Button
          disabled={!firstName || !lastName || !email}
          label={t(showKnownGuests ? "add_new_guest" : "add_guest")}
          onClick={() => {
            onSubmit(email, firstName, lastName);
            reset();
          }}
        />
      </div>
    </Modal>
  );
};

export default AddGuestModal;
