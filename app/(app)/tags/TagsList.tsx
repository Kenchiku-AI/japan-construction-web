import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageTag } from "@/types";
import styles from "./page.module.css";
import { DownChevron, Edit, Tag, Trash, UpChevron } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { buttonColor, fontColor1, fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface TagsListProps {
  tags: ImageTag[];
  isEmpty?: boolean;
  isCollapsible?: boolean;
  onEdit?: (tag: ImageTag) => void;
  onDelete?: (tag: ImageTag) => void;
}

const TagsList: FC<TagsListProps> = ({
  tags,
  isEmpty,
  isCollapsible,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(!isCollapsible);

  if (isEmpty) {
    return <div className={styles.empty}>{t("empty_tags_description")}</div>;
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
        {tags.map((t, i) => (
          <div key={t.id}>
            {i > 0 && <Divider />}
            <div className="md:mx-3">
              <div className="flex items-center justify-between gap-5">
                <div
                  style={{ minHeight: 60, minWidth: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="hidden md:block">
                    <Tag size={30} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: fontColor1 }}>{t.name}</div>
                    <div className={styles.subtitle}>{t.description}</div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {onEdit && (
                    <div
                      className="cursor-pointer pb-1"
                      onClick={() => onEdit(t)}
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
      {isCollapsible && tags.length > 5 && (
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

export default TagsList;
