"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "./useReport";
import { ReportFieldValues, ReportImageTag, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import {
  bgColor2,
  buttonColor,
  errorColor1,
  fontColor2,
} from "@/lib/constants";
import DeleteReportModal from "./DeleteReportModal";
import { Loader } from "@/app/ui/Loader";
import { Plus, Download, Trash, Tag, Close, Check } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import styles from "./page.module.css";
import { ReportPDF } from "./ReportPDF";
import Masonry from "react-masonry-css";
import PhotoDetailModal from "./PhotoDetailModal";
import { useTags } from "../../tags/useTags";
import FilterByTagModal from "./FilterByTagModal";
import Image from "next/image";
import JSZip from "jszip";
import { useDate } from "@/public/date/useDate";
import { useExportExcel } from "./useExportExcel";
import { useIsMobile } from "@/lib/useIsMobile";

interface ReportDashboardProps {
  reportId: string;
}

const ReportDashboard: FC<ReportDashboardProps> = ({ reportId }) => {
  const { currentUser } = useApi();
  const { tags, getTags } = useTags(currentUser?.company?.id);
  const { t } = useTranslation();
  const {
    report,
    images,
    loading,
    updateReport,
    deleteReport,
    deleteImage,
    updateImageDescription,
    addImageTag,
    removeImageTag,
    uploadImage,
    selectedPhoto,
    setSelectedPhoto,
  } = useReport(reportId);
  const { downloadExcel, isExcelDownloading } = useExportExcel();
  const { formatDate } = useDate();
  const { isMobile } = useIsMobile();
  const searchParams = useSearchParams();
  const [fieldValues, setFieldValues] = useState<ReportFieldValues>();
  const [selectedTag, setSelectedTag] = useState<ReportImageTag>();
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false);
  const [isFilterByTagModalShown, setIsFilterByTagModalShown] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const loadedRef = useRef(false);
  const isReportDisabled = report?.disabled && currentUser?.role !== "admin";

  useEffect(() => {
    if (report && !loadedRef.current) {
      if (currentUser?.role === "admin") {
        getTags();
      }

      loadedRef.current = true;
    }

    resetFieldValues();
  }, [report]);

  const resetFieldValues = useCallback(() => {
    const newValues: ReportFieldValues = {};

    report?.fields.forEach((f) => {
      newValues[f.id] = f.value;
    });

    setFieldValues(newValues);
  }, [report]);

  const topLabel = useMemo(() => {
    if (!report) return;

    const parts = [];
    const isAdmin = currentUser?.role === "admin";

    if (isAdmin && report.company_name) {
      parts.push(report.company_name);
    }

    if (report.project_name) {
      parts.push(report.project_name);
    }

    const date = formatDate(report.created_at);
    parts.push(t("created", { date }));

    return parts.join(" • ");
  }, [
    currentUser?.role,
    report?.company_name,
    report?.project_name,
    report?.created_at,
  ]);

  const isDisabled = useMemo(() => {
    if (
      !fieldValues ||
      !Object.keys(fieldValues ?? []).length ||
      !report?.fields.length
    )
      return true;

    const isChanged = report.fields.some((f) => f.value !== fieldValues[f.id]);
    return !isChanged;
  }, [report, fieldValues]);

  const filteredImages = useMemo(() => {
    if (!selectedTag) return images ?? [];

    return (images ?? []).filter((i) =>
      i.tags.some((tag) => tag.tag_id === selectedTag.id),
    );
  }, [images, selectedTag]);

  const selectedPhotoIndex = useMemo(() => {
    if (!selectedPhoto || !images) return undefined;

    const index = images.findIndex((i) => i.id === selectedPhoto.id);
    return index === -1 ? undefined : index;
  }, [images, selectedPhoto]);

  const downloadAllImages = useCallback(async () => {
    if (!filteredImages?.length) return;

    try {
      const zip = new JSZip();

      const files = await Promise.all(
        filteredImages.map(async (img, index) => {
          const response = await fetch(img.download_url, { mode: "cors" });
          const blob = await response.blob();

          const fileName = `${t("photo")}_${index + 1}.jpg`;

          return { fileName, blob };
        }),
      );

      files.forEach(({ fileName, blob }) => {
        zip.file(fileName, blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");

      a.href = url;
      const filename = `${report?.name ?? ""}${!selectedTag ? "" : `_${selectedTag.name}`}_${t("photos")}`;
      a.download = `${filename.replace(/ /g, "_").replace(/[()]/g, "")}.zip`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download all failed", err);
    }
  }, [filteredImages, report?.name, selectedTag]);

  const sortedFields = useMemo(() => {
    return [...(report?.fields ?? [])].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;

      return a.id.localeCompare(b.id);
    });
  }, [report?.fields]);

  const shouldRedirect =
    currentUser?.company &&
    report?.company_id &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company.id !== report.company_id;

  const ImageList = useMemo(
    () => (
      <Masonry
        breakpointCols={{
          default: 4,
          768: 2,
        }}
        className="flex gap-2"
      >
        {filteredImages.map((i) => (
          <div
            key={i.id}
            className={`mb-2 cursor-pointer hover:opacity-90${!loadedImages[i.id] ? " animate-pulse" : ""}`}
            onClick={() => {
              setIsPhotoModalShown(true);
              setSelectedPhoto({ ...i });
            }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: `${i.width} / ${i.height}`,
              backgroundColor: bgColor2,
            }}
          >
            <Image
              alt={i.id}
              sizes="(max-width: 768px) 50vw, 25vw"
              src={i.download_url}
              fill
              className={`object-cover transition-opacity duration-200 ${
                !loadedImages[i.id] ? "opacity-0" : "opacity-100"
              }`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              onLoad={(e) => {
                setLoadedImages((p) => ({ ...p, [i.id]: true }));
              }}
            />
          </div>
        ))}
      </Masonry>
    ),
    [filteredImages, loadedImages],
  );

  const measureTextWidth = (text: string, fontSize: number) => {
    let width = 0;
    for (const char of text) {
      const code = char.charCodeAt(0);
      width += code > 0x7f ? fontSize : fontSize * 0.5;
    }
    return width;
  };

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={report?.name ?? searchParams.get("name") ?? ""}
        topLabel={topLabel}
        placeholder={t("report_name")}
        onEdit={(name) => {
          updateReport({ name }, true);
        }}
        isEditable={!isReportDisabled}
      />
      <Divider />
      {report != null && (
        <>
          <div className="flex w-full justify-between gap-2 lg:gap-8 py-1">
            <div className="flex flex-row gap-6">
              <Button
                variant="tertiary"
                label={t(isExcelDownloading ? "downloading" : "Excel")}
                iconLeft={() => <Download />}
                disabled={isExcelDownloading}
                onClick={async () => {
                  if (!report) return;

                  downloadExcel(report, images ?? [], topLabel ?? "");
                }}
                style={{ height: "auto" }}
                textStyle={{
                  fontWeight: "300",
                }}
              />
              <Button
                variant="tertiary"
                label={t(isPdfDownloading ? "downloading" : "PDF")}
                iconLeft={() => <Download />}
                disabled={isPdfDownloading}
                onClick={async () => {
                  if (!report) return;

                  setIsPdfDownloading(true);

                  const { pdf } = await import("@react-pdf/renderer");

                  const labelWidths = await Promise.all(
                    report.fields.map((f) => measureTextWidth(f.name, 12)),
                  );
                  const labelWidth = Math.max(...labelWidths) + 40;

                  const blob = await pdf(
                    <ReportPDF
                      report={report}
                      topLabel={topLabel ?? ""}
                      images={images ?? []}
                      labelWidth={labelWidth}
                    />,
                  ).toBlob();

                  const fileUrl = URL.createObjectURL(blob);

                  const a = document.createElement("a");
                  a.href = fileUrl;
                  a.download = `${report.name.replace(/ /g, "_").replace(/[()]/g, "")}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();

                  URL.revokeObjectURL(fileUrl);

                  setIsPdfDownloading(false);
                }}
                style={{ height: "auto" }}
                textStyle={{
                  fontWeight: "300",
                }}
              />
            </div>
            {!isReportDisabled && (
              <Button
                variant="tertiary"
                label={t("delete_report")}
                iconLeft={() => <Trash />}
                onClick={() => {
                  setIsDeleteModalShown(true);
                }}
                style={{ height: "auto" }}
                textStyle={{
                  fontWeight: "300",
                  color: errorColor1,
                }}
                iconOnlyMobile
              />
            )}
          </div>
          <Divider style={{ background: fontColor2 }} />
        </>
      )}
      {!!sortedFields && (
        <>
          <div className="flex flex-col w-full gap-2">
            {sortedFields?.map((field) => (
              <Input
                key={field.id}
                placeholder={field.name}
                value={fieldValues?.[field.id] ?? ""}
                onChange={(value) => {
                  setFieldValues((prev) => {
                    const newValues = { ...prev };
                    newValues[field.id] = value;
                    return newValues;
                  });
                }}
                disabled={isReportDisabled}
                loading={fieldValues?.[field.id] === undefined}
              />
            ))}
          </div>
          <div
            style={{
              height: isDisabled ? 0 : isMobile ? 136 : 80,
              opacity: isDisabled ? 0 : 1,
              overflow: "hidden",
              transition: "height 0.2s ease-in-out, opacity 0.2s ease-in-out",
            }}
            className="pt-4 w-full grid grid-cols-1 md:grid-cols-2 md:gap-3"
          >
            <Button
              label={t("update_report")}
              onClick={() => {
                updateReport({ field_values: fieldValues });
              }}
              iconLeft={() => <Check color="white" />}
              style={{ height: 50 }}
            />
            <Button
              variant="secondary"
              label={t("discard_changes")}
              onClick={() => {
                resetFieldValues();
              }}
              iconLeft={() => <Close color={errorColor1} />}
              style={{ borderColor: errorColor1 }}
              textStyle={{ color: errorColor1 }}
            />
          </div>
        </>
      )}
      {images != null && (
        <div className="mt-4 w-full">
          <div className="flex justify-between items-end">
            <div>{t("photos")}</div>
            {!isReportDisabled && (
              <Button
                label={t("upload_photo")}
                iconLeft={() => <Plus />}
                variant="tertiary"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                style={{ height: "auto" }}
              />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0];
                if (!file) return;

                uploadImage(file);
              }}
              style={{ display: "none" }}
            />
          </div>
          <Divider />
          {!!images && images.length === 0 ? (
            <div className={styles.empty}>{t("empty_photos_description")}</div>
          ) : (
            <>
              <div className="flex w-full flex-col md:flex-row justify-between gap-2 lg:gap-8 py-1">
                <Button
                  variant="tertiary"
                  label={
                    selectedTag
                      ? t("download_tag", { tag: selectedTag.name })
                      : t("download_all")
                  }
                  iconLeft={() => <Download />}
                  onClick={downloadAllImages}
                  style={{ height: "auto" }}
                  textStyle={{
                    fontWeight: "300",
                  }}
                />
                <Button
                  variant="tertiary"
                  label={selectedTag?.name ?? t("filter_by_tag")}
                  iconLeft={() => <Tag color={buttonColor} size={30} />}
                  onClick={() => {
                    setIsFilterByTagModalShown(true);
                  }}
                  style={{ height: "auto" }}
                  textStyle={{
                    fontWeight: "300",
                  }}
                />
              </div>
              <Divider style={{ background: fontColor2 }} />
              {filteredImages.length === 0 && (
                <div className={styles.empty}>
                  {t("empty_tag_photos_description")}
                </div>
              )}
              {ImageList}
            </>
          )}
        </div>
      )}
      <DeleteReportModal
        isOpen={isDeleteModalShown}
        onClose={() => setIsDeleteModalShown(false)}
        onDelete={() => {
          setIsDeleteModalShown(false);
          deleteReport();
        }}
      />
      <FilterByTagModal
        tags={tags ?? []}
        isOpen={isFilterByTagModalShown}
        onClose={() => setIsFilterByTagModalShown(false)}
        onSelectTag={(tag?: ReportImageTag) => {
          setSelectedTag(tag);
        }}
      />
      <PhotoDetailModal
        image={selectedPhoto}
        index={selectedPhotoIndex}
        tags={tags ?? []}
        reportName={report?.name ?? ""}
        onDeletePhoto={() => {
          deleteImage();
        }}
        onUpdateDescription={async (description) => {
          updateImageDescription(description);
        }}
        onAddTag={async (tagId) => {
          addImageTag(tagId);
        }}
        onDeleteTag={async (linkId) => {
          removeImageTag(linkId);
        }}
        isOpen={isPhotoModalShown}
        onClose={() => {
          setIsPhotoModalShown(false);

          setTimeout(() => {
            setSelectedPhoto(undefined);
          }, 500);
        }}
        isMobile={isMobile}
        isDisabled={isReportDisabled}
      />
      {loading && <Loader />}
    </>
  );
};

export default ReportDashboard;
