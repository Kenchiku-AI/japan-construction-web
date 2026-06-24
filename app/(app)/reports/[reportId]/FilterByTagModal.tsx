import { FC } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { ReportImageTag } from "@/types";
import Divider from "@/app/ui/Divider";
import { Close, Tag } from "@/app/ui/Icons";
import { fontColor2 } from "@/lib/constants";

interface FilterByTagModalProps {
  tags: ReportImageTag[];
  isOpen: boolean;
  onClose: () => void;
  onSelectTag: (tag?: ReportImageTag) => void;
}

const FilterByTagModal: FC<FilterByTagModalProps> = ({
  tags,
  isOpen,
  onClose,
  onSelectTag,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("filter_by_tag")}>
      <Divider />
      <div>
        <div
          className="flex px-4 h-12 items-center gap-3 hover:opacity-50 cursor-pointer"
          onClick={() => {
            onClose();
            onSelectTag(undefined);
          }}
        >
          <Close color="black" />
          <div>{t("none")}</div>
        </div>
        {tags.map((tag) => (
          <div key={tag.id}>
            <Divider style={{ background: fontColor2 }} />
            <div
              className="flex px-4 h-12 items-center gap-3 hover:opacity-50 cursor-pointer"
              onClick={() => {
                onClose();
                onSelectTag(tag);
              }}
            >
              <Tag />
              <div>{tag.name}</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FilterByTagModal;
