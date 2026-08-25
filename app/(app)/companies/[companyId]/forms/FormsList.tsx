import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FormJob } from "@/types";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { Form } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";

interface FormsListProps {
  forms: FormJob[];
  isEmpty?: boolean;
}

const FormsList: FC<FormsListProps> = ({
  forms,
  isEmpty,
}) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_forms_description")}</div>;
  }

  return (
    <>
      {forms.map((form, i) => {
        return (
          <div key={form.id}>
            {i > 0 && <Divider />}
            <div className="mx-4 flex items-center justify-between">
              <div style={{ height: 60 }} className="flex items-center gap-4">
                <Form />
                <div className="flex flex-col">
                  <div>{form.name}</div>
                  <div className={styles.subtitle}>{ }</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FormsList;
