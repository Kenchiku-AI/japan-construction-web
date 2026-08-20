import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomObjectDefinition } from "@/types";
import styles from "./page.module.css";
import { Cube, DownChevron, RightChevron, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { Button } from "@/app/ui/Button/Button";
import { buttonColor, fontColor1, fontColor2 } from "@/lib/constants";
import { truncateText } from "@/lib/helpers";

interface CustomObjectsListProps {
  objects: CustomObjectDefinition[];
  isEmpty?: boolean;
  onClickObject: (object: CustomObjectDefinition) => void;
}

const CustomObjectsList: FC<CustomObjectsListProps> = ({
  objects,
  isEmpty,
  onClickObject,
}) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  if (isEmpty) {
    return (
      <div className={styles.empty}>
        {t("empty_custom_objects_description")}
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
        {objects.map((object, i) => (
          <div key={object.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                onClickObject(object);
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
                      <Cube />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: fontColor1 }}>{object.name}</div>
                      <div className={styles.subtitle}>{truncateText(object.description, 100)}</div>
                    </div>
                  </div>
                  <RightChevron color={fontColor2} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {objects.length > 5 && (
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

export default CustomObjectsList;
