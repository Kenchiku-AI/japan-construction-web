import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./page.module.css";
import { DownChevron, Edit, Tag, Trash, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { buttonColor, fontColor1 } from "@/lib/constants";
import { CatalogItem } from "@/types/catalog";
import { Button } from "@/app/ui/Button/Button";

interface CatalogItemsListProps {
  catalogItems: CatalogItem[];
  isEmpty?: boolean;
  onEdit?: (tag: CatalogItem) => void;
  onDelete?: (tag: CatalogItem) => void;
}

const CatalogItemsList: FC<CatalogItemsListProps> = ({
  catalogItems,
  isEmpty,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_items_description")}</div>;
  }

  return (
    <>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: showAll ? undefined : 390,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {catalogItems.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <Divider />}
            <div className="md:mx-3">
              <div className="flex items-center justify-between gap-5">
                <div
                  style={{ minHeight: 60, minWidth: 0 }}
                  className="flex items-center gap-3"
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: fontColor1 }}>{t.name}</div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {onEdit && (
                    <div
                      className="cursor-pointer pb-1"
                      onClick={() => onEdit(c)}
                    >
                      <Edit />
                    </div>
                  )}
                  {onDelete && (
                    <div className="cursor-pointer" onClick={() => onDelete(t)}>
                      <Trash />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {catalogItems.length > 5 && (
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

export default CatalogItemsList;
