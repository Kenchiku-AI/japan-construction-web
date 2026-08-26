import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FormJob } from "@/types";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { Form } from "@/app/ui/Icons";

interface FormsListProps {
  forms: FormJob[];
  isEmpty?: boolean;
  onClick: (form: FormJob) => void;
}

const FormsList: FC<FormsListProps> = ({
  forms,
  isEmpty,
  onClick,
}) => {
  const { t } = useTranslation();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_forms_description")}</div>;
  }

  return (
    <>
      {forms.map((form, i) => {
        return (
          <div key={form.id}>
            {i > 0 && <Divider />}
            <div
              className="mx-4 flex items-center justify-between cursor-pointer hover:opacity-50"
              onClick={() => onClick(form)}
            >
              <div style={{ height: 60 }} className="flex items-center gap-4">
                <Form />
                <div>
                  <div>{form.name}</div>
                  {!!form.description && (
                    <div className={styles.subtitle}>
                      {`${t("status")}: ${t(form.status)}`}
                    </div>
                  )}
                </div>
              </div >
            </div >
          </div>
        );
      })}
    </>
  );
};

export default FormsList;
