import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { ReportImage, ReportImageTag } from "@/types";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Divider from "@/app/ui/Divider";
import { useDate } from "@/public/date/useDate";
import { Button } from "@/app/ui/Button/Button";
import { bgColor2, errorColor1, fontColor2 } from "@/lib/constants";
import { Check, Close, Download, Plus, Tag, Trash } from "@/app/ui/Icons";
import styles from "./page.module.css";

interface PhotoDetailModalProps {
  image?: ReportImage;
  tags: ReportImageTag[];
  reportName: string;
  onDeletePhoto: () => void;
  onUpdateDescription: (description: string) => void;
  onAddTag: (tagId: string) => void;
  onDeleteTag: (linkId: string) => void;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const PhotoDetailModal: FC<PhotoDetailModalProps> = ({
  image,
  tags,
  reportName,
  onDeletePhoto,
  onUpdateDescription,
  onAddTag,
  onDeleteTag,
  loading,
  isOpen,
  onClose,
  isMobile,
}) => {
  const { t } = useTranslation();
  const { formatDate } = useDate();
  const [description, setDescription] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [isTagListShown, setIsTagListShown] = useState(false);
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const imageRef = useRef<any>(null);
  const updateButtonRef = useRef<any>(null);
  const disableScroll = useRef(true);

  useEffect(() => {
    disableScroll.current = true;

    if (isOpen) {
      setTimeout(() => {
        disableScroll.current = false;
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    setDescription(image?.description ?? "");
  }, [image]);

  useEffect(() => {
    if (!image) return;

    const edited = description !== image?.description;
    setIsEdited(edited);

    if (edited && !disableScroll.current) {
      setTimeout(() => {
        updateButtonRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    }
  }, [description, image?.description]);

  const date = useMemo(() => {
    if (!image?.created_at) return null;
    return formatDate(image.created_at);
  }, [image?.created_at]);

  const availableTags = useMemo(
    () =>
      tags?.filter((at) => !image?.tags.some((t) => t.tag_id === at.id)) ?? [],
    [image?.tags, tags],
  );

  const isProcessingShown = useMemo(() => {
    if (!image) return false;

    const statuses = ["pending", "processing"];
    if (!statuses.includes(image.status)) return false;

    const createdAt = new Date(image.created_at).getMilliseconds();
    const now = new Date().getMilliseconds();
    const fiveMinutes = 5 * 60 * 1000;
    return now - createdAt < fiveMinutes;
  }, [image]);

  const close = () => {
    onClose();

    setTimeout(() => {
      setIsTagListShown(false);
      setIsEdited(false);
      setIsConfirmDeleteShown(false);
    }, 500);
  };

  if (!image) return null;

  if (isConfirmDeleteShown) {
    return (
      <Modal
        title={t("confirm_delete")}
        subtitle={t("confirm_delete_photo_description")}
        isOpen={isOpen}
        onClose={close}
      >
        <div className="mt-8 flex flex-col gap-2">
          <Button
            label={t("delete_photo")}
            onClick={() => {
              close();
              onDeletePhoto();
            }}
          />
          <Button
            variant="secondary"
            label={t("cancel")}
            onClick={() => {
              setIsConfirmDeleteShown(false);
            }}
            style={{ height: 60 }}
          />
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex gap-3">
        <div className="text-2xl">{t("photo_details")}</div>
        {isProcessingShown && (
          <div className="text-2xl" style={{ color: fontColor2 }}>
            {t("processing")}
          </div>
        )}
      </div>
      <Divider />
      <div className="flex justify-between mb-3">
        <Button
          variant="tertiary"
          label={t("download")}
          iconLeft={() => <Download />}
          onClick={() => {
            const img = imageRef.current;
            if (!img) return;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            ctx?.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
              if (!blob) return;

              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");

              a.href = url;
              a.download = `${reportName.replace(/ /g, "_")}_${date}.jpg`;

              document.body.appendChild(a);
              a.click();
              a.remove();

              URL.revokeObjectURL(url);
            }, "image/jpeg");
          }}
          style={{ height: "auto" }}
        />
        <Button
          variant="tertiary"
          label={t("delete_photo")}
          iconLeft={() => <Trash />}
          style={{ borderColor: errorColor1, height: "auto" }}
          textStyle={{ color: errorColor1 }}
          onClick={() => {
            setIsConfirmDeleteShown(true);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <img
          ref={imageRef}
          src={image.download_url}
          crossOrigin="anonymous"
          style={{ height: (image.height * 464) / image.width }}
        />
        {date && <div className="text-sm">{t("photo_taken", { date })}</div>}
        <TextArea
          placeholder={t("description")}
          value={description}
          onChange={(d) => setDescription(d)}
        />
      </div>
      <div
        style={{
          height: !isEdited ? 0 : isMobile ? 130 : 74,
          opacity: !isEdited ? 0 : 1,
          overflow: "hidden",
          transition: "height 0.2s ease-in-out, opacity 0.2s ease-in-out",
        }}
        className="pt-3 w-full grid grid-cols-1 md:grid-cols-2 md:gap-3"
        ref={updateButtonRef}
      >
        <Button
          label={t("update_description")}
          iconLeft={() => <Check color="white" />}
          onClick={() => {
            onUpdateDescription(description);
          }}
          style={{ height: 50 }}
          loading={loading}
        />
        <Button
          variant="secondary"
          label={t("discard_changes")}
          iconLeft={() => <Close color={errorColor1} />}
          onClick={() => {
            setDescription(image?.description ?? "");
          }}
          style={{ height: 50, borderColor: errorColor1 }}
          textStyle={{ color: errorColor1 }}
          loading={loading}
        />
      </div>
      <div className="flex justify-between mt-3 relative">
        <div>{t("tags")}</div>
        {!!availableTags.length && (
          <Button
            variant="tertiary"
            label={t("add_tag")}
            onClick={() => setIsTagListShown(true)}
            iconLeft={() => <Plus />}
            style={{ height: "auto" }}
          />
        )}
        {isTagListShown && (
          <div
            className="shadow-lg absolute w-3/4 bg-white"
            style={{
              top: availableTags.length * -60 - 56,
              right: 0,
              padding: "0 16px",
              borderRadius: 10,
            }}
          >
            <div className="flex justify-between mt-3" style={{ height: 30 }}>
              {t("add_tag")}
              <div
                className="cursor-pointer"
                onClick={() => setIsTagListShown(false)}
              >
                <Close />
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            {availableTags.map((t, i) => (
              <div key={`add_tag_${t.id}`}>
                {i !== 0 && (
                  <Divider style={{ background: fontColor2, margin: 0 }} />
                )}
                <div
                  className="flex gap-2 cursor-pointer px-2 items-center"
                  style={{ height: 60 }}
                  onClick={() => {
                    setIsTagListShown(false);
                    onAddTag(t.id);
                  }}
                >
                  <Tag size={24} />
                  <div>{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Divider />
      {!image.tags?.length ? (
        <div className={styles.empty}>{t("empty_tags_description")}</div>
      ) : (
        <div className="flex gap-3 mb-10">
          {image.tags?.map((t) => (
            <div
              key={`tag_${t.tag_id}`}
              className="flex gap-2 items-center"
              style={{
                height: 40,
                borderRadius: 20,
                paddingLeft: 20,
                paddingRight: 12,
                backgroundColor: bgColor2,
              }}
            >
              {t.name}
              <div
                className="cursor-pointer"
                onClick={() => onDeleteTag(t.link_id)}
              >
                <Close color={errorColor1} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default PhotoDetailModal;
