import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomFieldDefinition } from "@/types";
import styles from "./page.module.css";
import { AnnotationCheck, DownChevron, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { Button } from "@/app/ui/Button/Button";
import { buttonColor, fontColor1 } from "@/lib/constants";
import { truncateText } from "@/lib/helpers";

interface CustomFieldsListProps {
  fields: CustomFieldDefinition[];
  isEmpty?: boolean;
  onClickField: (field: CustomFieldDefinition) => void;
}

const CustomFieldsList: FC<CustomFieldsListProps> = ({
  fields,
  isEmpty,
  onClickField,
}) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  if (isEmpty) {
    return (
      <div className={styles.empty}>
        {t("empty_custom_fields_description")}
      </div>
    );
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
        {fields.map((field, i) => (
          <div key={field.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                onClickField(field);
              }}
              className="hover:opacity-50 cursor-pointer"
            >
              <div className="md:mx-3">
                <div className="flex items-center justify-between gap-4">
                  <div
                    style={{ minHeight: 60, minWidth: 0 }}
                    className="flex flex-1 items-center gap-4 py-1"
                  >
                    <div className="hidden md:block">
                      <AnnotationCheck />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: fontColor1 }}>{field.name}</div>
                      <div className={styles.subtitle}>{truncateText(field.description, 100)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {fields.length > 5 && (
        <Button
          variant="tertiary"
          style={{ marginLeft: 40 }}
          label={showAll ? t("show_less") : t("show_more")}
          iconLeft={() => showAll ? <UpChevron color={buttonColor} /> : <DownChevron color={buttonColor} />}
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      )}
    </>
  );
};

export default CustomFieldsList;
