import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormJob, FormJobStatus } from "@/types";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { DownChevron, Form, UpChevron } from "@/app/ui/Icons";
import { buttonColor, doneColor1, doneColor2, errorColor1, errorColor2, fontColor1, inProgressColor1, inProgressColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface FormsListProps {
  forms: FormJob[];
  isEmpty?: boolean;
  isCollapsible?: boolean;
  hideFilename?: boolean;
  onClick: (form: FormJob) => void;
}

const FormsList: FC<FormsListProps> = ({
  forms,
  isEmpty,
  isCollapsible,
  hideFilename,
  onClick,
}) => {
  const [showAll, setShowAll] = useState(!isCollapsible);
  const { t } = useTranslation();

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_forms_description")}</div>;
  }

  const getStatusColors = (status: FormJobStatus) => {
    if (status === FormJobStatus.Failed) {
      return {
        color: errorColor1,
        background: errorColor2
      }
    }

    if (
      status === FormJobStatus.Pending ||
      status === FormJobStatus.Processing
    ) {
      return {
        color: inProgressColor1,
        background: inProgressColor2
      }
    }

    return {
      color: doneColor1,
      background: doneColor2
    }
  }

  return (
    <>
      {forms.map((form, i) => {
        const file = form.files.find((f) => !!f.is_input);

        return (
          <div key={form.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => onClick(form)}
              className="hover:opacity-50 cursor-pointer"
            >
              <div className="md:mx-3">
                <div className="flex items-center justify-between gap-4">
                  <div
                    style={{ minHeight: 60, minWidth: 0 }}
                    className="flex flex-1 items-center gap-4 py-1"
                  >
                    <div className="hidden md:block">
                      <Form />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: fontColor1 }}>{form.name}</div>
                      {!hideFilename && (
                        <div className={styles.subtitle}>{file?.filename ?? ""}</div>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-2">
                    <div
                      className="flex items-center px-2"
                      style={{
                        fontSize: 12,
                        padding: "5px 10px",
                        borderRadius: 18,
                        ...getStatusColors(form.status)
                      }}
                    >
                      {t(form.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {isCollapsible && forms.length > 5 && (
        <>
          <Divider />
          <Button
            variant="tertiary"
            style={{ marginLeft: 10 }}
            label={showAll ? t("show_less") : t("show_more")}
            iconLeft={() => showAll ? <UpChevron color={buttonColor} /> : <DownChevron color={buttonColor} />}
            onClick={() => {
              setShowAll(!showAll);
            }}
          />
        </>
      )}
    </>
  );
};

export default FormsList;
