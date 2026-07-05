import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportImageTag } from "@/types";
import styles from "./page.module.css";
import { Edit, Tag, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { fontColor1, fontColor2 } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";

interface TagsListProps {
  tags: ReportImageTag[];
  isEmpty?: boolean;
  isCollapsible?: boolean;
  onEdit?: (tag: ReportImageTag) => void;
  onDelete?: (tag: ReportImageTag) => void;
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
          maxHeight: showAll ? 2500 : 500,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {tags.map((t, i) => (
          <div key={t.id}>
            {i > 0 && <Divider />}
            <div className="md:mx-3">
              <div className="flex items-center justify-between">
                <div
                  style={{ height: 60, minWidth: 0 }}
                  className="flex items-center gap-3"
                >
                  <div>
                    <Tag size={30} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ color: fontColor1 }}>{t.name}</div>
                    <div className={styles.subtitle}>{t.description}</div>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-5 items-center">
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
        <Button
          variant="tertiary"
          style={{ marginLeft: 40 }}
          label={showAll ? t("show_less") : t("show_more")}
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      )}
    </>
  );
};

export default TagsList;
