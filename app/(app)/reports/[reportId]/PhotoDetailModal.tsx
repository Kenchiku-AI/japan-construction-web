import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Modal from "@/app/ui/Modal";
import { ReportImage, ReportImageTag, ReportImageTagLink } from "@/types";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import Divider from "@/app/ui/Divider";
import { useDate } from "@/public/date/useDate";
import { Button } from "@/app/ui/Button/Button";
import { bgColor2, errorColor1, fontColor2 } from "@/lib/constants";
import { Check, Close, Download, Plus, Tag, Trash } from "@/app/ui/Icons";
import styles from "./page.module.css";

interface PhotoDetailModalProps {
  image?: ReportImage;
  index?: number;
  tags: ReportImageTag[];
  reportName: string;
  onDeletePhoto: () => void;
  onUpdateDescription: (description: string) => void;
  onAddTag: (tagId: string) => void;
  onDeleteTag: (linkId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isDisabled?: boolean;
}

const PhotoDetailModal: FC<PhotoDetailModalProps> = ({
  image,
  index,
  tags,
  reportName,
  onDeletePhoto,
  onUpdateDescription,
  onAddTag,
  onDeleteTag,
  isOpen,
  onClose,
  isMobile,
  isDisabled,
}) => {
  const { t } = useTranslation();
  const { formatDate } = useDate();
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);

  const date = useMemo(() => {
    if (!image?.created_at) return undefined;
    return formatDate(image.created_at);
  }, [image?.created_at]);

  const isProcessingShown = useMemo(() => {
    return true;
    // if (!image?.status) return false;

    // const statuses = ["pending", "processing"];
    // if (!statuses.includes(image.status)) return false;

    // const createdAt = new Date(image.created_at).getMilliseconds();
    // const now = new Date().getMilliseconds();
    // const fiveMinutes = 5 * 60 * 1000;
    // return now - createdAt < fiveMinutes;
  }, [image?.status]);

  const photoStyle: CSSProperties = useMemo(
    () => ({
      position: "relative",
      width: "100%",
      aspectRatio: `${image?.width ?? 1} / ${image?.height ?? 1}`,
      backgroundColor: bgColor2,
    }),
    [image?.width, image?.height],
  );

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsConfirmDeleteShown(false);
      }, 500);
    }
  }, [isOpen]);

  if (!image) return null;

  if (isConfirmDeleteShown) {
    return (
      <Modal
        title={t("confirm_delete")}
        subtitle={t("confirm_delete_photo_description")}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="mt-8 flex flex-col gap-2">
          <Button
            label={t("delete_photo")}
            onClick={() => {
              onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} width={1200}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="hidden md:flex"
          style={{
            ...photoStyle,
            marginTop: -24,
            alignSelf: "center",
          }}
        >
          <Photo image={image} />
        </div>
        <div>
          <div className="flex justify-between items-end">
            <div className="flex gap-3">
              <div className="text-2xl">{t("photo_details")}</div>
              {isProcessingShown && (
                <div className="text-2xl" style={{ color: fontColor2 }}>
                  {t("processing")}
                </div>
              )}
            </div>
            {date && (
              <div style={{ color: fontColor2, fontSize: 14 }}>
                {t("photo_taken", { date })}
              </div>
            )}
          </div>
          <Divider />
          <div className="flex w-full flex-col md:flex-row justify-between gap-2 lg:gap-8 py-1">
            <Button
              variant="tertiary"
              label={t("download")}
              iconLeft={() => <Download />}
              onClick={async () => {
                try {
                  const response = await fetch(image.download_url, {
                    mode: "cors",
                  });

                  const blob = await response.blob();
                  const url = URL.createObjectURL(blob);

                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${reportName.replace(/ /g, "_").replace(/[()]/g, "")}${index === undefined ? "" : `_${t("photo")}_${index}`}.jpg`;

                  document.body.appendChild(a);
                  a.click();
                  a.remove();

                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error("Download failed", err);
                }
              }}
              style={{ height: "auto" }}
            />
            {!isDisabled && (
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
            )}
          </div>
          <Divider style={{ background: fontColor2 }} />
          <div className="md:hidden mb-4" style={photoStyle}>
            <Photo image={image} />
          </div>
          <Description
            imageDescription={image?.description}
            onUpdate={onUpdateDescription}
            isOpen={isOpen}
            isMobile={isMobile}
            isDisabled={isDisabled}
            date={date}
          />
          <Tags
            imageTags={image.tags}
            allTags={tags}
            onAdd={onAddTag}
            onDelete={onDeleteTag}
            isOpen={isOpen}
            isMobile={isMobile}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </Modal>
  );
};

interface PhotoProps {
  image: ReportImage;
}

const Photo: FC<PhotoProps> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [image?.download_url]);

  return (
    <Image
      alt={image.id}
      src={image.download_url}
      fill
      sizes="(max-width: 564px) 100vw"
      className={`object-cover transition-opacity duration-200 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
};

interface TagsProps {
  imageTags?: ReportImageTagLink[];
  allTags: ReportImageTag[];
  onAdd: (tagId: string) => void;
  onDelete: (linkId: string) => void;
  isMobile: boolean;
  isOpen: boolean;
  isDisabled?: boolean;
}

const Tags: FC<TagsProps> = ({
  imageTags,
  allTags,
  onAdd,
  onDelete,
  isOpen,
  isDisabled,
}) => {
  const [isTagListShown, setIsTagListShown] = useState(false);
  const { t } = useTranslation();

  const availableTags = useMemo(
    () =>
      allTags.filter((at) => !imageTags?.some((t) => t.tag_id === at.id)) ?? [],
    [imageTags, allTags],
  );

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsTagListShown(false);
      }, 500);
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex justify-between mt-6 relative">
        <div>{t("tags")}</div>
        {!isDisabled && (
          <Button
            variant="tertiary"
            label={t("add_tag")}
            onClick={() => setIsTagListShown(true)}
            iconLeft={() => <Plus />}
            style={{
              height: "auto",
              display: availableTags.length ? "flex" : "none",
            }}
          />
        )}
      </div>
      <Divider />
      {!imageTags?.length ? (
        <div className={styles.empty}>{t("empty_tags_description")}</div>
      ) : (
        <div className="flex gap-3 my-4">
          {imageTags?.map((t) => (
            <div
              key={`tag_${t.tag_id}`}
              className="flex gap-2 items-center"
              style={{
                height: 40,
                borderRadius: 20,
                paddingLeft: 20,
                paddingRight: isDisabled ? 20 : 12,
                backgroundColor: bgColor2,
              }}
            >
              {t.name}
              {!isDisabled && (
                <div
                  className="cursor-pointer"
                  onClick={() => onDelete(t.link_id)}
                >
                  <Close color={errorColor1} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isTagListShown && (
        <div
          style={{
            position: "absolute",
            background: "#0000004D",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="shadow-md absolute w-3/4 bg-white p-4"
            style={{
              borderRadius: 10,
              maxWidth: 400,
            }}
          >
            <div className="flex justify-between mb-2" style={{ height: 30 }}>
              {t("add_tag")}
              <div
                className="cursor-pointer"
                onClick={() => setIsTagListShown(false)}
                style={{}}
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
                    onAdd(t.id);
                  }}
                >
                  <Tag size={24} />
                  <div>{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

interface DescriptionProps {
  date?: string;
  imageDescription?: string;
  onUpdate: (description: string) => void;
  isOpen: boolean;
  isMobile: boolean;
  isDisabled?: boolean;
}

export const Description: FC<DescriptionProps> = ({
  date,
  imageDescription,
  onUpdate,
  isOpen,
  isMobile,
  isDisabled,
}) => {
  const [description, setDescription] = useState<string | undefined>();
  const [isEdited, setIsEdited] = useState(false);
  const updateButtonRef = useRef<any>(null);
  const { t } = useTranslation();
  const disableScroll = useRef(true);

  useEffect(() => {
    disableScroll.current = true;

    if (isOpen && isMobile) {
      setTimeout(() => {
        disableScroll.current = false;
      }, 300);
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    setDescription(imageDescription ?? "");
  }, [imageDescription]);

  useEffect(() => {
    if (!isOpen && isEdited) {
      setTimeout(() => {
        setIsEdited(false);
      }, 1000);
    }
  }, [isOpen, isEdited]);

  useEffect(() => {
    const edited = (description ?? "") !== (imageDescription ?? "");
    setIsEdited(edited);

    if (edited && !disableScroll.current) {
      setTimeout(() => {
        updateButtonRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    }
  }, [description, imageDescription]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setDescription(undefined);
      });
    }
  }, [isOpen]);

  return (
    <>
      <TextArea
        placeholder={t("description")}
        value={description}
        onChange={(d) => setDescription(d)}
        loading={description === undefined}
        disabled={isDisabled}
      />
      <div
        style={{
          height: !isEdited ? 0 : 40,
          opacity: !isEdited ? 0 : 1,
          overflow: "hidden",
          transition: "height 0.2s ease-in-out, opacity 0.2s ease-in-out",
        }}
        className="pt-1 flex gap-6"
        ref={updateButtonRef}
      >
        <Button
          variant="tertiary"
          label={t("update_description")}
          iconLeft={() => <Check />}
          onClick={() => {
            onUpdate(description ?? "");
          }}
        />
        <Button
          variant="tertiary"
          label={t("discard_changes")}
          iconLeft={() => <Close color={errorColor1} />}
          onClick={() => {
            setDescription(imageDescription ?? "");
          }}
          textStyle={{ color: errorColor1 }}
        />
      </div>
    </>
  );
};

export default PhotoDetailModal;
